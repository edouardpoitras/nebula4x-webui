import React from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'
import { prettyNumber } from '../../utils/helpers'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class MissleLauncherSizeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.tipFormatter = this.tipFormatter.bind(this)
  }
  tipFormatter() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rMissleLauncherSizes.unlocked[index].mlsrMissleLauncherSize
    var size = selection.mlsSize * 10
    var missleSize = selection.mlsSize
    return 'Launcher Size: ' + size + ' tons (Missle Strength: ' + missleSize + ')'
  }
  render() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rMissleLauncherSizes.unlocked[index].mlsrMissleLauncherSize
    var name = prettyNumber(selection.mlsSize * 10) + ' tons (Missle Strength: ' + selection.mlsSize + ')'
    return (
      <FormGroup controlId='formMissleLauncherSize'>
        <ControlLabel>Missle Launcher Size</ControlLabel>
        <span> - {name}</span>
        <SliderWithTooltip value={this.props.value}
          onChange={this.props.onSliderChange} onAfterChange={this.props.onAfterChange}
          min={0} max={Object.keys(this.props.rMissleLauncherSizes.unlocked).length - 1}
          tipFormatter={this.tipFormatter}
          dotStyle={{ borderColor: 'gray' }}
          activeDotStyle={{ borderColor: 'gray' }}
          dots
        />
      </FormGroup>
    )
  }
}

MissleLauncherSizeSlider.propTypes = {
  rMissleLauncherSizes: PropTypes.object.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  indexToKey: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default MissleLauncherSizeSlider