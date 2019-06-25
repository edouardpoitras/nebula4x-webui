import { FETCH_MISSLE_LAUNCHER_DESIGN_SIZES, RESEARCH_MISSLE_LAUNCHER_DESIGN_SIZES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_MISSLE_LAUNCHER_DESIGN_SIZES:
  case RESEARCH_MISSLE_LAUNCHER_DESIGN_SIZES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.mlsrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rMissleLauncherSize = action.payload.mlsrSize
    return newState
  default:
    return state
  }
}