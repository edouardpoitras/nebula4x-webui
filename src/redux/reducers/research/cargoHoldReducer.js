import { FETCH_CARGO_HOLDS, RESEARCH_CARGO_HOLDS } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_CARGO_HOLDS:
  case RESEARCH_CARGO_HOLDS:
    var newState = Object.assign({}, state)
    var raceId = action.payload.chdrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rCargoHold = action.payload.chdrCargoHold
    return newState
  default:
    return state
  }
}