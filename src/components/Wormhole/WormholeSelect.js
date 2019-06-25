import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class WormholeSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.systemToOptions = this.systemToOptions.bind(this)
  }
  handleChange(selectedOption) {
    this.setState({selectedOption})
    this.props.onChange(selectedOption)
  }
  getSystemWormholes(systemId) {
    var options = []
    if (this.props.systems[systemId]) {
      var system = this.props.systems[systemId]
      Object.keys(system.ssWormholes).map(function(wormholeKey) {
        var wormhole = system.ssWormholes[wormholeKey]
        var text = 'Gravitational Anomaly ' + ('' + wormhole.wId).substring(0, 3)
        if (wormhole.wSurveyed && wormhole.wDestinationStarId && wormhole.wJumpGate) {
          // TODO: Should make the wormhole object hold it's name instead of passing around all systems.
          text = 'Jump Gate to ' + this.props.systems[wormhole.wDestinationStarId].ssStar.starName
        } else if (wormhole.wSurveyed && wormhole.wDestinationStarId) {
          text = 'Wormhole to ' + this.props.systems[wormhole.wDestinationStarId].ssStar.starName
        } else if (wormhole.wSurveyed) {
          text = 'Beneign Gravitational Anomaly' + ('' + wormhole.wId).substring(0, 3)
        }
        if (wormhole.wSurveyed && this.props.wormholeStates.includes('surveyed')) {
          options.push({
            value: wormhole.wId,
            label: text
          })
        } else if (wormhole.wJumpGate && this.props.wormholeStates.includes('jump gate')) {
          options.push({
            value: wormhole.wId,
            label: text
          })
        } else if (!wormhole.wSurveyed && !wormhole.wJumpGate && this.props.wormholeStates.includes('new')) {
          options.push({
            value: wormhole.wId,
            label: text
          })
        }
        return null
      }.bind(this))
    }
    return options
  }
  systemToOptions() {
    var options = []
    if (this.props.systemId) {
      options = this.getSystemWormholes(this.props.systemId)
    } else {
      Object.keys(this.props.systems).map(function(systemId) {
        options.push(this.getSystemWormholes(systemId))
      }.bind(this))
    }
    return options
  }
  render() {
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.systemToOptions()}
      />
    )
  }
}

WormholeSelect.propTypes = {
  systems: PropTypes.object.isRequired,
  systemId: PropTypes.number,
  wormholeStates: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default WormholeSelect