import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { prettyNumber } from '../../../utils/helpers'
import { toggleFuelRefineries } from '../../../redux/actions/systems/body/fuelRefineryActions'
import FuelRefiningToggle from '../../../components/Body/FuelRefiningToggle'

class BodySummary extends React.Component {
  constructor(props) {
    super(props)
    this.toggleFuelRefining = this.toggleFuelRefining.bind(this)
  }
  toggleFuelRefining() {
    this.props.toggleFuelRefineries(this.props.systemId, this.props.bodyId)
  }
  render() {
    var mass = prettyNumber(this.props.body.bMass)
    var radius = prettyNumber(this.props.body.bRadius)
    var orbitalDistance = prettyNumber(this.props.body.bOrbitalDistance.rangeMin) + ' - ' + 
                          prettyNumber(this.props.body.bOrbitalDistance.rangeMax)
    var unavailableMinerals = 0
    var availableMinerals = 0
    Object.keys(this.props.body.bMinerals).map(function(minKey) {
      unavailableMinerals += this.props.body.bMinerals[minKey].mCount
      availableMinerals += this.props.body.bMinerals[minKey].mStockpile
      return null
    }.bind(this))
    var unavailableMineralsText = 'No Survey'
    var race = this.props.body.bRace
    if (this.props.body.bSurveys && this.props.body.bSurveys[race] && this.props.body.bSurveys[race].bsSurveyed) {
      unavailableMineralsText = prettyNumber(unavailableMinerals) + ' kg'
    } else if (this.props.body.bSurvey && this.props.body.bSurvey.bsProgress) {
      unavailableMineralsText = 'Surveying - ' + Math.round(this.props.body.bSurvey.bsProgress * 100) + '%'
    }
    var mineralsText = unavailableMineralsText + ' (' + prettyNumber(availableMinerals) + ' kg)'
    var fuelReserves = prettyNumber(this.props.body.bFuelReserves)
    var installments = Object.keys(this.props.body.bInstallments).map(function(instKey) {
      var instStack = this.props.body.bInstallments[instKey]
      if (instStack.isCount > 0) {
        var instCount = prettyNumber(instStack.isCount)
        var inst = instStack.isInstallment
        var instName = inst.iName
        var extraName = ''
        if (instName === 'Research Lab') {
          instName = 'Idle Research Lab'
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' RP / year)'
        } else if (instName === 'Basic Fuel Refinery') {
          instName = 'Basic Fuel Refinerie'
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating * 1000) + ' L / year)'
        } else if (instName === 'Improved Fuel Refinery') {
          instName = 'Improved Fuel Refinerie'
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating * 1000) + ' L / year)'
        } else if (instName === 'Advanced Fuel Refinery') {
          instName = 'Advanced Fuel Refinerie'
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating * 1000) + ' L / year)'
        } else if (instName === 'Basic Mine') {
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' tons / mineral / year)'
        } else if (instName === 'Improved Mine') {
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' tons / mineral / year)'
        } else if (instName === 'Advanced Mine') {
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' tons / mineral / year)'
        } else if (instName === 'Basic Construction Factory') {
          instName = 'Basic Construction Factorie'
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' BP / year)'
        } else if (instName === 'Improved Construction Factory') {
          instName = 'Improved Construction Factorie'
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' BP / year)'
        } else if (instName === 'Advanced Construction Factory') {
          instName = 'Advanced Construction Factorie'
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' BP / year)'
        } else if (instName.includes('Mass Driver')) {
          extraName = ' (' + prettyNumber(instStack.isCount * inst.iRating) + ' tons / year)'
        }
        return <div key={instKey}><span>{instName}s: {instCount}{extraName}</span><br /></div>
      }
    }.bind(this))
    installments = installments.length > 0 ? installments : 'None'
    return (
      <Row>
        <Col md={6}>
          <span><strong>Name:</strong> {this.props.body.bName}</span><br />
          <span><strong>Type:</strong> {this.props.body.bType}</span><br />
          <span><strong>Mass:</strong> {mass} kg</span><br />
          <span><strong>Radius:</strong> {radius} km</span><br />
          <span><strong>Orbital Distance:</strong> {orbitalDistance} km</span><br />
          <span><strong>Shipyards:</strong> {Object.keys(this.props.body.bShipyards).length}</span><br />
          <span><strong>Minerals:</strong> {mineralsText}</span><br />
          <span><strong>Fuel Reserves:</strong> {fuelReserves} L <FuelRefiningToggle body={this.props.body} onClick={this.toggleFuelRefining} /></span>
        </Col>
        <Col md={6}>
          <span><strong>Installments:</strong></span><br />
          {installments}
        </Col>
      </Row>
    )
  }
}

BodySummary.propTypes = {
  body: PropTypes.object.isRequired,
  bodyId: PropTypes.number.isRequired,
  systemId: PropTypes.number.isRequired,
  toggleFuelRefineries: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  body: state.systems[ownProps.systemId].ssBodies[ownProps.bodyId]
})

export default connect(mapStateToProps, { toggleFuelRefineries })(BodySummary)