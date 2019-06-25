import { FETCH_ENGINE_DESIGN_SIZES, RESEARCH_ENGINE_DESIGN_SIZES } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  switch(action.type) {
  case FETCH_ENGINE_DESIGN_SIZES:
  case RESEARCH_ENGINE_DESIGN_SIZES:
    newState = Object.assign({}, state)
    raceId = action.payload.esrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rEngineSize = action.payload.esrSize
    return newState
  default:
    return state
  }
}