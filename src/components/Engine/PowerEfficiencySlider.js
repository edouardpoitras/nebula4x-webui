import React from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class PowerEfficiencySlider extends React.Component {
  constructor(props) {
    super(props)
    this.tipFormatter = this.tipFormatter.bind(this)
  }
  tipFormatter() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rEngineModifiers.unlocked[index].pemrPowerEfficiencyModifier
    var power = selection.pemPowerModifier
    var efficiency = selection.pemEfficiencyModifier
    return 'P/E: ' + power.toFixed(2) + '/' + efficiency.toFixed(2)
  }
  render() {
    var index = this.props.indexToKey(this.props.value)
    var selection = this.props.rEngineModifiers.unlocked[index].pemrPowerEfficiencyModifier
    return (
      <FormGroup controlId="formEnginePowerEfficiency">
        <ControlLabel>Power / Efficiency Modifier</ControlLabel>
        <span> - {selection.pemName}</span>
        <SliderWithTooltip value={this.props.value}
          onChange={this.props.onSliderChange} onAfterChange={this.props.onAfterChange}
          min={0} max={Object.keys(this.props.rEngineModifiers.unlocked).length - 1}
          tipFormatter={this.tipFormatter}
          dotStyle={{ borderColor: 'gray' }}
          activeDotStyle={{ borderColor: 'gray' }}
          dots
        />
      </FormGroup>
    )
  }
}

PowerEfficiencySlider.propTypes = {
  rEngineModifiers: PropTypes.object.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  indexToKey: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default PowerEfficiencySlider