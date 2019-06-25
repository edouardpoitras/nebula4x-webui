import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchLasers , deleteLaser } from '../../redux/actions/design/laserDesignActions'
import LaserView from '../../components/Laser/LaserView'

class Lasers extends React.Component {
  constructor(props) {
    super(props)
    if (!this.props.research ||
        !this.props.research[this.props.playerRace] ||
        !this.props.research[this.props.playerRace].rLaserDesigns) {
      this.props.fetchLasers()
    }
  }

  deleteLaser(laserKey) {
    this.props.deleteLaser(parseInt(laserKey, 10))
    Alert.error('Laser Design Deleted')
  }

  render() {
    if (Object.keys(this.props.research).length < 1 ||
        !this.props.research[this.props.playerRace] ||
        !this.props.research[this.props.playerRace].rLaserDesigns) {
      return null
    }
    var lasers = this.props.research[this.props.playerRace].rLaserDesigns
    const unlockedLaserItems = Object.keys(lasers.unlocked).map(laserKey => (
      <div key={laserKey}>
        <Row>
          <Col md={12}>
            <LaserView laserDesign={lasers.unlocked[laserKey]} handleDeleteClick={this.deleteLaser.bind(this, laserKey)} />
          </Col>
        </Row>
      </div>
    ))
    var pendingLaserItem = ''
    if (lasers.pending) {
      pendingLaserItem = (
        <div key={lasers.pending.ldId}>
          <Row>
            <Col md={12}>
              <LaserView laserDesign={lasers.pending} handleDeleteClick={this.deleteLaser.bind(this, lasers.pending.ldId)} />
            </Col>
          </Row>
        </div>
      )
    }
    const lockedLaserItems = Object.keys(lasers.locked).map(laserKey => (
      <div key={laserKey}>
        <Row>
          <Col md={12}>
            <LaserView laserDesign={lasers.locked[laserKey]} handleDeleteClick={this.deleteLaser.bind(this, laserKey)} />
          </Col>
        </Row>
      </div>
    ))
    return (
      <div className="lasers">
        <Grid fluid={true}>
          <Row>
            <Col md={10}>
              <h1>Lasers</h1>
            </Col>
            <Col md={2}>
              <Link to="/design/lasers/new">
                <Button bsStyle="primary">New Laser</Button>
              </Link>
            </Col>
          </Row>
          <hr />
          <h4>Unlocked</h4>
          {unlockedLaserItems}
          <hr />
          <h4>Pending</h4>
          {pendingLaserItem}
          <hr />
          <h4>Locked</h4>
          {lockedLaserItems}
        </Grid>
      </div>
    )
  }
}

Lasers.propTypes = {
  fetchLasers: PropTypes.func.isRequired,
  deleteLaser: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchLasers, deleteLaser })(Lasers)