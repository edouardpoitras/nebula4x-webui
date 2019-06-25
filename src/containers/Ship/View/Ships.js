import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchDiscoveredSystems } from '../../../redux/actions/systems/systemActions'
import { Grid, Row, Col } from 'react-bootstrap'
import ShipSelect from '../../../components/Ship/ShipSelect'

class Ships extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    // TODO: Need to only load system ships here, not all systems.
    this.props.fetchDiscoveredSystems()
  }
  onChange(selectedOption) {
    this.props.history.push('/view/ships/' + selectedOption.value)
  }
  render() {
    return (
      <div className='ships'>
        <Grid fluid={true}>
          <Row>
            <Col md={12}>
              <ShipSelect
                systems={this.props.systems}
                playerRace={this.props.playerRace}
                onChange={this.onChange}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Ships.propTypes = {
  fetchDiscoveredSystems: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired,
  systems: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  systems: state.systems
})

export default withRouter(connect(mapStateToProps, { fetchDiscoveredSystems })(Ships))