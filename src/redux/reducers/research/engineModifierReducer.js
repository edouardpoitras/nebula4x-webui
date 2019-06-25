import { FETCH_ENGINE_DESIGN_MODIFIERS, RESEARCH_ENGINE_DESIGN_MODIFIERS } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  switch(action.type) {
  case FETCH_ENGINE_DESIGN_MODIFIERS:
  case RESEARCH_ENGINE_DESIGN_MODIFIERS:
    newState = Object.assign({}, state)
    raceId = action.payload.emrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rEngineModifier = action.payload.emrModifier
    return newState
  default:
    return state
  }
}