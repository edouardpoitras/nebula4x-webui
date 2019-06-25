import React from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class LaserFocalSizeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.tipFormatter = this.tipFormatter.bind(this)
  }
  tipFormatter() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rLaserFocalSizes.unlocked[index].lfsrLaserFocalSize
    var name = selection.lfsName
    return name
  }
  render() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rLaserFocalSizes.unlocked[index].lfsrLaserFocalSize
    var name = selection.lfsName
    return (
      <FormGroup controlId='formLaserFocalSize'>
        <ControlLabel>Laser Focal Size</ControlLabel>
        <span> - {name}</span>
        <SliderWithTooltip value={this.props.value}
          onChange={this.props.onSliderChange} onAfterChange={this.props.onAfterChange}
          min={0} max={Object.keys(this.props.rLaserFocalSizes.unlocked).length - 1}
          tipFormatter={this.tipFormatter}
          dotStyle={{ borderColor: 'gray' }}
          activeDotStyle={{ borderColor: 'gray' }}
          dots
        />
      </FormGroup>
    )
  }
}

LaserFocalSizeSlider.propTypes = {
  rLaserFocalSizes: PropTypes.object.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  indexToKey: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default LaserFocalSizeSlider