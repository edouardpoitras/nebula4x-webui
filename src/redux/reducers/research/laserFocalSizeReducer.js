import { FETCH_LASER_DESIGN_FOCAL_SIZES, RESEARCH_LASER_DESIGN_FOCAL_SIZES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_LASER_DESIGN_FOCAL_SIZES:
  case RESEARCH_LASER_DESIGN_FOCAL_SIZES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.lfsrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rLaserFocalSize = action.payload.lfsrFocalSize
    return newState
  default:
    return state
  }
}