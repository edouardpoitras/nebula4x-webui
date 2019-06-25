import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import ShipDesignView from '../../../components/Ship/ShipDesignView'
import ShipOrderView from '../../../components/Ship/ShipOrderView'
import ShipConditionalOrderView from '../../../components/Ship/ShipConditionalOrderView'
import ShipArmorView from '../../../components/Ship/ShipArmorView'
import ShipShieldView from '../../../components/Ship/ShipShieldView'
import ShipMissleLauncherView from '../../../components/Ship/ShipMissleLauncherView'
import ShipLaserView from '../../../components/Ship/ShipLaserView'
import { toggleShields } from '../../../redux/actions/ship/shipActions'

class ShipSummary extends React.Component {
  constructor(props) {
    super(props)
    this.onToggleShields = this.onToggleShields.bind(this)
  }
  onToggleShields() {
    this.props.toggleShields(this.props.systemId, this.props.ship.sId)
  }
  render() {
    var maxFuel = this.props.ship.sDesign.sdFuelStorages.map(function(fuelStorage) { return fuelStorage.fsRating }).reduce((a, b) => a + b)
    var fuel = Math.round(this.props.ship.sFuel).toLocaleString() + ' / ' + Math.round(maxFuel).toLocaleString() + ' L (' + Math.round(this.props.ship.sFuel / maxFuel * 100) + '%)'
    var coords = '(X = ' + Math.round(this.props.ship.sLocation.sLocationX).toLocaleString() + ' km, Y = ' + Math.round(this.props.ship.sLocation.sLocationY).toLocaleString() + ' km)'
    var totalCargo = 0
    var cargo = []
    Object.keys(this.props.ship.sCargo.scMinerals).map(function(minKey) {
      var mineral = this.props.ship.sCargo.scMinerals[minKey]
      if (mineral.minsCount > 0) {
        totalCargo += mineral.minsCount
        cargo.push(<span key={minKey}>
          {Math.round(mineral.minsCount).toLocaleString()}x {minKey}<br /></span>)
      }
      return null
    }.bind(this))
    var cargoInstallments = []
    Object.keys(this.props.ship.sCargo.scInstallments).map(function(instKey) {
      var count = this.props.ship.sCargo.scInstallments[instKey].isCount
      var inst = this.props.ship.sCargo.scInstallments[instKey].isInstallment
      if (count > 0) {
        totalCargo += inst.iSize * count
        cargoInstallments.push(<span key={instKey}>{Math.round(count).toLocaleString()}x {inst.iName} ({Math.round(inst.iSize * count).toLocaleString()} tons)<br /></span>)
        return null
      }
      return null
    }.bind(this))
    var cargoSize = 0
    this.props.ship.sDesign.sdCargoHolds.map(function(cHold) {
      cargoSize += cHold.cHoldRating
      return null
    })
    var toggleShieldsButton = ''
    if (this.props.ship.sShields) {
      if (this.props.ship.sShields.ssEnabled) {
        toggleShieldsButton = <Button className={'btn-danger'} onClick={this.onToggleShields}>Disable Shields</Button>
      } else {
        toggleShieldsButton = <Button className={'btn-success'} onClick={this.onToggleShields}>Enable Shields</Button>
      }
    }
    var currentOrder = 'None'
    if (this.props.ship.sCurrentConditionalOrder) {
      currentOrder = (
        <div>
          <ShipConditionalOrderView condition={this.props.ship.sCurrentConditionalOrder.scoCondition} systems={this.props.systems} systemId={this.props.systemId} justAttributes={false} />{' - '}
          <ShipOrderView order={this.props.ship.sCurrentConditionalOrder.scoOrder} systems={this.props.systems} systemId={this.props.systemId} />
        </div>)
    } else {
      currentOrder = <ShipOrderView order={this.props.ship.sCurrentOrder} systems={this.props.systems} systemId={this.props.systemId} />
    }
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={6}>
              <span><strong>Name:</strong> {this.props.ship.sName}</span><br />
              <span><strong>Location:</strong> {this.props.systems[this.props.systemId].ssStar.starName} {coords}</span><br />
              <span><strong>Shield Status: </strong> {toggleShieldsButton} <ShipShieldView ship={this.props.ship} /></span>
              <span><strong>Missle Launcher Status: </strong> <ShipMissleLauncherView ship={this.props.ship} /></span>
              <span><strong>Laser Status: </strong> <ShipLaserView ship={this.props.ship} /></span>
              <span><strong>Fuel:</strong> {fuel}</span><br />
              <span><strong>Cargo ({Math.round(totalCargo).toLocaleString()} / {cargoSize.toLocaleString()} tons):</strong><br />{cargo}{cargoInstallments}</span><br />
            </Col>
            <Col md={6}>
              <span><strong>Current Order:</strong> {currentOrder}</span><br />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ShipArmorView ship={this.props.ship} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <span><strong>Design:</strong></span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ShipDesignView shipDesign={this.props.ship.sDesign} />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

ShipSummary.propTypes = {
  ship: PropTypes.object.isRequired,
  systems: PropTypes.object.isRequired,
  systemId: PropTypes.number.isRequired,
  toggleShields: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ship: state.systems[ownProps.systemId].ssShips[ownProps.ship.sId]
})

export default connect(mapStateToProps, { toggleShields })(ShipSummary)