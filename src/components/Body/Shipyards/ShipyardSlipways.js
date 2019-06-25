import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

class ShipyardSlipways extends React.Component {
  render() {
    var shipyard = this.props.shipyard
    var slipways = shipyard.sySlipways.map(function(slipway, index) {
      var status = slipway.sysActive ? 'Building "' + slipway.sysShipName + '"' : 'Idle'
      var progress = Math.round(slipway.sysProgress * 100) + '%'
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{status}</td>
          <td>{progress}</td>
        </tr>
      )
    })
    return (
      <Table>
        <thead>
          <tr>
            <th>Slipway #</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {slipways}
        </tbody>
      </Table>
    )
  }
}

ShipyardSlipways.propTypes = {
  shipyard: PropTypes.object.isRequired
}

export default ShipyardSlipways