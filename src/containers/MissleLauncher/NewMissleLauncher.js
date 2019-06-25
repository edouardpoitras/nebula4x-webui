import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import MissleLauncherSizeSlider from '../../components/MissleLauncher/MissleLauncherSizeSlider'
import MissleLauncherReducedSizeSlider from '../../components/MissleLauncher/MissleLauncherReducedSizeSlider'
import MissleLauncherDesignCheck from '../../components/MissleLauncher/MissleLauncherDesignCheck'
import { fetchMissleLauncherSizes } from '../../redux/actions/research/missleLauncherSizeActions'
import { fetchMissleLauncherReloadRates } from '../../redux/actions/research/missleLauncherReloadRateActions'
import { fetchMissleLauncherReducedSizes } from '../../redux/actions/research/missleLauncherReducedSizeActions'
import { createMissleLauncher, checkMissleLauncher } from '../../redux/actions/design/missleLauncherDesignActions'

class NewMissleLauncher extends React.Component {
  constructor(props) {
    super(props)
    // Initial internal state
    this.state = {
      sizeId: null,
      reducedSizeId: null,
      designCheck: null,
    }
    // Bind all class functions to this
    this.dataLoaded = this.dataLoaded.bind(this)
    this.onAfterChange = this.onAfterChange.bind(this)
    this.onSizeSliderChange = this.onSizeSliderChange.bind(this)
    this.onReducedSizeSliderChange = this.onReducedSizeSliderChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.sizeIndexToKey = this.sizeIndexToKey.bind(this)
    this.reducedSizeIndexToKey = this.reducedSizeIndexToKey.bind(this)
    this.sizeKeyToIndex = this.sizeKeyToIndex.bind(this)
    this.reducedSizeKeyToIndex = this.reducedSizeKeyToIndex.bind(this)
    this.handleSubmitNewDesign = this.handleSubmitNewDesign.bind(this)
    // Fetch necessary data
    if (!this.props.research ||
        !this.props.research[this.props.playerRace]) {
      this.props.fetchMissleLauncherSizes()
      this.props.fetchMissleLauncherReloadRates()
      this.props.fetchMissleLauncherReducedSizes()
    } else {
      if (!this.props.research[this.props.playerRace].rMissleLauncherSize) this.props.fetchMissleLauncherSizes()
      if (!this.props.research[this.props.playerRace].rMissleLauncherReloadRate) this.props.fetchMissleLauncherReloadRates()
      if (!this.props.research[this.props.playerRace].rMissleLauncherReducedSize) this.props.fetchMissleLauncherReducedSizes()
    }
    // Load initial design specs
    this.checkMissleLauncherDesign()
  }
  dataLoaded() {
    if (Object.keys(this.props.research).length < 1 ||
        !('rMissleLauncherSize' in this.props.research[this.props.playerRace]) ||
        !('rMissleLauncherReloadRate' in this.props.research[this.props.playerRace]) ||
        !('rMissleLauncherReducedSize' in this.props.research[this.props.playerRace])) {
      return false
    }
    return true
  }
  checkMissleLauncherDesign() {
    if (!this.dataLoaded()) {
      return
    }
    var sizeId = this.state.sizeId ? this.state.sizeId : this.sizeIndexToKey(0)
    var reducedSizeId = this.state.reducedSizeId ? this.state.reducedSizeId : this.reducedSizeIndexToKey(0)
    if (sizeId === undefined || reducedSizeId === undefined) {
      // Not loaded yet
    } else {
      checkMissleLauncher(sizeId, reducedSizeId, function(missleLauncher) {
        if (this.state.designCheck) {
          missleLauncher.mldMissleLauncher.mlName = this.state.designCheck.mldMissleLauncher.mlName
        }
        this.setState({
          designCheck: missleLauncher
        })
      }.bind(this))
    }
  }
  onAfterChange() {
    this.checkMissleLauncherDesign()
  }
  onSizeSliderChange(value) {
    this.setState({
      sizeId: this.sizeIndexToKey(value)
    })
  }
  onReducedSizeSliderChange(value) {
    this.setState({
      reducedSizeId: this.reducedSizeIndexToKey(value)
    })
  }
  onNameChange(e) {
    var newMissleLauncherDesign = {}
    if (this.state.designCheck) {
      newMissleLauncherDesign = this.state.designCheck
    } else {
      newMissleLauncherDesign.mldMissleLauncher = {mlName: ''}
    }
    newMissleLauncherDesign.mldMissleLauncher.mlName = e.target.value
    this.setState({
      designCheck: newMissleLauncherDesign
    })
  }
  handleSubmitNewDesign() {
    var sizeId = this.state.sizeId ? this.state.sizeId : this.sizeIndexToKey(0)
    var reducedSizeId = this.state.reducedSizeId ? this.state.reducedSizeId : this.reducedSizeIndexToKey(0)
    this.props.createMissleLauncher(
      sizeId,
      reducedSizeId,
      this.state.designCheck.mldMissleLauncher.mlName
    )
    Alert.success('New Missle Launcher Created!')
    this.setState({
      sizeId: null,
      reducedSizeId: null,
      designCheck: null
    })
  }
  sizeToArray() {
    var obj = this.props.research[this.props.playerRace].rMissleLauncherSize.unlocked
    var keysSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].mlsrMissleLauncherSize.mlsSize - obj[b].mlsrMissleLauncherSize.mlsSize
    })
    return keysSorted
  }
  reducedSizeToArray() {
    var obj = this.props.research[this.props.playerRace].rMissleLauncherReducedSize.unlocked
    var keysSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].mlrsrMissleLauncherReducedSize.mlrsReloadMultiplier - obj[b].mlrsrMissleLauncherReducedSize.mlrsReloadMultiplier
    })
    return keysSorted
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
  reducedSizeKeyToIndex(key) {
    var keys = this.reducedSizeToArray()
    for (var i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return i
      }
    }
    return 0
  }
  sizeIndexToKey(index) {
    var keys = this.sizeToArray()
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
    var missleLauncherSize = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rMissleLauncherSize.unlocked).length > 0) {
      missleLauncherSize = <MissleLauncherSizeSlider value={this.sizeKeyToIndex(this.state.sizeId)} rMissleLauncherSizes={this.props.research[this.props.playerRace].rMissleLauncherSize}
        onSliderChange={this.onSizeSliderChange} onAfterChange={this.onAfterChange}
        indexToKey={this.sizeIndexToKey} />
    }
    var missleLauncherReloadRateName = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rMissleLauncherReloadRate.unlocked).length > 0) {
      var unlocked = this.props.research[this.props.playerRace].rMissleLauncherReloadRate.unlocked
      var unlockedKeys = Object.keys(unlocked)
      var aKey = unlockedKeys[unlockedKeys.length - 1]
      missleLauncherReloadRateName = this.props.research[this.props.playerRace].rMissleLauncherReloadRate.unlocked[aKey].mlrrrMissleLauncherReloadRate.mlrrName
    }
    var missleLauncherReducedSize = 'Loading...'
    if (Object.keys(this.props.research[this.props.playerRace].rMissleLauncherReducedSize.unlocked).length > 0) {
      missleLauncherReducedSize = <MissleLauncherReducedSizeSlider value={this.reducedSizeKeyToIndex(this.state.reducedSizeId)} rMissleLauncherReducedSizes={this.props.research[this.props.playerRace].rMissleLauncherReducedSize}
        onSliderChange={this.onReducedSizeSliderChange} onAfterChange={this.onAfterChange}
        indexToKey={this.reducedSizeIndexToKey} />
    }
    var specifications = '...'
    var submitButton = ''
    if (this.state.designCheck && this.state.designCheck.mldResearchCost) {
      specifications = <MissleLauncherDesignCheck designCheck={this.state.designCheck} />
      submitButton = <Button bsStyle="success" onClick={this.handleSubmitNewDesign}>Submit</Button>
    }
    var missleLauncherName = ''
    if (this.state.designCheck) {
      missleLauncherName = this.state.designCheck.mldMissleLauncher.mlName
    }
    return (
      <div className="new-missle-launcher-design">
        <Grid fluid={true}>
          <h3>New Missle Launcher Design</h3>
          <Row>
            <Col sm={6}>
              <form>
                {missleLauncherSize}
                <FormGroup controlId="formMissleLauncherReloadRate">
                  <ControlLabel>Reload Rate</ControlLabel>
                  <FormControl.Static>{missleLauncherReloadRateName}</FormControl.Static>
                </FormGroup>
                {missleLauncherReducedSize}
                <FormGroup controlId="formMissleLauncherName">
                  <ControlLabel>Missle Launcher Design Name</ControlLabel>
                  <FormControl
                    type="text" placeholder={'Missle Launcher Design Name'} value={missleLauncherName} onChange={this.onNameChange}>
                  </FormControl>
                </FormGroup>
                {submitButton}
              </form>
            </Col>
            <Col sm={6}>
              <h4>Missle Launcher Design Specifications</h4>
              {specifications}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

NewMissleLauncher.propTypes = {
  fetchMissleLauncherSizes : PropTypes.func.isRequired,
  fetchMissleLauncherReducedSizes : PropTypes.func.isRequired,
  fetchMissleLauncherReloadRates: PropTypes.func.isRequired,
  createMissleLauncher: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect (mapStateToProps, {
  fetchMissleLauncherSizes,
  fetchMissleLauncherReducedSizes,
  fetchMissleLauncherReloadRates,
  createMissleLauncher})(NewMissleLauncher)