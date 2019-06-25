import { FETCH_CARGO_HANDLING_SYSTEMS, RESEARCH_CARGO_HANDLING_SYSTEMS } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_CARGO_HANDLING_SYSTEMS:
  case RESEARCH_CARGO_HANDLING_SYSTEMS:
    var newState = Object.assign({}, state)
    var raceId = action.payload.chrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rCargoHandling = action.payload.chrCargoHandling
    return newState
  default:
    return state
  }
}