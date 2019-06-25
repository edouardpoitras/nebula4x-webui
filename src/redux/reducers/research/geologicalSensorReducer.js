import { FETCH_GEOLOGICAL_SENSORS, RESEARCH_GEOLOGICAL_SENSORS } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_GEOLOGICAL_SENSORS:
  case RESEARCH_GEOLOGICAL_SENSORS:
    var newState = Object.assign({}, state)
    var raceId = action.payload.srRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rGeologicalSensor = action.payload.srSensor
    return newState
  default:
    return state
  }
}