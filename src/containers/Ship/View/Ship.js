import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchDiscoveredSystems, fetchSystemShip } from '../../../redux/actions/systems/systemActions'
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap'
import ShipSelect from '../../../components/Ship/ShipSelect'
import ShipSummary from './ShipSummary'
import ShipOrders from './ShipOrders'
import ShipConditionalOrders from './ShipConditionalOrders'

class Ship extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    // Load data in case we're hitting the page from a refresh.
    if (Object.keys(this.props.systems).length < 1) {
      this.props.fetchDiscoveredSystems()
    }
  }
  onChange(selectedOption) {
    if (!this.props.systems[selectedOption.systemId] ||
        !this.props.systems[selectedOption.systemId].ssShips ||
        !this.props.systems[selectedOption.systemId].ssShips[selectedOption.value]) {
      this.props.fetchSystemShip(selectedOption.systemId, selectedOption.value)
    }
    this.props.history.push('/view/ships/' + selectedOption.value)
  }
  render() {
    var ship = null
    var systemId = null
    Object.keys(this.props.systems).map(function(systemKey) {
      var system = this.props.systems[systemKey]
      if (!('ssShips' in system)) {
        return null
      }
      if (system.ssShips[this.props.match.params.shipId]) {
        ship = system.ssShips[this.props.match.params.shipId]
        systemId = system.ssId
        return null
      }
      return null
    }.bind(this))
    var systemShipView = ''
    if (ship) {
      systemShipView =
        <Row>
          <Col md={12}>
            <Tabs defaultActiveKey={1} id='system-ship-tabs'>
              <Tab eventKey={1} title='Summary'>
                <ShipSummary ship={ship} systems={this.props.systems} systemId={systemId} />
              </Tab>
              <Tab eventKey={2} title='Active Orders'>
                <ShipOrders systems={this.props.systems} systemId={systemId} ship={ship} />
              </Tab>
              <Tab eventKey={3} title='Conditional Orders'>
                <ShipConditionalOrders systems={this.props.systems} systemId={systemId} ship={ship} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
    }
    return (
      <div className='system-ships'>
        <Grid fluid={true}>
          <Row>
            <Col md={12}>
              <ShipSelect
                systems={this.props.systems}
                onChange={this.onChange}
                playerRace={this.props.playerRace}
              />
            </Col>
          </Row>
          {systemShipView}
        </Grid>
      </div>
    )
  }
}

Ship.propTypes = {
  fetchSystemShip: PropTypes.func.isRequired,
  fetchDiscoveredSystems: PropTypes.func.isRequired,
  match: PropTypes.object,
  history: PropTypes.object,
  playerRace: PropTypes.number.isRequired,
  systems: PropTypes.object
}

const mapStateToProps = state => ({
  systems: state.systems
})

export default withRouter(connect(mapStateToProps, { fetchDiscoveredSystems, fetchSystemShip })(Ship))