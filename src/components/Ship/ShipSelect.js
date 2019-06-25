import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class ShipSelect extends React.Component {
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
    if (this.props.systemId) {
      var system = systems[this.props.systemId]
      if (!('ssShips' in system)) {
        return options
      }
      Object.keys(system.ssShips).map(function(shipKey) {
        var ship = system.ssShips[shipKey]
        if (!this.props.playerRace || ship.sRace === this.props.playerRace) {
          options.push({
            value: ship.sId,
            label: ship.sName
          })
        }
        return null
      }.bind(this))
    } else {
      Object.keys(systems).map(function(systemKey) {
        var system = systems[systemKey]
        if (!('ssShips' in system)) {
          return options
        }
        Object.keys(system.ssShips).map(function(shipKey) {
          var ship = system.ssShips[shipKey]
          if (!this.props.playerRace || ship.sRace === this.props.playerRace) {
            options.push({
              value: ship.sId,
              label: system.ssStar.starName + ' - ' + ship.sName,
              systemId: Number(systemKey)
            })
          }
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

ShipSelect.propTypes = {
  systems: PropTypes.object.isRequired,
  systemId: PropTypes.number,
  playerRace: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default ShipSelect