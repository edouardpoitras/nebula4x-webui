import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'

import Navigation from './Navigation/Navigation'
import Galaxy from './Galaxy/Galaxy'
import Starmap from './Starmap/Starmap'
import Engines from './Engine/Engines'
import NewEngine from './Engine/NewEngine'
import Lasers from './Laser/Lasers'
import NewLaser from './Laser/NewLaser'
import MissleLaunchers from './MissleLauncher/MissleLaunchers'
import NewMissleLauncher from './MissleLauncher/NewMissleLauncher'
import ShipDesigns from './Ship/Design/ShipDesigns'
import NewShipDesign from './Ship/Design/NewShipDesign'
import SystemBodies from './SystemBodies/SystemBodies'
import SystemBody from './SystemBodies/SystemBody'
import Ships from './Ship/View/Ships'
import Ship from './Ship/View/Ship'
import Cheats from './Cheats/Cheats'
import HomeGrid from './Grid/HomeGrid'
import { fetchRaces } from '../redux/actions/race/raceActions'
import { getRaceFromRaces } from '../utils/helpers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchRaces()
  }
  render() {
    if (Object.keys(this.props.races).length < 1) {
      return 'Loading...'
    }
    var playerRace = getRaceFromRaces(this.props.races)
    return (
      <Router>
        <div className='nebula4x'>
          <Navigation playerRace={playerRace} />
          <Route path='/' exact render={(props) => <HomeGrid {...props} playerRace={playerRace} />} />
          <Route path='/galaxy' exact render={(props) => <Galaxy {...props} playerRace={playerRace} />} />
          <Route path='/starmap/:systemId' exact render={(props) => <Starmap {...props} playerRace={playerRace} />} />
          <Route path='/design/engines' exact render={(props) => <Engines {...props} playerRace={playerRace} />} />
          <Route path='/design/engines/new' render={(props) => <NewEngine {...props} playerRace={playerRace} />} />
          <Route path='/design/lasers' exact render={(props) => <Lasers {...props} playerRace={playerRace} />} />
          <Route path='/design/lasers/new' render={(props) => <NewLaser {...props} playerRace={playerRace} />} />
          <Route path='/design/missle-launchers' exact render={(props) => <MissleLaunchers {...props} playerRace={playerRace} />} />
          <Route path='/design/missle-launchers/new' render={(props) => <NewMissleLauncher {...props} playerRace={playerRace} />} />
          <Route path='/design/ships' exact render={(props) => <ShipDesigns {...props} playerRace={playerRace} />} />
          <Route path='/design/ships/new' render={(props) => <NewShipDesign {...props} playerRace={playerRace} />} />
          <Route path='/view/system-bodies' exact render={(props) => <SystemBodies {...props} playerRace={playerRace} />} />
          <Route path='/view/system-bodies/:systemId/:bodyId' exact render={(props) => <SystemBody {...props} playerRace={playerRace} />} />
          <Route path='/view/ships' exact render={(props) => <Ships {...props} playerRace={playerRace} />} />
          <Route path='/view/ships/:shipId' exact render={(props) => <Ship {...props} playerRace={playerRace} />} />
          <Route path='/cheats' exact render={(props) => <Cheats {...props} playerRace={playerRace} />} />
          <Alert />
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  races: PropTypes.object.isRequired,
  fetchRaces: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  races: state.races
})

export default connect(mapStateToProps, { fetchRaces })(App)