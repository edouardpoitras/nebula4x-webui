import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class SystemSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.systemsToOptions = this.systemsToOptions.bind(this)
  }
  handleChange(selectedOption) {
    this.setState({selectedOption})
    this.props.onChange(selectedOption)
  }
  systemsToOptions(systems) {
    var options = []
    Object.keys(systems).map(function(key) {
      var system = systems[key]
      if ((this.props.onlyDiscoveredBy && system.ssDiscovered[this.props.onlyDiscoveredBy]) || !this.props.onlyDiscoveredBy) {
        options.push({
          value: key,
          label: system.ssStar.shipName
        })
      }
      return null
    })
    return options
  }
  render() {
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.systemsToOptions(this.props.systems)}
      />
    )
  }
}

SystemSelect.propTypes = {
  systems: PropTypes.object.isRequired,
  onlyDiscoveredBy: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SystemSelect