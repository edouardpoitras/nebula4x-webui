import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import LaserFocalSizeSlider from '../../components/Laser/LaserFocalSizeSlider'
import LaserReducedSizeSlider from '../../components/Laser/LaserReducedSizeSlider'
import LaserDesignCheck from '../../components/Laser/LaserDesignCheck'
import { fetchLaserFocalSizes } from '../../redux/actions/research/laserFocalSizeActions'
import { fetchLaserRechargeRates } from '../../redux/actions/research/laserRechargeRateActions'
import { fetchLaserWavelengths } from '../../redux/actions/research/laserWavelengthActions'
import { fetchLaserReducedSizes } from '../../redux/actions/research/laserReducedSizeActions'
import { createLaser, checkLaser } from '../../redux/actions/design/laserDesignActions'

class NewLaser extends React.Component {
  constructor(props) {
    super(props)
    // Initial internal state
    this.state = {
      focalSizeId: null,
      reducedSizeId: null,
      designCheck: null,
    }
    // Bind all class functions to this
    this.dataLoaded = this.dataLoaded.bind(this)
    this.onAfterChange = this.onAfterChange.bind(this)
    this.onFocalSizeSliderChange = this.onFocalSizeSliderChange.bind(this)
    this.onReducedSizeSliderChange = this.onReducedSizeSliderChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.focalSizeIndexToKey = this.focalSizeIndexToKey.bind(this)
    this.reducedSizeIndexToKey = this.reducedSizeIndexToKey.bind(this)
    this.focalSizeKeyToIndex = this.focalSizeKeyToIndex.bind(this)
    this.reducedSizeKeyToIndex = this.reducedSizeKeyToIndex.bind(this)
    this.handleSubmitNewDesign = this.handleSubmitNewDesign.bind(this)
    // Fetch necessary data
    if (!this.props.research ||
        !this.props.research[this.props.playerRace]) {
      this.props.fetchLaserFocalSizes()
      this.props.fetchLaserWavelengths()
      this.props.fetchLaserRechargeRates()
      this.props.fetchLaserReducedSizes()
    } else {
      if (!this.props.research[this.props.playerRace].rLaserFocalSize) this.props.fetchLaserFocalSizes()
      if (!this.props.research[this.props.playerRace].rLaserWavelength) this.props.fetchLaserWavelengths()
      if (!this.props.research[this.props.playerRace].rLaserRechargeRate) this.props.fetchLaserRechargeRates()
      if (!this.props.research[this.props.playerRace].rLaserReducedSize) this.props.fetchLaserReducedSizes()
    }
    // Load initial design specs
    this.checkLaserDesign()
  }
  dataLoaded() {
    if (Object.keys(this.props.research).length < 1 ||
        !('rLaserFocalSize' in this.props.research[this.props.playerRace]) ||
        !('rLaserReducedSize' in this.props.research[this.props.playerRace]) ||
        !('rLaserWavelength' in this.props.research[this.props.playerRace]) ||
        !('rLaserRechargeRate' in this.props.research[this.props.playerRace])) {
      return false
    }
    return true
  }
  checkLaserDesign() {
    if (!this.dataLoaded()) {
      return
    }
    var focalSizeId = this.state.focalSizeId ? this.state.focalSizeId : this.focalSizeIndexToKey(0)
    var reducedSizeId = this.state.reducedSizeId ? this.state.reducedSizeId : this.reducedSizeIndexToKey(0)
    if (focalSizeId === undefined || reducedSizeId === undefined) {
      // Not loaded yet
    } else {
      checkLaser(focalSizeId, reducedSizeId, function(laser) {
        if (this.state.designCheck) {
          laser.ldLaser.lName = this.state.designCheck.ldLaser.lName
        }
        this.setState({
          designCheck: laser
        })
      }.bind(this))
    }
  }
  onAfterChange() {
    this.checkLaserDesign()
  }
  onFocalSizeSliderChange(value) {
    this.setState({
      focalSizeId: this.focalSizeIndexToKey(value)
    })
  }
  onReducedSizeSliderChange(value) {
    this.setState({
      reducedSizeId: this.reducedSizeIndexToKey(value)
    })
  }
  onNameChange(e) {
    var newLaserDesign = {}
    if (this.state.designCheck) {
      newLaserDesign = this.state.designCheck
    } else {
      newLaserDesign.ldLaser = {lName: ''}
    }
    newLaserDesign.ldLaser.lName = e.target.value
    this.setState({
      designCheck: newLaserDesign
    })
  }
  handleSubmitNewDesign() {
    var focalSizeId = this.state.focalSizeId ? this.state.focalSizeId : this.focalSizeIndexToKey(0)
    var reducedSizeId = this.state.reducedSizeId ? this.state.reducedSizeId : this.reducedSizeIndexToKey(0)
    this.props.createLaser(
      focalSizeId,
      reducedSizeId,
      this.state.designCheck.ldLaser.lName
    )
    Alert.success('New Laser Created!')
    this.setState({
      focalSizeId: null,
      reducedSizeId: null,
      designCheck: null
    })
  }
  focalSizeToArray() {
    var obj = this.props.research[this.props.playerRace].rLaserFocalSize.unlocked
    var keysSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].lfsrLaserFocalSize.lfsSize - obj[b].lfsrLaserFocalSize.lfsSize
    })
    return keysSorted
  }
  reducedSizeToArray() {
    var obj = this.props.research[this.props.playerRace].rLaserReducedSize.unlocked
    var keysSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].lrsrLaserReducedSize.lrsRechargeMultiplier - obj[b].lrsrLaserReducedSize.lrsRechargeMultiplier
    })
    return keysSorted
  }
  focalSizeKeyToIndex(key) {
    var keys = this.focalSizeToArray()
    for (var i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return i
      }
    }
    return 0
  }
  reducedSizeKeyToIndex(key) {
    var keys = this.reducedSizeToArray()
    for (var i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return i
      }
    }
    return 0
  }
  focalSizeIndexToKey(index) {
    var keys = this.focalSizeToArray()
    return keys[index]
  }
  reducedSizeIndexToKey(index) {
    var keys = this.reducedSizeToArray()
    return keys[index]
  }
  render() {
    if (!this.dataLoaded()) {
      return null
    }
    var laserFocalSize = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rLaserFocalSize.unlocked).length > 0) {
      laserFocalSize = <LaserFocalSizeSlider value={this.focalSizeKeyToIndex(this.state.focalSizeId)} rLaserFocalSizes={this.props.research[this.props.playerRace].rLaserFocalSize }
        onSliderChange={this.onFocalSizeSliderChange} onAfterChange={this.onAfterChange}
        indexToKey={this.focalSizeIndexToKey} />
    }
    var laserWavelengthName = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rLaserWavelength.unlocked).length > 0) {
      var unlockedWL = this.props.research[this.props.playerRace].rLaserWavelength.unlocked
      var unlockedWLKeys = Object.keys(unlockedWL)
      var lastWLKey = unlockedWLKeys[unlockedWLKeys.length - 1]
      laserWavelengthName = this.props.research[this.props.playerRace].rLaserWavelength.unlocked[lastWLKey].lwrLaserWavelength.lwName
    }
    var laserRechargeRateName = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rLaserRechargeRate.unlocked).length > 0) {
      var unlockedRR = this.props.research[this.props.playerRace].rLaserRechargeRate.unlocked
      var unlockedRRKeys = Object.keys(unlockedRR)
      var lastRRKey = unlockedRRKeys[unlockedRRKeys.length - 1]
      laserRechargeRateName = this.props.research[this.props.playerRace].rLaserRechargeRate.unlocked[lastRRKey].lrrrLaserRechargeRate.lrrName
    }
    var laserReducedSize = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rLaserReducedSize.unlocked).length > 0) {
      laserReducedSize = <LaserReducedSizeSlider value={this.reducedSizeKeyToIndex(this.state.reducedSizeId)} rLaserReducedSizes={this.props.research[this.props.playerRace].rLaserReducedSize}
        onSliderChange={this.onReducedSizeSliderChange} onAfterChange={this.onAfterChange}
        indexToKey={this.reducedSizeIndexToKey} />
    }
    var specifications = '...'
    var submitButton = ''
    if (this.state.designCheck && this.state.designCheck.ldResearchCost) {
      specifications = <LaserDesignCheck designCheck={this.state.designCheck} />
      submitButton = <Button bsStyle="success" onClick={this.handleSubmitNewDesign}>Submit</Button>
    }
    var laserName = ''
    if (this.state.designCheck) {
      laserName = this.state.designCheck.ldLaser.lName
    }
    return (
      <div className="new-laser-design">
        <Grid fluid={true}>
          <h3>New Laser Design</h3>
          <Row>
            <Col sm={6}>
              <form>
                {laserFocalSize}
                <FormGroup controlId="formLaserWavelength">
                  <ControlLabel>Wavelength</ControlLabel>
                  <FormControl.Static>{laserWavelengthName}</FormControl.Static>
                </FormGroup>
                <FormGroup controlId="formLaserRechargeRate">
                  <ControlLabel>Recharge Rate</ControlLabel>
                  <FormControl.Static>{laserRechargeRateName}</FormControl.Static>
                </FormGroup>
                {laserReducedSize}
                <FormGroup controlId="formLaserName">
                  <ControlLabel>Laser Design Name</ControlLabel>
                  <FormControl
                    type="text" placeholder={'Laser Design Name'} value={laserName} onChange={this.onNameChange}>
                  </FormControl>
                </FormGroup>
                {submitButton}
              </form>
            </Col>
            <Col sm={6}>
              <h4>Laser Design Specifications</h4>
              {specifications}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

NewLaser.propTypes = {
  fetchLaserFocalSizes : PropTypes.func.isRequired,
  fetchLaserWavelengths: PropTypes.func.isRequired,
  fetchLaserRechargeRates: PropTypes.func.isRequired,
  fetchLaserReducedSizes : PropTypes.func.isRequired,
  createLaser: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect (mapStateToProps, {
  fetchLaserFocalSizes,
  fetchLaserWavelengths,
  fetchLaserReducedSizes,
  fetchLaserRechargeRates,
  createLaser})(NewLaser)