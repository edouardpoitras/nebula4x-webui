import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { FormGroup, FormControl, ControlLabel, Row, Col, Button } from 'react-bootstrap'
import { shipyardBuild, checkShipyardBuild } from '../../../redux/actions/systems/body/shipyardActions'
import { fetchSystem } from '../../../redux/actions/systems/systemActions'

class ShipyardBuild extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shipName: '',
      build: null
    }
    checkShipyardBuild(
      this.props.systemId,
      this.props.bodyId,
      this.props.shipyard.syId,
      function(build) {
        this.setState({
          build: build
        })
      }.bind(this)
    )
    this.onBuild = this.onBuild.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
  }
  onBuild() {
    shipyardBuild(
      this.props.systemId,
      this.props.bodyId,
      this.props.shipyard.syId,
      this.state.shipName,
      function() {
        this.props.fetchSystem(this.props.systemId)
        Alert.success('Building New Ship')
        this.props.onBack()
      }.bind(this)
    )
  }
  onNameChange(e) {
    this.setState({
      shipName: e.target.value
    })
  }
  render() {
    var buildStats = ''
    if (this.state.build) {
      var costs = []
      Object.keys(this.state.build.checkBuildCost).map(function(cbcKey) {
        costs.push(<div key={cbcKey}>{(this.state.build.checkBuildCost[cbcKey]).toLocaleString() + 'x ' + cbcKey}</div>)
      }.bind(this))
      var secondsRequired = Math.round(1 / this.state.build.checkBuildRate)
      var date = new Date(null)
      date.setSeconds(secondsRequired)
      var hours = date.getUTCHours()
      var minutes = date.getUTCMinutes()
      var seconds = date.getUTCSeconds()
      var timeRequired =
        Math.floor(secondsRequired / 86400) + ' Days  ' +
        hours % 24 + ' Hours  ' + 
        minutes + ' Minutes  ' +
        seconds + ' Seconds'
      buildStats =
        <div>
          <strong>Build Cost:</strong><br />{costs}<br />
          <strong>Build Time:</strong> {timeRequired}<br />
        </div>
    }
    return (
      <div className='shipyard-build'>
        <Row>
          <Col md={12}>
            {buildStats}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup controlId="formShipName">
              <ControlLabel>Ship Name</ControlLabel>
              <FormControl
                type="text" value={this.state.shipName} onChange={this.onNameChange}>
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button onClick={this.props.onBack}>Back</Button>
          </Col>
          <Col md={6}>
            <Button onClick={this.onBuild}>Build</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

ShipyardBuild.propTypes = {
  systemId: PropTypes.number.isRequired,
  bodyId: PropTypes.number.isRequired,
  shipyard: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchSystem: PropTypes.func.isRequired
}

const mapStateToProps = function() { return {} }

export default connect(mapStateToProps, { fetchSystem })(ShipyardBuild)