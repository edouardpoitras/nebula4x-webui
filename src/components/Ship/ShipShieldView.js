import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBar } from 'react-bootstrap'

class ShipShieldView extends React.Component {
  render() {
    if (this.props.ship.sShields) {
      var shieldEnabled = this.props.ship.sShields.ssEnabled
      var shieldCurrentCapacity = this.props.ship.sShields.ssCurrentCapacity
      var shieldMaxCapacity = this.props.ship.sShields.ssMaxCapacity
      var shieldFuelConsumption = this.props.ship.sShields.ssFuelConsumptionRate
      var shieldStatus = shieldCurrentCapacity / shieldMaxCapacity * 100
      var shieldVariant = 'success'
      if (shieldStatus < 25) shieldVariant = 'danger'
      else if (shieldStatus < 50) shieldVariant = 'warning'
      else if (shieldStatus < 75) shieldVariant = 'info'
      var shieldLabel = shieldCurrentCapacity + ' / ' + shieldMaxCapacity + ' (' + shieldStatus + '%)'
      if (shieldEnabled) {
        var fuelConsumption = (shieldFuelConsumption * 3600).toLocaleString() + ' L / Hour'
        shieldLabel = shieldLabel + ' - ' + fuelConsumption
        return <ProgressBar striped variant={shieldVariant} now={shieldStatus} label={shieldLabel} />
      } else {
        return <ProgressBar variant={shieldVariant} now={shieldStatus} label={shieldLabel} />
      }
    } else {
      return <span>No Shields<br /></span>
    }
  }
}

ShipShieldView.propTypes = {
  ship: PropTypes.object.isRequired
}

export default ShipShieldView