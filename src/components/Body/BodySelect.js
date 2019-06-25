import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class BodySelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: this.props.default
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
    if (this.props.systemId) {
      var system = systems[this.props.systemId]
      Object.keys(system.ssBodies).map(function(bodyKey) {
        var body = system.ssBodies[bodyKey]
        if (this.props.onlyRaces && !this.props.onlyRaces.includes(body.bRace)) {
          return null
        }
        options.push({
          value: body.bId,
          label: body.bName,
          type: body.bType,
        })
        return null
      }.bind(this))
    } else {
      Object.keys(systems).map(function(systemKey) {
        var system = systems[systemKey]
        if (!system.ssBodies || (this.props.onlyDiscoveredBy && !system.ssDiscovered[this.props.onlyDiscoveredBy])) {
          return null
        }
        Object.keys(system.ssBodies).map(function(bodyKey) {
          var body = system.ssBodies[bodyKey]
          if (this.props.onlyRaces && !this.props.onlyRaces.includes(body.bRace)) {
            return null
          }
          options.push({
            value: body.bId,
            label: system.ssStar.starName + ' - ' + body.bName,
            systemId: Number(systemKey),
            type: body.bType,
          })
          return null
        }.bind(this))
        return null
      }.bind(this))
    }
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

BodySelect.propTypes = {
  default: PropTypes.object,
  systems: PropTypes.object.isRequired,
  systemId: PropTypes.number,
  onlyDiscoveredBy: PropTypes.number,
  onlyRaces: PropTypes.array,
  onChange: PropTypes.func.isRequired
}

export default BodySelect