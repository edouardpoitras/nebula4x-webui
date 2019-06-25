import { FETCH_FUEL_REFINERIES, RESEARCH_FUEL_REFINERIES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_FUEL_REFINERIES:
  case RESEARCH_FUEL_REFINERIES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.irRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rFuelRefineries = action.payload.irInstallment
    return newState
  default:
    return state
  }
}