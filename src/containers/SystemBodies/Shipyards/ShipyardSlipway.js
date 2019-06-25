import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { Row, Col, Button } from 'react-bootstrap'
import { shipyardSlipway, checkShipyardSlipway } from '../../../redux/actions/systems/body/shipyardActions'
import { fetchSystem } from '../../../redux/actions/systems/systemActions'

class ShipyardSlipway extends React.Component {
  constructor(props) {
    super(props)
    this.onSlipway = this.onSlipway.bind(this)
    this.state = {
      slipway: null
    }
  }
  componentDidMount() {
    // Should put this function in props?
    checkShipyardSlipway(
      this.props.systemId,
      this.props.bodyId,
      this.props.shipyard.syId,
      function(slipway) {
        this.setState({
          slipway: slipway
        })
      }.bind(this)
    )
  }
  onSlipway() {
    // Should put this function in props?
    shipyardSlipway(
      this.props.systemId,
      this.props.bodyId,
      this.props.shipyard.syId,
      function() {
        // TODO: Add proper reducers and actions for only fetching shipyards
        this.props.fetchSystem(this.props.systemId)
        Alert.success('Adding Slipway to Shipyard')
        this.props.onBack()
      }.bind(this)
    )
  }
  render() {
    var slipwayStats = ''
    if (this.state.slipway) {
      var totalSeconds = Math.round(1 / this.state.slipway.sasProgressRate)
      var costs = []
      Object.keys(this.state.slipway.sasCostRate).map(function(crKey) {
        var elemTotalCost = this.state.slipway.sasCostRate[crKey] * totalSeconds
        costs.push(<div key={crKey}>{elemTotalCost.toLocaleString() + 'x ' + crKey}</div>)
      }.bind(this))
      var date = new Date(null)
      date.setSeconds(totalSeconds)
      var hours = date.getUTCHours()
      var minutes = date.getUTCMinutes()
      var seconds = date.getUTCSeconds()
      var timeRequired = Math.floor(totalSeconds / 86400) + ' Days  ' +
        hours % 24 + ' Hours  ' + 
        minutes + ' Minutes  ' +
        seconds + ' Seconds'
      slipwayStats =
        <div>
          <strong>Add Slipway Cost:</strong><br />{costs}<br />
          <strong>Add Slipway Time:</strong> {timeRequired}<br />
        </div>
    }
    return (
      <div className='shipyard-slipway'>
        <Row>
          <Col md={12}>
            {slipwayStats}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button onClick={this.props.onBack}>Back</Button>
          </Col>
          <Col md={6}>
            <Button onClick={this.onSlipway}>Add Slipway</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

ShipyardSlipway.propTypes = {
  systemId: PropTypes.number.isRequired,
  bodyId: PropTypes.number.isRequired,
  shipyard: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchSystem: PropTypes.func.isRequired,
}

export default connect(null, { fetchSystem })(ShipyardSlipway)