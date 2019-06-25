import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class ElementSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(selectedOption) {
    this.setState({selectedOption})
    this.props.onChange(selectedOption)
  }
  render() {
    var options = [
      { value: 'Duranium', label: 'Duranium' },
      { value: 'Sorium', label: 'Sorium' },
      { value: 'Neutronium', label: 'Neutronium' },
      { value: 'Corbomite', label: 'Corbomite' },
      { value: 'Tritanium', label: 'Tritanium' },
      { value: 'Boronide', label: 'Boronide' },
      { value: 'Uridium', label: 'Uridium' },
      { value: 'Corundium', label: 'Corundium' },
      { value: 'Mercassium', label: 'Mercassium' },
      { value: 'Vendarite', label: 'Vendarite' },
      { value: 'Gallicite', label: 'Gallicite' }
    ]
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    )
  }
}

ElementSelect.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default ElementSelect