import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class FuelRefiningToggle extends React.Component {
  render() {
    var current = this.props.body.bRefiningFuel
    var status = 'Start Refining'
    var variant = 'btn-success'
    if (current) {
      status = 'Stop Refining'
      variant = 'btn-danger'
    }
    return (
      <Button
        className={variant}
        onClick={this.props.onClick}
      >{status}</Button>
    )
  }
}

FuelRefiningToggle.propTypes = {
  body: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default FuelRefiningToggle