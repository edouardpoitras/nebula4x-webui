import { FETCH_ENGINE_DESIGN_TECHNOLOGIES, RESEARCH_ENGINE_DESIGN_TECHNOLOGIES } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  switch(action.type) {
  case FETCH_ENGINE_DESIGN_TECHNOLOGIES:
  case RESEARCH_ENGINE_DESIGN_TECHNOLOGIES:
    newState = Object.assign({}, state)
    raceId = action.payload.etrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rEngineTechnology = action.payload.etrTechnology
    return newState
  default:
    return state
  }
}