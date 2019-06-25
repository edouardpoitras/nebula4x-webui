import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap'

class ShipDesignView extends React.Component {
  render() {
    const shipDesign = this.props.shipDesign
    var armorLayers = shipDesign.sdArmor.length
    var armor = armorLayers === 1 ? armorLayers + ' Layer (' : armorLayers + ' Layers ('
    armor += shipDesign.sdArmor[0].aName + ')'
    var shieldsRating = 0
    shipDesign.sdShields.map(function(shield) {
      shieldsRating += shield.shRating
      return null
    })
    if (shieldsRating === 0) {
      shieldsRating = 'None'
    }
    var missleLaunchers = 'None'
    var numMissleLaunchers = shipDesign.sdMissleLaunchers.length
    if (numMissleLaunchers > 0) {
      var firstMissleLauncher = shipDesign.sdMissleLaunchers[0]
      var missleStrength = firstMissleLauncher.mlMissle.missStrength
      var secondsToFireML = 1 / firstMissleLauncher.mlReloadRate
      var minutesToFireML = (secondsToFireML / 60).toFixed(1).toLocaleString()
      missleLaunchers = numMissleLaunchers + 'x ' + shipDesign.sdMissleLaunchers[0].mlName + ' (fires every ' + minutesToFireML + ' minutes for ' + missleStrength * numMissleLaunchers + ' total damage)'
    }
    var lasers = 'None'
    var numLasers = shipDesign.sdLasers.length
    if (numLasers > 0) {
      var firstLaser = shipDesign.sdLasers[0]
      var laserDamage = firstLaser.lDamage
      var secondsToFireL = 1 / firstLaser.lRechargeRate
      var minutesToFireL = (secondsToFireL / 60).toFixed(1).toLocaleString()
      lasers = numLasers + 'x ' + shipDesign.sdLasers[0].lName + ' (fires every ' + minutesToFireL + ' minutes for ' + laserDamage * numLasers + ' total damage)'
    }
    var buildCostPieces = []
    for (let element of Object.keys(shipDesign.sdBuildCost)) {
      buildCostPieces.push(shipDesign.sdBuildCost[element].toLocaleString() + 'x ' + element)
    }
    var buildCost = buildCostPieces.join(' | ')
    var cargoCapacity = 0
    for (let ch of shipDesign.sdCargoHolds) {
      cargoCapacity += ch.cHoldRating
    }
    if (cargoCapacity === 0) {
      cargoCapacity = 'None'
    } else {
      cargoCapacity = cargoCapacity.toLocaleString() + ' tons'
    }
    var cargoHandlingMultiplier = 0
    for (let chs of shipDesign.sdCargoHandlingSystems) {
      cargoHandlingMultiplier += chs.cHandleRating
    }
    var cHandlingM = 'None'
    if (cargoHandlingMultiplier > 0) {
      cHandlingM = cargoHandlingMultiplier.toLocaleString() + 'x'
    }
    var geoSurveySpeed = 0
    for (let gs of shipDesign.sdGeologicalSensors) {
      geoSurveySpeed += gs.senRating
    }
    if (geoSurveySpeed === 0) {
      geoSurveySpeed = 'None'
    } else {
      geoSurveySpeed = geoSurveySpeed.toLocaleString() + 'x'
    }
    var gravSurveySpeed = 0
    for (let gs of shipDesign.sdGravitationalSensors) {
      gravSurveySpeed += gs.senRating
    }
    if (gravSurveySpeed === 0) {
      gravSurveySpeed = 'None'
    } else {
      gravSurveySpeed = gravSurveySpeed.toLocaleString() + 'x'
    }
    var jumpGateMultiplier = 0
    for (let jg of shipDesign.sdJumpGates) {
      jumpGateMultiplier += jg.jgRating
    }
    var jumpGateM = 'None'
    if (jumpGateMultiplier > 0) {
      jumpGateM = jumpGateMultiplier.toLocaleString() + 'x'
    }
    var fuelCapacity = this.props.shipDesign.sdFuelStorages.map(function(fuelStorage) { return fuelStorage.fsRating }).reduce((a, b) => a + b)
    var fuelEfficiency = this.props.shipDesign.sdEngines.map(function(engine) { return engine.eEfficiency }).reduce((a, b) => a + b)
    var shipPower = this.props.shipDesign.sdEngines.map(function(engine) { return engine.eRating }).reduce((a, b) => a + b)
    var fuelPowerEfficiency = shipPower * fuelEfficiency
    var title = 
      <Row>
        <Col sm={12}>
          {shipDesign.sdName}
        </Col>
      </Row>
    if (this.props.handleDeleteClick) {
      title = 
        <Row>
          <Col sm={10}>
            {shipDesign.sdName}
          </Col>
          <Col sm={2} className="text-right">
            <Button onClick={this.props.handleDeleteClick}>
              <Glyphicon glyph="trash" />
            </Button>
          </Col>
        </Row>
    }
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>{title}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Row>
            <Col md={6}>
              <span><strong>Size:</strong> {shipDesign.sdSize.toLocaleString()} tons</span><br />
              <span><strong>Armor:</strong> {armor}</span><br />
              <span><strong>Shield Capacity:</strong> {shieldsRating}</span><br />
              <span><strong>Missle Launchers:</strong> {missleLaunchers}</span><br />
              <span><strong>Lasers:</strong> {lasers}</span><br />
              <span><strong>Speed:</strong> {Math.round(shipDesign.sdSpeed).toLocaleString()} km/s</span><br />
              <span><strong>Range:</strong> {Math.round(shipDesign.sdRange / 1000000).toLocaleString()} million km</span><br />
              <span><strong>Fuel Capacity:</strong> {Math.round(fuelCapacity).toLocaleString()} L</span><br />
              <span><strong>Power:</strong> {Math.round(shipPower).toLocaleString()}</span><br />
            </Col>
            <Col md={6}>
              <span><strong>Class:</strong> {shipDesign.sdClass.replace('Class', '')}</span><br />
              <span><strong>Fuel Efficiency:</strong> {fuelEfficiency.toFixed(1).toLocaleString()} Litres / Hour</span><br />
              <span><strong>Fuel Power Efficiency:</strong> {fuelPowerEfficiency.toFixed(1).toLocaleString()} Litres / Power / Hour</span><br />
              <span><strong>Cargo Capacity:</strong> {cargoCapacity}</span><br />
              <span><strong>Cargo Handling Multiplier:</strong> {cHandlingM}</span><br />
              <span><strong>Geological Survey Speed:</strong> {geoSurveySpeed}</span><br />
              <span><strong>Gravitational Survey Speed:</strong> {gravSurveySpeed}</span><br />
              <span><strong>Jump Grate Construction Multiplier:</strong> {jumpGateM}</span><br />
              <span><strong>Cost:</strong> {buildCost}</span><br />
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

ShipDesignView.propTypes = {
  shipDesign: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func
}

export default ShipDesignView