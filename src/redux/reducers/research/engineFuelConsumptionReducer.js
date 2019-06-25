import { FETCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS, RESEARCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  switch(action.type) {
  case FETCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS:
  case RESEARCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS:
    newState = Object.assign({}, state)
    raceId = action.payload.efcrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rEngineFuelConsumption = action.payload.efcrFuelConsumption
    return newState
  default:
    return state
  }
}