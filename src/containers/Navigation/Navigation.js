import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { tickTime, getTime } from '../../redux/actions/time/timeActions'
import { saveState, loadState } from '../../redux/actions/state/stateActions'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, ButtonGroup, Button } from 'react-bootstrap'
import StarmapMenu from '../Starmap/StarmapMenu'
import LoadGame from '../Game/LoadGame'
import Nebula4xGlobals from '../../utils/globals'
import './Navigation.css'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.props.getTime()
    this.goToGalaxy = this.goToGalaxy.bind(this)
    this.onClickHack = this.onClickHack.bind(this)
    this.saveStateOnClick = this.saveStateOnClick.bind(this)
  }
  goToGalaxy() {
    this.props.history.push('/galaxy')
  }
  /**
   * Required to hide the menu item after selection:
   * https://github.com/react-bootstrap/react-bootstrap/issues/541
   */
  onClickHack() {
    document.dispatchEvent(new MouseEvent('click'))
  }
  saveStateOnClick() {
    this.props.saveState(this.props.state)
  }
  render() {
    const exportStateUrl = this.context.apiEndpoint + '/api/export-state'
    return (
      <Navbar inverse id="nebula4x-nav">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Nebula 4x</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={this.goToGalaxy}>
              Galaxy Map
            </NavItem>
            <NavDropdown eventKey={2} title="Star Maps" id="star-map-dropdown">
              <StarmapMenu onlyDiscoveredBy={this.props.playerRace} onClick={this.onClickHack} />
            </NavDropdown>
            <NavDropdown eventKey={3} title="Design" id="design-dropdown">
              <li><Link onClick={this.onClickHack} to="/design/engines">Engines</Link></li>
              <li><Link onClick={this.onClickHack} to="/design/lasers">Lasers</Link></li>
              <li><Link onClick={this.onClickHack} to="/design/missle-launchers">Missle Launchers</Link></li>
              <li><Link onClick={this.onClickHack} to="/design/ships">Ships</Link></li>
            </NavDropdown>
            <NavDropdown eventKey={4} title="View" id="view-dropdown">
              <li><Link onClick={this.onClickHack} to="/view/ships">Ships</Link></li>
              <li><Link onClick={this.onClickHack} to="/view/system-bodies">System Bodies</Link></li>
            </NavDropdown>
            <NavDropdown eventKey={5} title="Find" id="find-dropdown">
              <MenuItem eventKey={5.1}>Minerals</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={6} title="Options" id="options-dropdown">
              <MenuItem eventKey={6.1} onClick={this.saveStateOnClick}>Save Game State</MenuItem>
              <MenuItem eventKey={6.2} onClick={this.props.loadState}>Load Game State</MenuItem>
              <li><a href={exportStateUrl}>Export Game State</a></li>
              <li><a href='#import'><LoadGame /></a></li>
            </NavDropdown>
          </Nav>
          <Nav className="time-management" pullRight>
            <NavItem className="universe-time">
              {this.props.state.universeTime}
            </NavItem>
            <NavItem className="time-actions">
              <ButtonGroup>
                <Button id="tick-1s" type="submit"
                  onClick={this.props.tickTime.bind(this, '1s')}>1s</Button>
                <Button id="tick-1m" type="submit"
                  onClick={this.props.tickTime.bind(this, '1m')}>1m</Button>
                <Button id="tick-1h" type="submit"
                  onClick={this.props.tickTime.bind(this, '1h')}>1h</Button>
                <Button id="tick-1d" type="submit"
                  onClick={this.props.tickTime.bind(this, '1d')}>1d</Button>
                <Button id="tick-5d" type="submit"
                  onClick={this.props.tickTime.bind(this, '5d')}>5d</Button>
                <Button id="tick-30d" type="submit"
                  onClick={this.props.tickTime.bind(this, '30d')}>30d</Button>
              </ButtonGroup>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Navigation.contextType = Nebula4xGlobals

Navigation.propTypes = {
  tickTime: PropTypes.func.isRequired,
  getTime: PropTypes.func.isRequired,
  history: PropTypes.object,
  state: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired,
  saveState: PropTypes.func.isRequired,
  loadState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  state: state
})

export default withRouter(connect(mapStateToProps, { tickTime, getTime, saveState, loadState })(Navigation))