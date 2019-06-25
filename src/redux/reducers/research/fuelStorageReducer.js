import { FETCH_FUEL_STORAGES, RESEARCH_FUEL_STORAGES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_FUEL_STORAGES:
  case RESEARCH_FUEL_STORAGES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.fsrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rFuelStorage = action.payload.fsrFuelStorage
    return newState
  default:
    return state
  }
}