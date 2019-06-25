import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { getAvailableConditions, getAvailableOrders } from '../../../utils/helpers'
import BodySelect from '../../../components/Body/BodySelect'
import ElementSelect from '../../../components/Body/ElementSelect'
import InstallmentSelect from '../../../components/Body/InstallmentSelect'
import ShipSelect from '../../../components/Ship/ShipSelect'
import WormholeSelect from '../../../components/Wormhole/WormholeSelect'
import { fetchSystem } from '../../../redux/actions/systems/systemActions'
import { fetchRaceResearch } from '../../../redux/actions/research/researchActions'
import { createShipConditionalOrder } from '../../../redux/actions/ship/shipActions'

class ShipNewConditionalOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      availableConditions: getAvailableConditions(),
      availableOrders: getAvailableOrders(),
      conditionTag: 'EnemyInSightCondition',
      orderTag: 'MoveOrder',
      bodySelect: null,
      shipSelect: null,
      wormholeSelect: null,
      elementSelect: null,
      installmentSelect: null
    }
    this.getInstallmentsFromResearch = this.getInstallmentsFromResearch.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeBody = this.onChangeBody.bind(this)
    this.onChangeShip = this.onChangeShip.bind(this)
    this.onChangeWormhole = this.onChangeWormhole.bind(this)
    this.onChangeElement = this.onChangeElement.bind(this)
    this.onChangeInstallment = this.onChangeInstallment.bind(this)
    this.handleConditionChange = this.handleConditionChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.props.fetchRaceResearch()
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
    // Condition
    var conditionData = { tag: this.state.conditionTag }
    var conditionParameters = this.state.availableConditions[this.state.conditionTag].parameters
    for (let param of Object.keys(conditionParameters)) {
      var conditionValue = null
      if (conditionParameters[param].type === 'number') {
        conditionValue = document.getElementById(param).value
        if (conditionValue == null) {
          conditionValue = 0
        } else {
          conditionValue = parseInt(conditionValue, 10)
        }
      }
      conditionData[param] = conditionValue
    }
    // Order
    var orderData = { tag: this.state.orderTag }
    var orderParameters = this.state.availableOrders[this.state.orderTag].parameters
    for (let param of Object.keys(orderParameters)) {
      var value = null
      if (orderParameters[param].value !== undefined) {
        value = orderParameters[param].value
      } else if (orderParameters[param].type === 'select') {
        if (orderParameters[param].data === 'body') {
          value = this.state.bodySelect
        } else if (orderParameters[param].data === 'ship') {
          value = this.state.shipSelect
        } else if (orderParameters[param].data === 'minerals') {
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
        } else if (orderParameters[param].data === 'installment') {
          value = this.getInstallmentsFromResearch()[this.state.installmentSelect]
        } else if (orderParameters[param].data === 'wormhole') {
          // TODO: For wormhole orders, should have the user specify the wormhole ID in the form.
          value = this.state.wormholeSelect
          // Special logic for transit orders to keep track of which wormhole goes to which system.
          // For now use the ship's current system ID.
          orderData['tjgoSystemId'] = this.props.systems[this.props.systemId].ssWormholes[value].wDestinationStarId
        }
      } else if (orderParameters[param].type === 'number') {
        value = document.getElementById(param).value
        if (value == null) {
          value = 0
        } else {
          value = parseInt(value, 10)
        }
      } else if (orderParameters[param].type === 'checkbox') {
        value = document.getElementById(param).checked
      }
      orderData[param] = value
    }
    this.props.createShipConditionalOrder(this.props.systemId, this.props.ship.sId, conditionData, orderData)
    this.setState({ conditionTag: 'EnemyInSightCondition', orderTag: 'MoveOrder' })
    Alert.success('New Conditional Order Added!')
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
  handleConditionChange(e) {
    this.setState({
      conditionTag: e.target.value
    })
  }
  handleOrderChange(e) {
    this.setState({
      orderTag: e.target.value
    })
  }
  render() {
    var formConditions = Object.keys(this.state.availableConditions).map(function(condition) {
      return <option key={condition} value={condition}>{this.state.availableConditions[condition].name}</option>
    }.bind(this))
    var conditionParameters = Object.keys(this.state.availableConditions).map(function(condition) {
      if (condition === this.state.conditionTag) {
        return Object.keys(this.state.availableConditions[condition].parameters).map(function(param) {
          var parameters = this.state.availableConditions[condition].parameters[param]
          if (parameters.value !== undefined) {
            return null
          } else {
            return <FormGroup key={param}><ControlLabel>{parameters.name}</ControlLabel><FormControl id={param} type='text' defaultValue=''></FormControl></FormGroup>
          }
        }.bind(this))
      }
      return null
    }.bind(this))
    var formOrders = Object.keys(this.state.availableOrders).map(function(order) {
      return <option key={order} value={order}>{this.state.availableOrders[order].name}</option>
    }.bind(this))
    var orderParameters = Object.keys(this.state.availableOrders).map(function(order) {
      if (order === this.state.orderTag) {
        return Object.keys(this.state.availableOrders[order].parameters).map(function(param) {
          var parameters = this.state.availableOrders[order].parameters[param]
          if (parameters.value !== undefined) {
            return null
          } else if (parameters.type === 'select') {
            if (parameters.data === 'body') {
              var raceId = this.props.ship.sRace
              return (
                <FormGroup key={param}>
                  <ControlLabel>{parameters.name}</ControlLabel>
                  <BodySelect systems={this.props.systems} onlyDiscoveredBy={raceId} onChange={this.onChangeBody} />
                </FormGroup>
              )
            } else if (parameters.data === 'ship') {
              return (
                <FormGroup key={param}>
                  <ControlLabel>{parameters.name}</ControlLabel>
                  <ShipSelect systems={this.props.systems} onChange={this.onChangeShip}></ShipSelect>
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
                  <WormholeSelect systems={this.props.systems} systemId={this.props.systemId} wormholeStates={wormholeStates} onChange={this.onChangeWormhole}></WormholeSelect>
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
      <div className='ship-new-conditional-order'>
        <Grid fluid={true}>
          <h3>New Ship Conditional Order</h3>
          <form>
            <FormGroup controlId="formShipConditions">
              <ControlLabel>
                Condition
              </ControlLabel>
              <FormControl value={this.state.conditionTag} onChange={this.handleConditionChange} componentClass="select" placeholder="Ship Condition">
                {formConditions}
              </FormControl>
            </FormGroup>
            {conditionParameters}
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

ShipNewConditionalOrder.propTypes = {
  systems: PropTypes.object.isRequired,
  research: PropTypes.object.isRequired,
  systemId: PropTypes.number.isRequired,
  ship: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchSystem: PropTypes.func.isRequired,
  fetchRaceResearch: PropTypes.func.isRequired,
  createShipConditionalOrder: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  systems: state.systems,
  research: state.research,
  ship: state.systems[ownProps.systemId].ssShips[ownProps.ship.sId]
})

export default connect(mapStateToProps, { fetchSystem, fetchRaceResearch, createShipConditionalOrder })(ShipNewConditionalOrder)