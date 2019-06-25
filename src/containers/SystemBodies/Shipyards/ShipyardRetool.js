import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { Row, Col, Button } from 'react-bootstrap'
import ShipDesignSelect from '../../../components/Ship/ShipDesignSelect'
import { shipyardRetool, checkShipyardRetool } from '../../../redux/actions/systems/body/shipyardActions'
import { fetchSystem } from '../../../redux/actions/systems/systemActions'
import { fetchShipDesigns } from '../../../redux/actions/design/shipDesignActions'

class ShipyardRetool extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      retool: null,
      optionSelected: null
    }
    this.props.fetchShipDesigns()
    this.onDesignChange = this.onDesignChange.bind(this)
    this.onRetool = this.onRetool.bind(this)
  }
  onDesignChange(optionSelected) {
    // Should put this function in props?
    checkShipyardRetool(
      this.props.systemId,
      this.props.bodyId,
      this.props.shipyard.syId,
      optionSelected.value,
      function(retool) {
        this.setState({
          retool: retool,
          optionSelected: optionSelected
        })
      }.bind(this)
    )
  }
  onRetool() {
    // Should put this function in props?
    shipyardRetool(
      this.props.systemId,
      this.props.bodyId,
      this.props.shipyard.syId,
      this.state.optionSelected.value,
      function() {
        // TODO: Add proper reducers and actions for only fetching shipyards
        this.props.fetchSystem(this.props.systemId)
        Alert.success('Retooling Shipyard')
        this.props.onBack()
      }.bind(this)
    )
  }
  render() {
    if (Object.keys(this.props.research).length < 1 ||
        !this.props.research[this.props.playerRace] ||
        !this.props.research[this.props.playerRace].rShipDesigns) {
      return null
    }
    var shipyard = this.props.shipyard
    var shipClass = 'CommercialClass'
    if (shipyard.syType === 'NavyShipyard') {
      shipClass = '' // Navy shipyard can build both commercial and military ships
    }
    var shipDesignSelect =
      <ShipDesignSelect
        shipDesigns={this.props.research[this.props.playerRace].rShipDesigns.unlocked}
        shipType={shipClass}
        maxCapacity={this.props.shipyard.syCapacity}
        onChange={this.onDesignChange}
      />
    var designClass = shipyard.syType === 'NavyShipyard' ? 'military' : 'commercial'
    var selection =
      <div className='retool-design-selection'>
        <label><strong>Select a new {designClass} ship design for this shipyard:</strong></label>
        {shipDesignSelect}
      </div>
    var retoolStats = ''
    if (this.state.retool) {
      var secondsRequired = Math.round(1 / this.state.retool.srProgressRate)
      var costs = []
      Object.keys(this.state.retool.srRetoolRate).map(function(rrKey) {
        var value = this.state.retool.srRetoolRate[rrKey]
        var elemTotalCost = value * secondsRequired
        costs.push(<div key={rrKey}>{elemTotalCost.toLocaleString() + 'x ' + rrKey}</div>)
      }.bind(this))
      var date = new Date(null)
      date.setSeconds(secondsRequired)
      var hours = date.getUTCHours()
      var minutes = date.getUTCMinutes()
      var seconds = date.getUTCSeconds()
      var timeRequired = Math.floor(secondsRequired / 86400) + ' Days  ' +
        hours % 24 + ' Hours  ' + 
        minutes + ' Minutes  ' +
        seconds + ' Seconds'
      retoolStats =
        <div>
          <strong>Retool Cost:</strong><br />{costs}<br />
          <strong>Retool Time:</strong> {timeRequired}<br />
        </div>
    }
    return (
      <div className='shipyard-retool'>
        <Row>
          <Col md={12}>
            {selection}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {retoolStats}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button onClick={this.props.onBack}>Back</Button>
          </Col>
          <Col md={6}>
            <Button onClick={this.onRetool}>Retool</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

ShipyardRetool.propTypes = {
  systemId: PropTypes.number.isRequired,
  bodyId: PropTypes.number.isRequired,
  shipyard: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired,
  fetchSystem: PropTypes.func.isRequired,
  fetchShipDesigns: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchSystem, fetchShipDesigns })(ShipyardRetool)