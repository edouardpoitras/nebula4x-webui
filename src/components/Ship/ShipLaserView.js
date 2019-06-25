import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBar } from 'react-bootstrap'

class ShipLaserView extends React.Component {
  render() {
    if (this.props.ship.sShipLasers) {
      var rechargeStatus = this.props.ship.sShipLasers.slRechargeStatus
      var rechargeRate = this.props.ship.sShipLasers.slRechargeRate
      var secondsLeft = (1 - rechargeStatus) / rechargeRate
      var rechargePercent = Math.round(rechargeStatus * 100)
      var variant = 'info'
      var label = ''
      if (rechargeStatus < 1) {
        label = secondsLeft.toLocaleString() + ' Seconds to Ready (' + rechargePercent + '%)'
        return <ProgressBar striped variant={variant} now={rechargePercent} label={label} />
      } else {
        variant = 'success'
        label = 'Ready to Fire'
        return <ProgressBar color={variant} variant={variant} now={rechargePercent} label={label} />
      }
    } else {
      return <span>No Lasers<br /></span>
    }
  }
}

ShipLaserView.propTypes = {
  ship: PropTypes.object.isRequired
}

export default ShipLaserView