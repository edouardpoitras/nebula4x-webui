import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSystemsBodies } from '../../redux/actions/systems/systemActions'
import { Grid, Row, Col } from 'react-bootstrap'
import BodySelect from '../../components/Body/BodySelect'

class System extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    if (Object.keys(this.props.systems).length < 1) {
      this.props.fetchSystemsBodies()
    } else {
      // TODO: Find better way of determining if this fetch has been done already.
      // See if we have ssBodies object on a non-discovered system.
      // Should be good enough to determine whether or not we've executed this fetch before.
      for (let systemId in this.props.systems) {
        if (!this.props.systems[systemId].ssDiscovered[this.props.playerRace]) {
          if (!this.props.systems[systemId].ssBodies) {
            this.props.fetchSystemsBodies()
            break
          }
        }
      }
    }
  }
  onChange(selectedOption) {
    this.props.history.push('/view/system-bodies/' + selectedOption.systemId + '/' + selectedOption.value)
  }
  render() {
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
        </Grid>
      </div>
    )
  }
}

System.propTypes = {
  fetchSystemsBodies: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired,
  systems: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  systems: state.systems
})

export default withRouter(connect(mapStateToProps, { fetchSystemsBodies })(System))