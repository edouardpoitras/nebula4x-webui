import React from 'react'
import { FormGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

class ProductionSlider extends React.Component {
  constructor(props) {
    super(props)
    this.tipFormatter = this.tipFormatter.bind(this)
  }
  tipFormatter(value) {
    return value + '%'
  }
  render() {
    return (
      <FormGroup controlId="formProductionCapacity">
        <SliderWithTooltip value={this.props.value}
          onChange={this.props.onSliderChange}
          onAfterChange={this.props.onAfterChange}
          min={0} max={100}
          tipFormatter={this.tipFormatter}
          dotStyle={{ borderColor: 'gray' }}
          activeDotStyle={{ borderColor: 'gray' }}
        />
      </FormGroup>
    )
  }
}

ProductionSlider.propTypes = {
  onSliderChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default ProductionSlider