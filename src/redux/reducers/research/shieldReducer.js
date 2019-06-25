import { FETCH_SHIELD, RESEARCH_SHIELD } from '../../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
  case FETCH_SHIELD:
  case RESEARCH_SHIELD:
    var newState = Object.assign({}, state)
    var raceId = action.payload.shrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rShield = action.payload.shrShield
    return newState
  default:
    return state
  }
}