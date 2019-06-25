import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class ShipDesignSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.designsToOptions = this.designsToOptions.bind(this)
  }
  handleChange(selectedOption) {
    this.setState({selectedOption})
    this.props.onChange(selectedOption)
  }
  designsToOptions(shipDesigns) {
    var options = []
    Object.keys(shipDesigns).map(function(designKey) {
      var design = shipDesigns[designKey]
      if (!this.props.shipType || (this.props.shipType && this.props.shipType === design.sdClass)) {
        if (!this.props.maxCapacity || (this.props.maxCapacity && this.props.maxCapacity >= design.sdSize)) {
          options.push({
            value: design.sdId,
            label: design.sdName
          })
        }
      }
      return null
    }.bind(this))
    return options
  }
  render() {
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.designsToOptions(this.props.shipDesigns)}
      />
    )
  }
}

ShipDesignSelect.propTypes = {
  shipDesigns: PropTypes.object.isRequired,
  maxCapacity: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  shipType: PropTypes.string
}

export default ShipDesignSelect