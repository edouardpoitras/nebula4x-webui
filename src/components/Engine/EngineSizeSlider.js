import React from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class EngineSizeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.tipFormatter = this.tipFormatter.bind(this)
  }
  tipFormatter() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rEngineSizes.unlocked[index].esrEngineSize
    var size = selection.esSize
    var efficiency = selection.esEfficiencyModifier
    return 'S/E: ' + size + '/' + efficiency.toFixed(2)
  }
  render() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rEngineSizes.unlocked[index].esrEngineSize
    var name = selection.esSize + ' tons (Fuel Consumption x' + selection.esEfficiencyModifier.toFixed(2) + ')'
    return (
      <FormGroup controlId="formEnginePowerEfficiency">
        <ControlLabel>Engine Size</ControlLabel>
        <span> - {name}</span>
        <SliderWithTooltip value={this.props.value}
          onChange={this.props.onSliderChange} onAfterChange={this.props.onAfterChange}
          min={0} max={Object.keys(this.props.rEngineSizes.unlocked).length - 1}
          tipFormatter={this.tipFormatter}
          dotStyle={{ borderColor: 'gray' }}
          activeDotStyle={{ borderColor: 'gray' }}
          dots
        />
      </FormGroup>
    )
  }
}

EngineSizeSlider.propTypes = {
  rEngineSizes: PropTypes.object.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  indexToKey: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default EngineSizeSlider