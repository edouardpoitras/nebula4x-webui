import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tab, Nav, NavItem, Row, Col } from 'react-bootstrap'
import ShipyardView from './ShipyardView'

class BodyShipyards extends React.Component {
  render() {
    var shipyardTabs = []
    var shipyardContent = []
    Object.keys(this.props.shipyards).forEach(function(shipyardKey) {
      var shipyard = this.props.shipyards[shipyardKey]
      shipyardTabs.push(
        <NavItem key={shipyardKey} eventKey={shipyardKey}>
          {shipyard.syName}<br />
          <small>
            Type: {shipyard.syType.charAt(0)} |
            Cap: {Math.round(shipyard.syCapacity).toLocaleString()} |
            Slips: {shipyard.sySlipways.length}
          </small>
        </NavItem>
      )
      shipyardContent.push(
        <Tab.Pane key={shipyardKey} eventKey={shipyardKey}>
          <ShipyardView
            shipyardId={Number(shipyardKey)}
            systemId={this.props.systemId}
            bodyId={this.props.bodyId}
            playerRace={this.props.playerRace}
          />
        </Tab.Pane>
      )
    }.bind(this))
    return (
      <Tab.Container id='bodies-shipyard'>
        <Row className='clearfix'>
          <Col sm={4}>
            <Nav bsStyle='pills' stacked>
              {shipyardTabs}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              {shipyardContent}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }
}

BodyShipyards.propTypes = {
  bodyId: PropTypes.number.isRequired,
  systemId: PropTypes.number.isRequired,
  shipyards: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  shipyards: state.systems[ownProps.systemId].ssBodies[ownProps.bodyId].bShipyards
})

export default connect(mapStateToProps)(BodyShipyards)