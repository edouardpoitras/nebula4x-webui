import React from 'react'
import PropTypes from 'prop-types'
import { Table, } from 'react-bootstrap'

class BodyMinerals extends React.Component {
  constructor(props) {
    super(props)
    this.bodyHasMassDriver = this.bodyHasMassDriver.bind(this)
  }
  bodyHasMassDriver() {
    var hasMassDriver = false
    Object.keys(this.props.body.bInstallments).map(function(inst) {
      if (this.props.body.bInstallments[inst].isInstallment &&
          this.props.body.bInstallments[inst].isInstallment.iName.includes('Mass Driver')) {
        hasMassDriver = true
        return null
      }
      return null
    }.bind(this))
    return hasMassDriver
  }
  render() {
    var massDriverSelect = ''
    if (this.bodyHasMassDriver()) {
      massDriverSelect = (
        <div>
          <strong>Mass Driver Destination: </strong> {this.props.bodySelect}
        </div>
      )
    }
    var race = this.props.body.bRace
    var mineralTable = 'No geological survey performed here yet. You can give the order to one of your ships equipped with a Geological Sensor'
    if (this.props.body.bSurveys && this.props.body.bSurveys[race] && this.props.body.bSurveys[race].bsSurveyed) {
      var rows = Object.keys(this.props.body.bMinerals).map(function(element) {
        var mineral = this.props.body.bMinerals[element]
        var mineralCount = Math.round(mineral.mCount).toLocaleString()
        var mineralStockpile = Math.round(mineral.mStockpile).toLocaleString()
        return (
          <tr key={element}>
            <td>
              {mineral.mElement}
            </td>
            <td>
              {mineralCount}
            </td>
            <td>
              {mineral.mAccessibility.toFixed(2)}
            </td>
            <td>
              {mineralStockpile}
            </td>
          </tr>
        )
      }.bind(this))
      mineralTable = (
        <Table>
          <thead>
            <tr>
              <th>Element</th>
              <th>Amount</th>
              <th>Accessibility</th>
              <th>Stockpile</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      )
    }
    return (
      <div>
        {massDriverSelect}
        {mineralTable}
      </div>
    )
  }
}

BodyMinerals.propTypes = {
  body: PropTypes.object.isRequired,
  bodySelect: PropTypes.object.isRequired
}

export default BodyMinerals