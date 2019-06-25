import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class ShipyardActions extends React.Component {
  render() {
    var shipyard = this.props.shipyard
    var content = []
    if (shipyard.syShipDesign) {
      content.push(<Button key='build-ship' onClick={this.props.onBuildClick}>Build Ship</Button>)
    } else {
      content.push(<Button key='build-ship' disabled>Build Ship</Button>)
    }
    if (shipyard.syCurrentTask) {
      content.push(<Button key='retool-ship' disabled>Retool for Ship</Button>)
      content.push(<Button key='add-capacity' disabled>Add Capacity</Button>)
      content.push(<Button key='add-slipway' disabled>Add Slipway</Button>)
    } else {
      content.push(<Button key='retool-ship' onClick={this.props.onRetoolClick}>Retool for Ship</Button>)
      content.push(<Button key='add-capacity' onClick={this.props.onCapacityClick}>Add Capacity</Button>)
      content.push(<Button key='add-slipway' onClick={this.props.onSlipwayClick}>Add Slipway</Button>)
    }
    return <div className='shipyard-actions'>{content}</div>
  }
}

ShipyardActions.propTypes = {
  shipyard: PropTypes.object.isRequired,
  onBuildClick: PropTypes.func.isRequired,
  onRetoolClick: PropTypes.func.isRequired,
  onCapacityClick: PropTypes.func.isRequired,
  onSlipwayClick: PropTypes.func.isRequired
}

export default ShipyardActions