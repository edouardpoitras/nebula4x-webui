import { FETCH_ARMOR, RESEARCH_ARMOR } from '../../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
  case FETCH_ARMOR:
  case RESEARCH_ARMOR:
    var newState = Object.assign({}, state)
    var raceId = action.payload.arRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rArmor = action.payload.arArmor
    return newState
  default:
    return state
  }
}
