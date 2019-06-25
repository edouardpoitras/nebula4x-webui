import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col, ControlLabel, Button, Glyphicon } from 'react-bootstrap'
import EngineDesignSelect from '../../Engine/EngineDesignSelect'
import MissleLauncherDesignSelect from '../../MissleLauncher/MissleLauncherDesignSelect'
import LaserDesignSelect from '../../Laser/LaserDesignSelect'
import { researchCargoHandlingSystems } from '../../../redux/actions/research/cargoHandlingSystemActions'
import { researchCargoHolds } from '../../../redux/actions/research/cargoHoldActions'
import { researchJumpGates } from '../../../redux/actions/research/jumpGateActions'
import { researchGeologicalSensors } from '../../../redux/actions/research/geologicalSensorActions'
import { researchGravitationalSensors } from '../../../redux/actions/research/gravitationalSensorActions'
import { researchEngineFuelConsumptions } from '../../../redux/actions/research/engineFuelConsumptionActions'
import { researchEngineModifiers } from '../../../redux/actions/research/engineModifierActions'
import { researchEngineSizes } from '../../../redux/actions/research/engineSizeActions'
import { researchEngineTechnologies } from '../../../redux/actions/research/engineTechnologyActions'
import { researchMissleLauncherSizes } from '../../../redux/actions/research/missleLauncherSizeActions'
import { researchMissleLauncherReloadRates } from '../../../redux/actions/research/missleLauncherReloadRateActions'
import { researchMissleLauncherReducedSizes } from '../../../redux/actions/research/missleLauncherReducedSizeActions'
import { researchLaserFocalSizes } from '../../../redux/actions/research/laserFocalSizeActions'
import { researchLaserWavelengths } from '../../../redux/actions/research/laserWavelengthActions'
import { researchLaserRechargeRates } from '../../../redux/actions/research/laserRechargeRateActions'
import { researchLaserReducedSizes } from '../../../redux/actions/research/laserReducedSizeActions'
import { researchArmor } from '../../../redux/actions/research/armorActions'
import { researchShields } from '../../../redux/actions/research/shieldActions'
import { researchFuelStorages } from '../../../redux/actions/research/fuelStorageActions'
import { researchMines, researchResearchLabs, researchFuelRefineries, researchConstructionFactories, researchMassDrivers } from '../../../redux/actions/research/installmentActions'
import { researchEngines } from '../../../redux/actions/design/engineDesignActions'
import { researchMissleLaunchers } from '../../../redux/actions/design/missleLauncherDesignActions'
import { researchLasers } from '../../../redux/actions/design/laserDesignActions'
import { fetchRaceResearch } from '../../../redux/actions/research/researchActions'
import { fetchBodyInstallments } from '../../../redux/actions/installments/installmentActions'

class BodyResearch extends React.Component {
  constructor(props) {
    super(props)
    this.handleEngineDesignChange = this.handleEngineDesignChange.bind(this)
    this.handleMissleLauncherDesignChange = this.handleMissleLauncherDesignChange.bind(this)
    this.handleLaserDesignChange = this.handleLaserDesignChange.bind(this)
    // This is also used for ordering on the research page.
    this.researchNames = {
      rEngineDesigns: 'Engine Design',
      rMissleLauncherDesigns: 'Missle Launcher Design',
      rLaserDesigns: 'Laser Design',
      rArmor: 'Armor',
      rShield: 'Shields',
      rEngineFuelConsumption: 'Engine Fuel Consumption',
      rEngineModifier: 'Engine Power/Efficiency Modifier',
      rEngineSize: 'Engine Size',
      rEngineTechnology: 'Engine Technology',
      rMissleLauncherSize: 'Missle Launcher Size',
      rMissleLauncherReloadRate: 'Missle Launcher Reload Rate',
      rMissleLauncherReducedSize: 'Missle Launcher Size Reduction',
      rLaserFocalSize: 'Laser Focal Size',
      rLaserWavelength: 'Laser Wavelength',
      rLaserRechargeRate: 'Laser Recharge Rate',
      rLaserReducedSize: 'Laser Size Reduction',
      rFuelStorage: 'Fuel Storage',
      rCargoHandling: 'Cargo Handling',
      rCargoHold: 'Cargo Hold',
      rJumpGate: 'Jump Gate Contruction Module',
      rGeologicalSensor: 'Geological Sensor',
      rGravitationalSensor: 'Gravitational Sensor',
      rMines: 'Mines',
      rResearchLabs: 'Research Labs',
      rFuelRefineries: 'Fuel Refineries',
      rConstructionFactories: 'Construction Factories',
      rMassDrivers: 'Mass Drivers'
    }
    this.researchCosts = {
      rEngineDesigns: 'edResearchCost',
      rEngineFuelConsumption: 'fcrResearchCost',
      rEngineModifier: 'pemrResearchCost',
      rEngineSize: 'esrResearchCost',
      rEngineTechnology: 'etrResearchCost',
      rMissleLauncherDesigns: 'mldResearchCost',
      rMissleLauncherSize: 'mlsrResearchCost',
      rMissleLauncherReloadRate: 'mlrrrResearchCost',
      rMissleLauncherReducedSize: 'mlrsrResearchCost',
      rLaserDesigns: 'ldResearchCost',
      rLaserFocalSize: 'lfsrResearchCost',
      rLaserWavelength: 'lwrResearchCost',
      rLaserRechargeRate: 'lrrrResearchCost',
      rLaserReducedSize: 'lrsrResearchCost',
      rArmor: 'arResearchCost',
      rShield: 'shrResearchCost',
      rFuelStorage: 'fsrResearchCost',
      rCargoHandling: 'chsrResearchCost',
      rCargoHold: 'chrResearchCost',
      rJumpGate: 'jgrResearchCost',
      rGeologicalSensor: 'srResearchCost',
      rGravitationalSensor: 'srResearchCost',
      rMines: 'irResearchCost',
      rResearchLabs: 'irResearchCost',
      rFuelRefineries: 'irResearchCost',
      rConstructionFactories: 'irResearchCost',
      rMassDrivers: 'irResearchCost'
    }
    this.researchProgresses = {
      rEngineDesigns: 'edResearchProgress',
      rEngineFuelConsumption: 'fcrResearchProgress',
      rEngineModifier: 'pemrResearchProgress',
      rEngineSize: 'esrResearchProgress',
      rEngineTechnology: 'etrResearchProgress',
      rMissleLauncherDesigns: 'mldResearchProgress',
      rMissleLauncherSize: 'mlsrResearchProgress',
      rMissleLauncherReloadRate: 'mlrrrResearchProgress',
      rMissleLauncherReducedSize: 'mlrsrResearchProgress',
      rLaserDesigns: 'ldResearchProgress',
      rLaserFocalSize: 'lfsrResearchProgress',
      rLaserWavelength: 'lwrResearchProgress',
      rLaserRechargeRate: 'lrrrResearchProgress',
      rLaserReducedSize: 'lrsrResearchProgress',
      rArmor: 'arResearchProgress',
      rShield: 'shrResearchProgress',
      rFuelStorage: 'fsrResearchProgress',
      rCargoHandling: 'chsrResearchProgress',
      rCargoHold: 'chrResearchProgress',
      rJumpGate: 'jgrResearchProgress',
      rGeologicalSensor: 'srResearchProgress',
      rGravitationalSensor: 'srResearchProgress',
      rMines: 'irResearchProgress',
      rResearchLabs: 'irResearchProgress',
      rFuelRefineries: 'irResearchProgress',
      rConstructionFactories: 'irResearchProgress',
      rMassDrivers: 'irResearchProgress'
    }
    this.researchComponents = {
      rEngineDesigns: 'edEngine',
      rEngineFuelConsumption: 'fcrFuelConsumption',
      rEngineModifier: 'pemrPowerEfficiencyModifier',
      rEngineSize: 'esrEngineSize',
      rEngineTechnology: 'etrEngineTechnology',
      rMissleLauncherDesigns: 'mldMissleLauncher',
      rMissleLauncherSize: 'mlsrMissleLauncherSize',
      rMissleLauncherReloadRate: 'mlrrrMissleLauncherReloadRate',
      rMissleLauncherReducedSize: 'mlrsrMissleLauncherReducedSize',
      rLaserDesigns: 'ldLaser',
      rLaserFocalSize: 'lfsrLaserFocalSize',
      rLaserWavelength: 'lwrLaserWavelength',
      rLaserRechargeRate: 'lrrrLaserRechargeRate',
      rLaserReducedSize: 'lrsrLaserReducedSize',
      rArmor: 'arArmor',
      rShield: 'shrShield',
      rFuelStorage: 'fsrFuelStorage',
      rCargoHandling: 'chsrCargoHandling',
      rCargoHold: 'chrCargoHold',
      rJumpGate: 'jgrJumpGate',
      rGeologicalSensor: 'srSensor',
      rGravitationalSensor: 'srSensor',
      rMines: 'irInstallment',
      rResearchLabs: 'irInstallment',
      rFuelRefineries: 'irInstallment',
      rConstructionFactories: 'irInstallment',
      rMassDrivers: 'irInstallment'
    }
    this.researchIds = {
      rEngineDesigns: 'edId',
      rEngineFuelConsumption: 'fcrId',
      rEngineModifier: 'pemrId',
      rEngineSize: 'esrId',
      rEngineTechnology: 'etrId',
      rMissleLauncherDesigns: 'mldId',
      rMissleLauncherSize: 'mlsrId',
      rMissleLauncherReloadRate: 'mlrrrId',
      rMissleLauncherReducedSize: 'mlrsrId',
      rLaserDesigns: 'ldId',
      rLaserFocalSize: 'lfsrId',
      rLaserWavelength: 'lwrId',
      rLaserRechargeRate: 'lrrrId',
      rLaserReducedSize: 'lrsrId',
      rArmor: 'arId',
      rShield: 'shrId',
      rFuelStorage: 'fsrId',
      rCargoHandling: 'chsrId',
      rCargoHold: 'chrId',
      rJumpGate: 'jgrId',
      rGeologicalSensor: 'srId',
      rGravitationalSensor: 'srId',
      rMines: 'irId',
      rResearchLabs: 'irId',
      rFuelRefineries: 'irId',
      rConstructionFactories: 'irId',
      rMassDrivers: 'irId'
    }
    this.researchComponentNames = {
      rEngineDesigns: 'eName',
      rEngineFuelConsumption: 'fcName',
      rEngineModifier: 'pemName',
      rEngineSize: 'esSize',
      rEngineTechnology: 'etName',
      rMissleLauncherDesigns: 'mlName',
      rMissleLauncherSize: 'mlsName',
      rMissleLauncherReloadRate: 'mlrrName',
      rMissleLauncherReducedSize: 'mlrsName',
      rLaserDesigns: 'lName',
      rLaserFocalSize: 'lfsName',
      rLaserWavelength: 'lwName',
      rLaserRechargeRate: 'lrrName',
      rLaserReducedSize: 'lrsName',
      rArmor: 'aName',
      rShield: 'shName',
      rFuelStorage: 'fsName',
      rCargoHandling: 'cHandleName',
      rCargoHold: 'cHoldName',
      rJumpGate: 'jgName',
      rGeologicalSensor: 'senName',
      rGravitationalSensor: 'senName',
      rMines: 'iName',
      rResearchLabs: 'iName',
      rFuelRefineries: 'iName',
      rConstructionFactories: 'iName',
      rMassDrivers: 'iName'
    }
    this.researchCallbacks = {
      rEngineDesigns: this.props.researchEngines,
      rEngineFuelConsumption: this.props.researchEngineFuelConsumptions,
      rEngineModifier: this.props.researchEngineModifiers,
      rEngineSize: this.props.researchEngineSizes,
      rEngineTechnology: this.props.researchEngineTechnologies,
      rMissleLauncherDesigns: this.props.researchMissleLaunchers,
      rMissleLauncherSize: this.props.researchMissleLauncherSizes,
      rMissleLauncherReloadRate: this.props.researchMissleLauncherReloadRates,
      rMissleLauncherReducedSize: this.props.researchMissleLauncherReducedSizes,
      rLaserDesigns: this.props.researchLasers,
      rLaserFocalSize: this.props.researchLaserFocalSizes,
      rLaserWavelength: this.props.researchLaserWavelengths,
      rLaserRechargeRate: this.props.researchLaserRechargeRates,
      rLaserReducedSize: this.props.researchLaserReducedSizes,
      rArmor: this.props.researchArmor,
      rShield: this.props.researchShields,
      rFuelStorage: this.props.researchFuelStorages,
      rCargoHandling: this.props.researchCargoHandlingSystems,
      rCargoHold: this.props.researchCargoHolds,
      rJumpGate: this.props.researchJumpGates,
      rGeologicalSensor: this.props.researchGeologicalSensors,
      rGravitationalSensor: this.props.researchGravitationalSensors,
      rMines: this.props.researchMines,
      rResearchLabs: this.props.researchResearchLabs,
      rFuelRefineries: this.props.researchFuelRefineries,
      rConstructionFactories: this.props.researchConstructionFactories,
      rMassDrivers: this.props.researchMassDrivers
    }
  }
  componentDidMount() {
    if (Object.keys(this.props.research).length < 1 || !this.props.research[this.props.playerRace]) {
      this.props.fetchRaceResearch()
    }
    if (!this.props.body || !this.props.body.bInstallments) {
      // TODO: Only really need to make an API call to get the number of research labs on the body.
      this.props.fetchBodyInstallments(this.props.systemId, this.props.bodyId)
    }
  }
  getActiveLabs() {
    var count = 0
    Object.keys(this.props.research[this.props.playerRace]).map(function (researchType) {
      if (this.props.research[this.props.playerRace][researchType].researchLabs[this.props.bodyId]) {
        count += this.props.research[this.props.playerRace][researchType].researchLabs[this.props.bodyId]
      }
      return null
    }.bind(this))
    return count
  }
  getIdleLabs() {
    var installments = this.props.body.bInstallments
    var researchLabNum = 0
    Object.keys(installments).map(function (installmentId) {
      if (installments[installmentId].isInstallment.tag === 'ResearchLab') {
        researchLabNum = installments[installmentId].isCount
      }
      return null
    })
    return researchLabNum
  }
  makeOnLabChanger(id, num) {
    return function () {
      var activeLabs = this.getActiveLabs()
      var idleLabs = this.getIdleLabs()
      var availableLabs = idleLabs + activeLabs
      var oldValue = 0
      if (this.props.research[this.props.playerRace][id].researchLabs[this.props.bodyId]) {
        oldValue = this.props.research[this.props.playerRace][id].researchLabs[this.props.bodyId]
      }
      var newValue = oldValue + num
      if (newValue < 0) {
        num = -oldValue
        newValue = 0
      }
      var newTotal = activeLabs + num
      if (newTotal <= availableLabs) {
        this.researchCallbacks[id](this.props.systemId, this.props.bodyId, newValue)
        // TODO: Can make a smaller API call to just get body research lab count.
        this.props.fetchBodyInstallments(this.props.systemId, this.props.bodyId)
      } else if (activeLabs < availableLabs) {
        var adjustedAmount = availableLabs - activeLabs + oldValue
        this.researchCallbacks[id](this.props.systemId, this.props.bodyId, adjustedAmount)
        // TODO: Can make a smaller API call to just get body research lab count.
        this.props.fetchBodyInstallments(this.props.systemId, this.props.bodyId)
      }
    }.bind(this)
  }
  getResearchSelection(research, researchId) {
    if (researchId === 'rEngineDesigns' && (research.rEngineDesigns.pending || research.rEngineDesigns.researchLabs[this.props.bodyId])) {
      return <EngineDesignSelect playerRace={this.props.playerRace} onChange={this.handleEngineDesignChange} />
    } else if (researchId === 'rMissleLauncherDesigns' && (research.rMissleLauncherDesigns.pending || research.rMissleLauncherDesigns.researchLabs[this.props.bodyId])) {
      return <MissleLauncherDesignSelect playerRace={this.props.playerRace} onChange={this.handleMissleLauncherDesignChange} />
    } else if (researchId === 'rLaserDesigns' && (research.rLaserDesigns.pending || research.rLaserDesigns.researchLabs[this.props.bodyId])) {
      return <LaserDesignSelect playerRace={this.props.playerRace} onChange={this.handleLaserDesignChange} />
    }
    var component = this.researchComponents[researchId]
    var componentName = this.researchComponentNames[researchId]
    var researchCost = this.researchCosts[researchId]
    var researchProgress = this.researchProgresses[researchId]
    if (research[researchId].pending || (research[researchId].researchLabs[this.props.bodyId])) {
      if (research[researchId].pending) {
        var cost = Math.round(this.props.research[this.props.playerRace][researchId].pending[researchCost])
        var percent = Math.round(this.props.research[this.props.playerRace][researchId].pending[researchProgress] * 100)
        var label = research[researchId].pending[component][componentName] + ' (' + cost + ' RP - ' + percent + '%)'
        return <span>{label}</span>
      } else {
        return <span>All Research Unlocked</span>
      }
    }
    return null
  }
  handleEngineDesignChange(selection) {
    var numLabs = 0
    if (this.props.research[this.props.playerRace].rEngineDesigns.researchLabs[this.props.bodyId]) {
      numLabs = this.props.research[this.props.playerRace].rEngineDesigns.researchLabs[this.props.bodyId]
    }
    this.props.researchEngines(this.props.systemId, this.props.bodyId, numLabs, selection.target.value)
  }
  handleMissleLauncherDesignChange(selection) {
    var numLabs = 0
    if (this.props.research[this.props.playerRace].rMissleLauncherDesigns.researchLabs[this.props.bodyId]) {
      numLabs = this.props.research[this.props.playerRace].rMissleLauncherDesigns.researchLabs[this.props.bodyId]
    }
    this.props.researchMissleLaunchers(this.props.systemId, this.props.bodyId, numLabs, selection.target.value)
  }
  handleLaserDesignChange(selection) {
    var numLabs = 0
    if (this.props.research[this.props.playerRace].rLaserDesigns.researchLabs[this.props.bodyId]) {
      numLabs = this.props.research[this.props.playerRace].rLaserDesigns.researchLabs[this.props.bodyId]
    }
    this.props.researchLasers(this.props.systemId, this.props.bodyId, numLabs, selection.target.value)
  }
  render() {
    if (Object.keys(this.props.research).length < 1 || !this.props.research[this.props.playerRace]) {
      return null
    }
    var activeLabs = this.getActiveLabs()
    var idleLabs = this.getIdleLabs()
    var maxLabs = activeLabs + idleLabs
    var info = (
      <div>
        <br /><span><strong>Research Labs - {activeLabs} / {maxLabs}</strong></span><br /><br />
      </div>
    )
    var researchItems = []
    Object.keys(this.researchNames).map(function (researchId) {
      var researchName = this.researchNames[researchId]
      var value = 0
      if (this.props.research[this.props.playerRace][researchId].researchLabs[this.props.bodyId]) {
        value = this.props.research[this.props.playerRace][researchId].researchLabs[this.props.bodyId]
      }
      var researchSelection = this.getResearchSelection(this.props.research[this.props.playerRace], researchId)
      if (researchSelection) {
        researchItems.push(
          <div key={researchId}>
            <hr />
            <Row className='clearfix'>
              <Col sm={4}>
                <span><strong>{researchName}: </strong></span>
              </Col>
              <Col sm={4}>
                {researchSelection}
              </Col>
              <Col sm={4}>
                <Row>
                  <Col sm={6}>
                    Research Labs
                    <span className='research-count'> x {value} </span>
                  </Col>
                  <Col sm={6}>
                    <Row>
                      <ControlLabel>
                        <Button onClick={this.makeOnLabChanger(researchId, 1)}>
                          <Glyphicon glyph='plus' />
                        </Button>
                      </ControlLabel>
                      <ControlLabel>
                        <Button onClick={this.makeOnLabChanger(researchId, 10)}>
                          <Glyphicon glyph='plus' />
                          <Glyphicon glyph='plus' />
                        </Button>
                      </ControlLabel>
                      <ControlLabel>
                        <Button onClick={this.makeOnLabChanger(researchId, 100)}>
                          <Glyphicon glyph='plus' />
                          <Glyphicon glyph='plus' />
                          <Glyphicon glyph='plus' />
                        </Button>
                      </ControlLabel>
                    </Row>
                    <Row>
                      <ControlLabel>
                        <Button onClick={this.makeOnLabChanger(researchId, -1)}>
                          <Glyphicon glyph='minus' />
                        </Button>
                      </ControlLabel>
                      <ControlLabel>
                        <Button onClick={this.makeOnLabChanger(researchId, -10)}>
                          <Glyphicon glyph='minus' />
                          <Glyphicon glyph='minus' />
                        </Button>
                      </ControlLabel>
                      <ControlLabel>
                        <Button onClick={this.makeOnLabChanger(researchId, -100)}>
                          <Glyphicon glyph='minus' />
                          <Glyphicon glyph='minus' />
                          <Glyphicon glyph='minus' />
                        </Button>
                      </ControlLabel>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )
      }
      return null
    }.bind(this))
    return (
      <Grid fluid={true}>
        {info}
        {researchItems}
      </Grid>
    )
  }
}

BodyResearch.propTypes = {
  body: PropTypes.object.isRequired,
  bodyId: PropTypes.number.isRequired,
  systemId: PropTypes.number.isRequired,
  research: PropTypes.object.isRequired,
  fetchRaceResearch: PropTypes.func.isRequired,
  fetchBodyInstallments: PropTypes.func.isRequired,
  researchCargoHandlingSystems: PropTypes.func.isRequired,
  researchCargoHolds: PropTypes.func.isRequired,
  researchJumpGates: PropTypes.func.isRequired,
  researchEngineFuelConsumptions: PropTypes.func.isRequired,
  researchEngineModifiers: PropTypes.func.isRequired,
  researchEngineSizes: PropTypes.func.isRequired,
  researchEngineTechnologies: PropTypes.func.isRequired,
  researchMissleLauncherSizes: PropTypes.func.isRequired,
  researchMissleLauncherReloadRates: PropTypes.func.isRequired,
  researchMissleLauncherReducedSizes: PropTypes.func.isRequired,
  researchLaserFocalSizes: PropTypes.func.isRequired,
  researchLaserWavelengths: PropTypes.func.isRequired,
  researchLaserRechargeRates: PropTypes.func.isRequired,
  researchLaserReducedSizes: PropTypes.func.isRequired,
  researchArmor: PropTypes.func.isRequired,
  researchShields: PropTypes.func.isRequired,
  researchFuelStorages: PropTypes.func.isRequired,
  researchGeologicalSensors: PropTypes.func.isRequired,
  researchGravitationalSensors: PropTypes.func.isRequired,
  researchEngines: PropTypes.func.isRequired,
  researchMissleLaunchers: PropTypes.func.isRequired,
  researchLasers: PropTypes.func.isRequired,
  researchMines: PropTypes.func.isRequired,
  researchResearchLabs: PropTypes.func.isRequired,
  researchFuelRefineries: PropTypes.func.isRequired,
  researchConstructionFactories: PropTypes.func.isRequired,
  researchMassDrivers: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  research: state.research,
  body: state.systems[ownProps.systemId].ssBodies[ownProps.bodyId]
})

export default connect(mapStateToProps, {
  fetchRaceResearch,
  fetchBodyInstallments,
  researchCargoHandlingSystems,
  researchCargoHolds,
  researchJumpGates,
  researchEngineFuelConsumptions,
  researchEngineModifiers,
  researchEngineSizes,
  researchEngineTechnologies,
  researchMissleLauncherSizes,
  researchMissleLauncherReloadRates,
  researchMissleLauncherReducedSizes,
  researchLaserFocalSizes,
  researchLaserWavelengths,
  researchLaserRechargeRates,
  researchLaserReducedSizes,
  researchFuelStorages,
  researchArmor,
  researchShields,
  researchGeologicalSensors,
  researchGravitationalSensors,
  researchEngines,
  researchMissleLaunchers,
  researchLasers,
  researchMines,
  researchResearchLabs,
  researchFuelRefineries,
  researchConstructionFactories,
  researchMassDrivers
})(BodyResearch)