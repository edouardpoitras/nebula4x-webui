import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSystemBody, fetchSystemBodies } from '../../redux/actions/systems/systemActions'
import { updateMassDriver } from '../../redux/actions/systems/body/massDriverActions'
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap'
import BodySelect from '../../components/Body/BodySelect'
import BodySummary from './Summary/BodySummary'
import BodyMinerals from '../../components/Body/BodyMinerals'
import BodyShipyards from './Shipyards/BodyShipyards'
import BodyProduction from './Production/BodyProduction'
import BodyResearch from './Research/BodyResearch'

class Body extends React.Component {
  constructor(props) {
    super(props)
    this.dataLoaded = this.dataLoaded.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onMassDriverChange = this.onMassDriverChange.bind(this)
    if (!this.dataLoaded()) {
      // TODO: Figure out a way to only load body and appropriate metadata for all other system bodies (like names for mass driver destination purposes)
      //this.props.fetchSystemBody(this.props.match.params.systemId, this.props.match.params.bodyId)
      this.props.fetchSystemBodies(this.props.match.params.systemId)
    }
  }
  dataLoaded() {
    var systemId = parseInt(this.props.match.params.systemId, 10)
    var system = this.props.systems[systemId]
    var bodyId = parseInt(this.props.match.params.bodyId, 10)
    // TODO: Maybe find a better way of determining whether data was previously loaded than checking body mass.
    if (!system || !system.ssBodies || !system.ssBodies[bodyId].bMass) {
      return false
    }
    return true
  }
  onChange(selectedOption) {
    this.props.history.push('/view/system-bodies/' + selectedOption.systemId + '/' + selectedOption.value)
  }
  onMassDriverChange(selectedOption) {
    var systemId = parseInt(this.props.match.params.systemId, 10)
    var bodyId = parseInt(this.props.match.params.bodyId, 10)
    this.props.updateMassDriver(systemId, bodyId, selectedOption.type, selectedOption.value)
  }
  render() {
    if (!this.dataLoaded()) {
      return null
    }
    var systemId = parseInt(this.props.match.params.systemId, 10)
    var bodyId = parseInt(this.props.match.params.bodyId, 10)
    var system = this.props.systems[systemId]
    var body = null
    var defaultMassDriverBody = null
    var systemBodyView = ''
    if (system) {
      if (bodyId in system.ssBodies) {
        body = system.ssBodies[bodyId]
      } else {
        console.log('Could not find body in system')
        return null
      }
      var massDriverBodyId = body.bMassDriverBody
      if (massDriverBodyId in system.ssBodies) {
        defaultMassDriverBody = {value: massDriverBodyId, label: system.ssBodies[massDriverBodyId].bName}
      }
    }
    var massDriverBodySelect = (
      <BodySelect
        default={defaultMassDriverBody}
        systems={this.props.systems}
        systemId={systemId}
        onChange={this.onMassDriverChange}
      />
    )
    if (body && system.ssDiscovered && body.bRace === this.props.playerRace) {
      systemBodyView = (
        <Row>
          <Col md={12}>
            <Tabs defaultActiveKey={1} id='system-body-tabs'>
              <Tab eventKey={1} title='Summary'>
                <BodySummary bodyId={bodyId} systemId={systemId} />
              </Tab>
              <Tab eventKey={2} title='Minerals'>
                <BodyMinerals body={body} bodySelect={massDriverBodySelect} />
              </Tab>
              <Tab eventKey={3} title='Production'>
                <BodyProduction
                  bodyId={bodyId}
                  playerRace={this.props.playerRace}
                />
              </Tab>
              <Tab eventKey={4} title='Research'>
                <BodyResearch systemId={systemId} bodyId={bodyId} playerRace={this.props.playerRace} />
              </Tab>
              <Tab eventKey={5} title='Shipyards'>
                <BodyShipyards
                  bodyId={bodyId}
                  systemId={systemId}
                  playerRace={this.props.playerRace}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      )
    }
    return (
      <div className='system-bodies'>
        <Grid fluid={true}>
          <Row>
            <Col md={12}>
              <BodySelect
                systems={this.props.systems}
                onlyDiscoveredBy={this.props.playerRace}
                onlyRaces={[this.props.playerRace]}
                onChange={this.onChange}
              />
            </Col>
          </Row>
          {systemBodyView}
        </Grid>
      </div>
    )
  }
}

Body.propTypes = {
  fetchSystemBody: PropTypes.func.isRequired,
  fetchSystemBodies: PropTypes.func.isRequired,
  updateMassDriver: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired,
  match: PropTypes.object,
  history: PropTypes.object,
  systems: PropTypes.object
}

const mapStateToProps = state => ({
  systems: state.systems
})

export default withRouter(connect(mapStateToProps, { fetchSystemBody, fetchSystemBodies, updateMassDriver })(Body))