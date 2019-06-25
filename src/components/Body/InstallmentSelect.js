import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class InstallmentSelect extends React.Component {
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
    var options = []
    Object.keys(this.props.installments).map(function(instKey) {
      var inst = this.props.installments[instKey]
      var name = inst.iName
      options.push({ value: instKey, label: name })
      return null
    }.bind(this))
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    )
  }
}

InstallmentSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  installments: PropTypes.object.isRequired
}

export default InstallmentSelect