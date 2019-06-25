import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import PowerEfficiencySlider from '../../components/Engine/PowerEfficiencySlider'
import EngineSizeSlider from '../../components/Engine/EngineSizeSlider'
import EngineDesignCheck from '../../components/Engine/EngineDesignCheck'
import { fetchEngineFuelConsumptions } from '../../redux/actions/research/engineFuelConsumptionActions'
import { fetchEngineModifiers } from '../../redux/actions/research/engineModifierActions'
import { fetchEngineSizes } from '../../redux/actions/research/engineSizeActions'
import { fetchEngineTechnologies } from '../../redux/actions/research/engineTechnologyActions'
import { createEngine, checkEngine } from '../../redux/actions/design/engineDesignActions'

class NewEngine extends React.Component {
  constructor(props) {
    super(props)
    // Initial internal state
    this.state = {
      modifierId: null,
      sizeId: null,
      designCheck: null,
    }
    // Bind all class functions to this
    this.dataLoaded = this.dataLoaded.bind(this)
    this.onAfterChange = this.onAfterChange.bind(this)
    this.onPowerEfficiencySliderChange = this.onPowerEfficiencySliderChange.bind(this)
    this.onSizeSliderChange = this.onSizeSliderChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.peIndexToKey = this.peIndexToKey.bind(this)
    this.sizeIndexToKey = this.sizeIndexToKey.bind(this)
    this.peKeyToIndex = this.peKeyToIndex.bind(this)
    this.sizeKeyToIndex = this.sizeKeyToIndex.bind(this)
    this.handleSubmitNewDesign = this.handleSubmitNewDesign.bind(this)
    // Fetch necessary data
    if (!this.props.research ||
        !this.props.research[this.props.playerRace]) {
      this.props.fetchEngineFuelConsumptions()
      this.props.fetchEngineModifiers()
      this.props.fetchEngineSizes()
      this.props.fetchEngineTechnologies()
    } else {
      if (!this.props.research[this.props.playerRace].rEngineFuelConsumption) this.props.fetchEngineFuelConsumptions()
      if (!this.props.research[this.props.playerRace].rEngineModifier) this.props.fetchEngineModifiers()
      if (!this.props.research[this.props.playerRace].rEngineSize) this.props.fetchEngineSizes()
      if (!this.props.research[this.props.playerRace].rEngineTechnology) this.props.fetchEngineTechnologies()
    }
    // Load initial design specs
    this.checkEngineDesign()
  }
  dataLoaded() {
    if (Object.keys(this.props.research).length < 1 ||
        !('rEngineTechnology' in this.props.research[this.props.playerRace]) ||
        !('rEngineFuelConsumption' in this.props.research[this.props.playerRace]) ||
        !('rEngineModifier' in this.props.research[this.props.playerRace]) ||
        !('rEngineSize' in this.props.research[this.props.playerRace])) {
      return false
    }
    return true
  }
  checkEngineDesign() {
    if (!this.dataLoaded()) {
      return
    }
    var modifierId = this.state.modifierId ? this.state.modifierId : this.peIndexToKey(0)
    var sizeId = this.state.sizeId ? this.state.sizeId : this.sizeIndexToKey(0)
    if (modifierId === undefined || sizeId === undefined) {
      // rEngineModifiers or rEngineSizes not loaded yet.
    } else {
      checkEngine(modifierId, sizeId, function(engine) {
        if (this.state.designCheck) {
          engine.edEngine.eName = this.state.designCheck.edEngine.eName
        }
        this.setState({
          designCheck: engine
        })
      }.bind(this))
    }
  }
  onAfterChange() {
    this.checkEngineDesign()
  }
  onPowerEfficiencySliderChange(value) {
    this.setState({
      modifierId: this.peIndexToKey(value)
    })
  }
  onSizeSliderChange(value) {
    this.setState({
      sizeId: this.sizeIndexToKey(value)
    })
  }
  onNameChange(e) {
    var newEngineDesign = {}
    if (this.state.designCheck) {
      newEngineDesign = this.state.designCheck
    } else {
      newEngineDesign.edEngine = {eName: ''}
    }
    newEngineDesign.edEngine.eName = e.target.value
    this.setState({
      designCheck: newEngineDesign
    })
  }
  handleSubmitNewDesign() {
    var modifierId = this.state.modifierId ? this.state.modifierId : this.peIndexToKey(0)
    var sizeId = this.state.sizeId ? this.state.sizeId : this.sizeIndexToKey(0)
    this.props.createEngine(
      modifierId,
      sizeId,
      this.state.designCheck.edEngine.eName
    )
    Alert.success('New Engine Created!')
    this.setState({
      modifierid: null,
      sizeId: null,
      designCheck: null
    })
  }
  peToArray() {
    var obj = this.props.research[this.props.playerRace].rEngineModifier.unlocked
    var keysSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].pemrPowerEfficiencyModifier.pemEfficiencyModifier - obj[b].pemrPowerEfficiencyModifier.pemEfficiencyModifier
    })
    return keysSorted
  }
  sizeToArray() {
    var obj = this.props.research[this.props.playerRace].rEngineSize.unlocked
    var keysSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].esrEngineSize.esSize - obj[b].esrEngineSize.esSize
    })
    return keysSorted
  }
  peKeyToIndex(key) {
    var keys = this.peToArray()
    for (var i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return i
      }
    }
    return 0
  }
  sizeKeyToIndex(key) {
    var keys = this.sizeToArray()
    for (var i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return i
      }
    }
    return 0
  }
  peIndexToKey(index) {
    var keys = this.peToArray()
    return keys[index]
  }
  sizeIndexToKey(index) {
    var keys = this.sizeToArray()
    return keys[index]
  }
  render() {
    if (!this.dataLoaded()) {
      return null
    }
    var engineTechnologyName = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rEngineTechnology.unlocked).length > 0) {
      var unlocked = this.props.research[this.props.playerRace].rEngineTechnology.unlocked
      var unlockedKeys = Object.keys(unlocked)
      var aKey = unlockedKeys[unlockedKeys.length - 1]
      engineTechnologyName = this.props.research[this.props.playerRace].rEngineTechnology.unlocked[aKey].etrEngineTechnology.etName
    }
    var engineFuelConsumption = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rEngineFuelConsumption.unlocked).length > 0) {
      var engineFuelConsumptionKeys = Object.keys(this.props.research[this.props.playerRace].rEngineFuelConsumption.unlocked)
      var lastFuelConsumption = engineFuelConsumptionKeys[engineFuelConsumptionKeys.length - 1]
      engineFuelConsumption = this.props.research[this.props.playerRace].rEngineFuelConsumption.unlocked[lastFuelConsumption].fcrFuelConsumption.fcName
    }
    var peModifier = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rEngineModifier.unlocked).length > 0) {
      var modifierId = this.state.modifierId
      if (modifierId === null) {
        var randomKey = Object.keys(this.props.research[this.props.playerRace].rEngineModifier.unlocked)[0]
        modifierId = randomKey
      }
      peModifier = <PowerEfficiencySlider value={this.peKeyToIndex(modifierId)} rEngineModifiers={this.props.research[this.props.playerRace].rEngineModifier}
        onSliderChange={this.onPowerEfficiencySliderChange} onAfterChange={this.onAfterChange}
        indexToKey={this.peIndexToKey} />
    }
    var engineSize = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rEngineSize.unlocked).length > 0) {
      engineSize = <EngineSizeSlider value={this.sizeKeyToIndex(this.state.sizeId)} rEngineSizes={this.props.research[this.props.playerRace].rEngineSize}
        onSliderChange={this.onSizeSliderChange} onAfterChange={this.onAfterChange}
        indexToKey={this.sizeIndexToKey} />
    }
    var specifications = '...'
    var submitButton = ''
    if (this.state.designCheck && this.state.designCheck.edResearchCost) {
      specifications = <EngineDesignCheck designCheck={this.state.designCheck} />
      submitButton = <Button bsStyle="success" onClick={this.handleSubmitNewDesign}>Submit</Button>
    }
    var engineName = ''
    if (this.state.designCheck) {
      engineName = this.state.designCheck.edEngine.eName
    }
    return (
      <div className="new-engine-design">
        <Grid fluid={true}>
          <h3>New Engine Design</h3>
          <Row>
            <Col sm={6}>
              <form>
                <FormGroup controlId="formEngineTechnology">
                  <ControlLabel>Technology</ControlLabel>
                  <FormControl.Static>{engineTechnologyName}</FormControl.Static>
                </FormGroup>
                <FormGroup controlId="formEngineFuelConsumption">
                  <ControlLabel>Base Fuel Consumption</ControlLabel>
                  <FormControl.Static>{engineFuelConsumption}</FormControl.Static>
                </FormGroup>
                {peModifier}
                {engineSize}
                <FormGroup controlId="formEngineName">
                  <ControlLabel>Engine Design Name</ControlLabel>
                  <FormControl
                    type="text" placeholder={'Engine Design Name'} value={engineName} onChange={this.onNameChange}>
                  </FormControl>
                </FormGroup>
                {submitButton}
              </form>
            </Col>
            <Col sm={6}>
              <h4>Engine Design Specifications</h4>
              {specifications}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

NewEngine.propTypes = {
  fetchEngineFuelConsumptions: PropTypes.func.isRequired,
  fetchEngineModifiers: PropTypes.func.isRequired,
  fetchEngineSizes : PropTypes.func.isRequired,
  fetchEngineTechnologies: PropTypes.func.isRequired,
  createEngine: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research,
})

export default connect (mapStateToProps, {
  fetchEngineFuelConsumptions,
  fetchEngineModifiers,
  fetchEngineSizes,
  fetchEngineTechnologies,
  createEngine})(NewEngine)