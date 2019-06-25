import { FETCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES, RESEARCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES:
  case RESEARCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.mlrsrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rMissleLauncherReducedSize = action.payload.mlrsrReducedSize
    return newState
  default:
    return state
  }
}