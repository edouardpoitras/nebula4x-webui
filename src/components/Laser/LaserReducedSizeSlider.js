import React from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class LaserReducedSizeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.tipFormatter = this.tipFormatter.bind(this)
  }
  tipFormatter() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rLaserReducedSizes.unlocked[index].lrsrLaserReducedSize
    var sizeReduction = selection.lrsReducedSize
    var rechargeMultiplier = selection.lrsRechargeMultiplier
    return 'Size Reduction: ' + (100 - sizeReduction * 100) + '% (Recharge Multiplier: ' + rechargeMultiplier + ')'
  }
  render() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rLaserReducedSizes.unlocked[index].lrsrLaserReducedSize
    var sizeReduction = selection.lrsReducedSize
    var rechargeMultiplier = selection.lrsRechargeMultiplier
    var name = 'Size Reduction: ' + (100 - sizeReduction * 100) + '% (Recharge Multiplier: ' + rechargeMultiplier + ')'
    return (
      <FormGroup controlId='formLaserReducedSize'>
        <ControlLabel>Laser Reduced Size</ControlLabel>
        <span> - {name}</span>
        <SliderWithTooltip value={this.props.value}
          onChange={this.props.onSliderChange} onAfterChange={this.props.onAfterChange}
          min={0} max={Object.keys(this.props.rLaserReducedSizes.unlocked).length - 1}
          tipFormatter={this.tipFormatter}
          dotStyle={{ borderColor: 'gray' }}
          activeDotStyle={{ borderColor: 'gray' }}
          dots
        />
      </FormGroup>
    )
  }
}

LaserReducedSizeSlider.propTypes = {
  rLaserReducedSizes: PropTypes.object.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  indexToKey: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default LaserReducedSizeSlider