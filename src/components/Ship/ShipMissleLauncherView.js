import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBar } from 'react-bootstrap'

class ShipMissleLauncherView extends React.Component {
  render() {
    if (this.props.ship.sShipMissleLaunchers) {
      var reloadStatus = this.props.ship.sShipMissleLaunchers.smlReloadStatus
      var reloadRate = this.props.ship.sShipMissleLaunchers.smlReloadRate
      var secondsLeft = (1 - reloadStatus) / reloadRate
      var reloadPercent = Math.round(reloadStatus * 100)
      var variant = 'info'
      var label = ''
      if (reloadStatus < 1) {
        label = secondsLeft.toLocaleString() + ' Seconds to Ready (' + reloadPercent + '%)'
        return <ProgressBar striped variant={variant} now={reloadPercent} label={label} />
      } else {
        variant = 'success'
        label = 'Ready to Fire'
        return <ProgressBar variant={variant} now={reloadPercent} label={label} />
      }
    } else {
      return <span>No Missle Launchers<br /></span>
    }
  }
}

ShipMissleLauncherView.propTypes = {
  ship: PropTypes.object.isRequired
}

export default ShipMissleLauncherView