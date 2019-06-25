import React from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class MissleLauncherReducedSizeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.tipFormatter = this.tipFormatter.bind(this)
  }
  tipFormatter() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rMissleLauncherReducedSizes.unlocked[index].mlrsrMissleLauncherReducedSize
    var sizeReduction = selection.mlrsReducedSize
    var reloadMultiplier = selection.mlrsReloadMultiplier
    return 'Launcher Size Reduction: ' + (100 - sizeReduction * 100) + '% (Reload Multiplier: ' + reloadMultiplier + ')'
  }
  render() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rMissleLauncherReducedSizes.unlocked[index].mlrsrMissleLauncherReducedSize
    var sizeReduction = selection.mlrsReducedSize
    var reloadMultiplier = selection.mlrsReloadMultiplier
    var name = 'Launcher Size Reduction: ' + (100 - sizeReduction * 100) + '% (Reload Multiplier: ' + reloadMultiplier + ')'
    return (
      <FormGroup controlId='formMissleLauncherReducedSize'>
        <ControlLabel>Missle Launcher Reduced Size</ControlLabel>
        <span> - {name}</span>
        <SliderWithTooltip value={this.props.value}
          onChange={this.props.onSliderChange} onAfterChange={this.props.onAfterChange}
          min={0} max={Object.keys(this.props.rMissleLauncherReducedSizes.unlocked).length - 1}
          tipFormatter={this.tipFormatter}
          dotStyle={{ borderColor: 'gray' }}
          activeDotStyle={{ borderColor: 'gray' }}
          dots
        />
      </FormGroup>
    )
  }
}

MissleLauncherReducedSizeSlider.propTypes = {
  rMissleLauncherReducedSizes: PropTypes.object.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  indexToKey: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default MissleLauncherReducedSizeSlider