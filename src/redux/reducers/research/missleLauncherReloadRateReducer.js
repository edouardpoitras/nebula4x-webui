import { FETCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES, RESEARCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES:
  case RESEARCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.mlrrrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rMissleLauncherReloadRate = action.payload.mlrrrReloadRate
    return newState
  default:
    return state
  }
}