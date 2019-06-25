import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchEngines, deleteEngine } from '../../redux/actions/design/engineDesignActions'
import EngineView from '../../components/Engine/EngineView'

class Engines extends React.Component {
  constructor(props) {
    super(props)
    if (!this.props.research || !this.props.research[this.props.playerRace] || !this.props.research[this.props.playerRace].rEngineDesigns) {
      this.props.fetchEngines()
    }
  }

  deleteEngine(engineKey) {
    this.props.deleteEngine(parseInt(engineKey, 10))
    Alert.error('Engine Design Deleted')
  }

  render() {
    if (Object.keys(this.props.research).length < 1 || !this.props.research[this.props.playerRace].rEngineDesigns) {
      return null
    }
    var engineDesigns = this.props.research[this.props.playerRace].rEngineDesigns
    const unlockedEngineItems = Object.keys(engineDesigns.unlocked).map(engineKey => (
      <div key={engineKey}>
        <Row>
          <Col md={12}>
            <EngineView engineDesign={engineDesigns.unlocked[engineKey]} handleDeleteClick={this.deleteEngine.bind(this, engineKey)} />
          </Col>
        </Row>
      </div>
    ))
    var pendingEngineItem = ''
    if (engineDesigns.pending) {
      pendingEngineItem = (
        <div key={engineDesigns.pending.edId}>
          <Row>
            <Col md={12}>
              <EngineView engineDesign={engineDesigns.pending} handleDeleteClick={this.deleteEngine.bind(this, engineDesigns.pending.edId)} />
            </Col>
          </Row>
        </div>
      )
    }
    const lockedEngineItems = Object.keys(engineDesigns.locked).map(engineKey => (
      <div key={engineKey}>
        <Row>
          <Col md={12}>
            <EngineView engineDesign={engineDesigns.locked[engineKey]} handleDeleteClick={this.deleteEngine.bind(this, engineKey)} />
          </Col>
        </Row>
      </div>
    ))
    return (
      <div className="engines">
        <Grid fluid={true}>
          <Row>
            <Col md={10}>
              <h1>Engines</h1>
            </Col>
            <Col md={2}>
              <Link to="/design/engines/new">
                <Button bsStyle="primary">New Engine</Button>
              </Link>
            </Col>
          </Row>
          <hr />
          <h4>Unlocked</h4>
          {unlockedEngineItems}
          <hr />
          <h4>Pending</h4>
          {pendingEngineItem}
          <hr />
          <h4>Locked</h4>
          {lockedEngineItems}
        </Grid>
      </div>
    )
  }
}

Engines.propTypes = {
  fetchEngines: PropTypes.func.isRequired,
  deleteEngine: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired,
  research: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchEngines, deleteEngine })(Engines)