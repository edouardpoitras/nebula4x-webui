import { FETCH_LASER_DESIGN_REDUCED_SIZES, RESEARCH_LASER_DESIGN_REDUCED_SIZES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_LASER_DESIGN_REDUCED_SIZES:
  case RESEARCH_LASER_DESIGN_REDUCED_SIZES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.lrsrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rLaserReducedSize = action.payload.lrsrReducedSize
    return newState
  default:
    return state
  }
}