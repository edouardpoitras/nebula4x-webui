import { FETCH_LASER_DESIGN_WAVELENGTHS, RESEARCH_LASER_DESIGN_WAVELENGTHS } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_LASER_DESIGN_WAVELENGTHS:
  case RESEARCH_LASER_DESIGN_WAVELENGTHS:
    var newState = Object.assign({}, state)
    var raceId = action.payload.lwrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rLaserWavelength = action.payload.lwrWavelength
    return newState
  default:
    return state
  }
}