import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchMissleLaunchers , deleteMissleLauncher } from '../../redux/actions/design/missleLauncherDesignActions'
import MissleLauncherView from '../../components/MissleLauncher/MissleLauncherView'

class MissleLaunchers extends React.Component {
  constructor(props) {
    super(props)
    if (!this.props.research ||
        !this.props.research[this.props.playerRace] ||
        !this.props.research[this.props.playerRace].rMissleLauncherDesigns) {
      this.props.fetchMissleLaunchers()
    }
  }

  deleteMissleLauncher(missleLauncherKey) {
    this.props.deleteMissleLauncher(parseInt(missleLauncherKey, 10))
    Alert.error('Missle Launcher Design Deleted')
  }

  render() {
    if (Object.keys(this.props.research).length < 1 ||
        !this.props.research[this.props.playerRace] ||
        !this.props.research[this.props.playerRace].rMissleLauncherDesigns) {
      return null
    }
    var missleLaunchers = this.props.research[this.props.playerRace].rMissleLauncherDesigns
    const unlockedMissleLauncherItems = Object.keys(missleLaunchers.unlocked).map(missleLauncherKey => (
      <div key={missleLauncherKey}>
        <Row>
          <Col md={12}>
            <MissleLauncherView missleLauncherDesign={missleLaunchers.unlocked[missleLauncherKey]} handleDeleteClick={this.deleteMissleLauncher.bind(this, missleLauncherKey)} />
          </Col>
        </Row>
      </div>
    ))
    var pendingMissleLauncherItem = ''
    if (missleLaunchers.pending) {
      pendingMissleLauncherItem = (
        <div key={missleLaunchers.pending.mldId}>
          <Row>
            <Col md={12}>
              <MissleLauncherView missleLauncherDesign={missleLaunchers.pending} handleDeleteClick={this.deleteMissleLauncher.bind(this, missleLaunchers.pending.mldId)} />
            </Col>
          </Row>
        </div>
      )
    }
    const lockedMissleLauncherItems = Object.keys(missleLaunchers.locked).map(missleLauncherKey => (
      <div key={missleLauncherKey}>
        <Row>
          <Col md={12}>
            <MissleLauncherView missleLauncherDesign={missleLaunchers.locked[missleLauncherKey]} handleDeleteClick={this.deleteMissleLauncher.bind(this, missleLauncherKey)} />
          </Col>
        </Row>
      </div>
    ))
    return (
      <div className="missle-launchers">
        <Grid fluid={true}>
          <Row>
            <Col md={10}>
              <h1>Missle Launchers</h1>
            </Col>
            <Col md={2}>
              <Link to="/design/missle-launchers/new">
                <Button bsStyle="primary">New Missle Launcher</Button>
              </Link>
            </Col>
          </Row>
          <hr />
          <h4>Unlocked</h4>
          {unlockedMissleLauncherItems}
          <hr />
          <h4>Pending</h4>
          {pendingMissleLauncherItem}
          <hr />
          <h4>Locked</h4>
          {lockedMissleLauncherItems}
        </Grid>
      </div>
    )
  }
}

MissleLaunchers.propTypes = {
  fetchMissleLaunchers: PropTypes.func.isRequired,
  deleteMissleLauncher: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchMissleLaunchers, deleteMissleLauncher })(MissleLaunchers)