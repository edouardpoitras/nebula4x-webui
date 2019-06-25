import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { FormGroup, FormControl, ControlLabel, Row, Col, Button } from 'react-bootstrap'
import { shipyardCapacity, checkShipyardCapacity } from '../../../redux/actions/systems/body/shipyardActions'
import { fetchSystem } from '../../../redux/actions/systems/systemActions'

class ShipyardCapacity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      capacityAmount: 0,
      capacity: null
    }
    this.onCapacityChange = this.onCapacityChange.bind(this)
    this.onCapacity = this.onCapacity.bind(this)
  }
  onCapacityChange(event) {
    var capacityAmount = event.target.value
    this.setState({
      capacityAmount: capacityAmount
    })
    if (capacityAmount) {
      checkShipyardCapacity(
        this.props.systemId,
        this.props.bodyId,
        this.props.shipyard.syId,
        capacityAmount,
        function(capacity) {
          this.setState({
            capacity: capacity
          })
        }.bind(this)
      )
    }
  }
  onCapacity() {
    // Should put this function in props?
    shipyardCapacity(
      this.props.systemId,
      this.props.bodyId,
      this.props.shipyard.syId,
      this.state.capacityAmount,
      function() {
        // TODO: Add proper reducers and actions for only fetching shipyards
        this.props.fetchSystem(this.props.systemId)
        Alert.success('Adding Capacity to Shipyard')
        this.props.onBack()
      }.bind(this)
    )
  }
  render() {
    var capacityStats = ''
    if (this.state.capacity) {
      var startingCapacity = this.state.capacity.sacStartingCapacity
      var targetCapacity = this.state.capacity.sacTargetCapacity
      var costRate = this.state.capacity.sacCostRate
      var capacityPerSecond = this.state.capacity.sacCapacityRate
      var totalSeconds = (targetCapacity - startingCapacity) / capacityPerSecond
      var totalCost = []
      Object.keys(costRate).map(function(crKey) {
        var elemTotalCost = costRate[crKey] * totalSeconds
        totalCost.push(<div key={crKey}>{elemTotalCost.toLocaleString() + 'x ' + crKey}</div>)
        return null
      })
      var date = new Date(null)
      date.setSeconds(totalSeconds)
      var days = Math.floor(totalSeconds / 86400)
      var hours = date.getUTCHours()
      var minutes = date.getUTCMinutes()
      var seconds = date.getUTCSeconds()
      var timeRequired =
        days + ' Days  ' +
        hours % 24 + ' Hours  ' + 
        minutes + ' Minutes  ' +
        seconds + ' Seconds'
      capacityStats =
        <div>
          <strong>Total Cost:</strong><br />{totalCost}<br />
          <strong>Total Time:</strong> {timeRequired}<br />
        </div>
    }
    return (
      <div className='shipyard-capacity'>
        <Row>
          <Col md={12}>
            <FormGroup controlId="formCapacityAmount">
              <ControlLabel>Capacity Amount</ControlLabel>
              <FormControl
                type="text" value={this.state.capacityAmount} onChange={this.onCapacityChange}>
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {capacityStats}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button onClick={this.props.onBack}>Back</Button>
          </Col>
          <Col md={6}>
            <Button onClick={this.onCapacity}>Add Capacity</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

ShipyardCapacity.propTypes = {
  systemId: PropTypes.number.isRequired,
  bodyId: PropTypes.number.isRequired,
  shipyard: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchSystem: PropTypes.func.isRequired,
}

export default connect(null, { fetchSystem })(ShipyardCapacity)