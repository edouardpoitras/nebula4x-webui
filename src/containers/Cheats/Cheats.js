import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { getRaceFromRaces } from '../../utils/helpers'
import { switchRace } from '../../redux/actions/race/raceActions'
import { unlockAllResearch } from '../../redux/actions/research/researchActions'

class Cheats extends React.Component {
  constructor(props) {
    super(props)
    this.onRaceChange = this.onRaceChange.bind(this)
    this.unlockResearchClick = this.unlockResearchClick.bind(this)
    // Races are being fetched by the App class every page load already.
    //this.props.fetchRaces()
  }
  onRaceChange(selection) {
    var newRaceId = selection.target.value
    this.props.switchRace(newRaceId, function() {
      window.location.reload()
    })
  }
  unlockResearchClick() {
    this.props.unlockAllResearch(this.props.playerRace, function() {
      window.location.reload()
    })
  }
  render() {
    if (!this.props.races || !this.props.races[this.props.playerRace]) {
      return null
    }
    var currentRace = getRaceFromRaces(this.props.races)
    var raceOptions = Object.keys(this.props.races).map(function (raceId) {
      return <option key={raceId} value={raceId}>{this.props.races[raceId].rName}</option>
    }.bind(this))
    return (
      <div className="cheats">
        <Grid fluid={true}>
          <h3>Cheats</h3>
          <Row>
            <Col sm={12}>
              <form>
                <FormGroup controlId="formSwitchRace">
                  <ControlLabel>Switch Race</ControlLabel>
                  <FormControl value={currentRace} onChange={this.onRaceChange} componentClass="select">
                    {raceOptions}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formUnlockResearch">
                  <ControlLabel>Unlock All Research</ControlLabel><br />
                  <Button onClick={this.unlockResearchClick}>Unlock</Button>
                </FormGroup>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Cheats.propTypes = {
  switchRace: PropTypes.func.isRequired,
  unlockAllResearch: PropTypes.func.isRequired,
  races: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  races: state.races,
})

export default connect (mapStateToProps, { switchRace, unlockAllResearch })(Cheats)