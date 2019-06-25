import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import BodySelect from '../../../components/Body/BodySelect'
import ElementSelect from '../../../components/Body/ElementSelect'
import InstallmentSelect from '../../../components/Body/InstallmentSelect'
import ShipSelect from '../../../components/Ship/ShipSelect'
import WormholeSelect from '../../../components/Wormhole/WormholeSelect'
import { fetchSystem } from '../../../redux/actions/systems/systemActions'
import { fetchRaceResearch } from '../../../redux/actions/research/researchActions'
import { createShipOrder } from '../../../redux/actions/ship/shipActions'

class ShipNewOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderTag: 'MoveOrder',
      bodySelect: null,
      shipSelect: null,
      wormholeSelect: null,
      elementSelect: null,
      installmentSelect: null
    }
    this.getInstallmentsFromResearch = this.getInstallmentsFromResearch.bind(this)
    this.getShipCurrentSystemId = this.getShipCurrentSystemId.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeBody = this.onChangeBody.bind(this)
    this.onChangeShip = this.onChangeShip.bind(this)
    this.onChangeWormhole = this.onChangeWormhole.bind(this)
    this.onChangeElement = this.onChangeElement.bind(this)
    this.onChangeInstallment = this.onChangeInstallment.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.props.fetchRaceResearch()
  }
  getShipCurrentSystemId(ship) {
    var groupId = ship.sOrderGroups.length - 1
    if (this.props.groupId) {
      groupId = parseInt(this.props.groupId, 10)
    }
    while (groupId >= 0) {
      for (let order of ship.sOrderGroups[groupId].sogOrders.reverse()) {
        if (order.tag === 'TransitJumpGateOrder') {
          return order.tjgoSystemId
        }
      }
      groupId -= 1
    }
    return this.props.systemId
  }
  getInstallmentsFromResearch() {
    var installments = {}
    Object.keys(this.props.research).map(function(researchType) {
      Object.keys(this.props.research[researchType].unlocked).map(function(instResearchId) {
        var instResearch = this.props.research[researchType].unlocked[instResearchId]
        if (!instResearch.irId) {
          return null
        }
        installments[instResearch.irId] = instResearch.irInstallment
        return null
      }.bind(this))
    }.bind(this))
    return installments
  }
  onSubmit() {
    var orderData = { tag: this.state.orderTag }
    var parameters = this.props.availableOrders[this.state.orderTag].parameters
    for (let param of Object.keys(parameters)) {
      var value = null
      if (parameters[param].value !== undefined) {
        value = parameters[param].value
      } else if (parameters[param].type === 'select') {
        if (parameters[param].data === 'body') {
          value = this.state.bodySelect
        } else if (parameters[param].data === 'ship') {
          value = this.state.shipSelect
        } else if (parameters[param].data === 'minerals') {
          var amount = null
          if (document.getElementById('pmoAmount')) {
            amount = document.getElementById('pmoAmount').value
          } else if (document.getElementById('dmoAmount')) {
            amount = document.getElementById('dmoAmount').value
          } else if (document.getElementById('pioAmount')) {
            amount = document.getElementById('pioAmount').value
          } else if (document.getElementById('dioAmount')) {
            amount = document.getElementById('dioAmount').value
          }
          value = {
            minsElement: this.state.elementSelect,
            minsCount: parseInt(amount, 10)
          }
        } else if (parameters[param].data === 'installment') {
          value = this.getInstallmentsFromResearch()[this.state.installmentSelect]
        } else if (parameters[param].data === 'wormhole') {
          value = this.state.wormholeSelect
          // Special logic for transit orders to keep track of which wormhole goes to which system.
          var systemId = this.getShipCurrentSystemId(this.props.ship)
          orderData['tjgoSystemId'] = this.props.systems[systemId].ssWormholes[value].wDestinationStarId
        }
      } else if (parameters[param].type === 'number') {
        value = document.getElementById(param).value
        if (value == null) {
          value = 0
        } else {
          value = parseInt(value, 10)
        }
      } else if (parameters[param].type === 'checkbox') {
        value = document.getElementById(param).checked
      }
      orderData[param] = value
    }
    if (this.props.groupId) {
      this.props.createShipOrder(this.props.systemId, this.props.ship.sId, orderData, this.props.groupId)
    } else {
      this.props.createShipOrder(this.props.systemId, this.props.ship.sId, orderData)
    }
    this.setState({ orderTag: 'MoveOrder' })
    Alert.success('New Order Added!')
    // Re-fetch system to update the order list (there has to be a better way of doing this)
    this.props.fetchSystem(this.props.systemId)
  }
  onChangeBody(e) {
    this.setState(Object.assign(this.state, { bodySelect: e.value }))
  }
  onChangeShip(e) {
    this.setState(Object.assign(this.state, { shipSelect: e.value }))
  }
  onChangeWormhole(e) {
    this.setState(Object.assign(this.state, { wormholeSelect: e.value }))
  }
  onChangeElement(e) {
    this.setState(Object.assign(this.state, { elementSelect: e.value }))
  }
  onChangeInstallment(e) {
    this.setState(Object.assign(this.state, { installmentSelect: e.value }))
  }
  handleOrderChange(e) {
    this.setState({
      orderTag: e.target.value
    })
  }
  render() {
    var formOrders = Object.keys(this.props.availableOrders).map(function(order) {
      return <option key={order} value={order}>{this.props.availableOrders[order].name}</option>
    }.bind(this))
    var orderParameters = Object.keys(this.props.availableOrders).map(function(order) {
      var raceId = this.props.ship.sRace
      if (order === this.state.orderTag) {
        return Object.keys(this.props.availableOrders[order].parameters).map(function(param) {
          var parameters = this.props.availableOrders[order].parameters[param]
          if (parameters.value !== undefined) {
            return null
          } else if (parameters.type === 'select') {
            var shipCurrentSystemId = this.getShipCurrentSystemId(this.props.ship)
            if (parameters.data === 'body') {
              return (
                <FormGroup key={param}>
                  <ControlLabel>{parameters.name}</ControlLabel>
                  <BodySelect systems={this.props.systems} systemId={shipCurrentSystemId} onlyDiscoveredBy={raceId} onChange={this.onChangeBody} />
                </FormGroup>
              )
            } else if (parameters.data === 'ship') {
              return (
                <FormGroup key={param}>
                  <ControlLabel>{parameters.name}</ControlLabel>
                  <ShipSelect systems={this.props.systems} systemId={shipCurrentSystemId} onChange={this.onChangeShip}></ShipSelect>
                </FormGroup>
              )
            } else if (parameters.data === 'wormhole') {
              var wormholeStates = ['new']
              if (this.state.orderTag === 'BuildJumpGateOrder') {
                wormholeStates = ['surveyed']
              } else if (this.state.orderTag === 'TransitJumpGateOrder' || this.state.orderTag === 'MoveToJumpGateOrder') {
                wormholeStates = ['jump gate']
              }
              return (
                <FormGroup key={param}>
                  <ControlLabel>{parameters.name}</ControlLabel>
                  <WormholeSelect systems={this.props.systems} systemId={shipCurrentSystemId} wormholeStates={wormholeStates} onChange={this.onChangeWormhole}></WormholeSelect>
                </FormGroup>
              )
            } else if (parameters.data === 'minerals') {
              return (
                <FormGroup key={param}>
                  <ControlLabel>{parameters.name}</ControlLabel>
                  <ElementSelect onChange={this.onChangeElement} />
                </FormGroup>
              )
            } else if (parameters.data === 'installment') {
              return (
                <FormGroup key={param}>
                  <ControlLabel>{parameters.name}</ControlLabel>
                  <InstallmentSelect installments={this.getInstallmentsFromResearch()} onChange={this.onChangeInstallment} />
                </FormGroup>
              )
            }
          } else if (parameters.type === 'checkbox') {
            return <FormGroup key={param}><ControlLabel>{parameters.name}</ControlLabel><FormControl id={param} type="checkbox"></FormControl></FormGroup>
          } else {
            return <FormGroup key={param}><ControlLabel>{parameters.name}</ControlLabel><FormControl id={param} type="text" defaultValue=''></FormControl></FormGroup>
          }
        }.bind(this))
      }
    }.bind(this))
    return (
      <div className='ship-new-order'>
        <Grid fluid={true}>
          <h3>New Ship Order</h3>
          <form>
            <FormGroup controlId="formShipOrders">
              <ControlLabel>
                Order
              </ControlLabel>
              <FormControl value={this.state.orderTag} onChange={this.handleOrderChange} componentClass="select" placeholder="Ship Order">
                {formOrders}
              </FormControl>
            </FormGroup>
            {orderParameters}
            <Row>
              <Col md={6}>
                <Button onClick={this.props.onBack}>Back</Button>
              </Col>
              <Col md={6}>
                <Button onClick={this.onSubmit}>Submit</Button>
              </Col>
            </Row>
          </form>
        </Grid>
      </div>
    )
  }
}

ShipNewOrder.propTypes = {
  systems: PropTypes.object.isRequired,
  research: PropTypes.object.isRequired,
  systemId: PropTypes.number.isRequired,
  ship: PropTypes.object.isRequired,
  groupId: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  availableOrders: PropTypes.object.isRequired,
  fetchSystem: PropTypes.func.isRequired,
  fetchRaceResearch: PropTypes.func.isRequired,
  createShipOrder: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  systems: state.systems,
  research: state.research,
  ship: state.systems[ownProps.systemId].ssShips[ownProps.ship.sId]
})

export default connect(mapStateToProps, { fetchSystem, fetchRaceResearch, createShipOrder })(ShipNewOrder)