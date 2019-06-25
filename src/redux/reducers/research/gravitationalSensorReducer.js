import { FETCH_GRAVITATIONAL_SENSORS, RESEARCH_GRAVITATIONAL_SENSORS } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_GRAVITATIONAL_SENSORS:
  case RESEARCH_GRAVITATIONAL_SENSORS:
    var newState = Object.assign({}, state)
    var raceId = action.payload.srRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rGravitationalSensor = action.payload.srSensor
    return newState
  default:
    return state
  }
}