import { FETCH_LASER_DESIGN_RECHARGE_RATES, RESEARCH_LASER_DESIGN_RECHARGE_RATES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_LASER_DESIGN_RECHARGE_RATES:
  case RESEARCH_LASER_DESIGN_RECHARGE_RATES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.lrrrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rLaserRechargeRate = action.payload.lrrrRechargeRate
    return newState
  default:
    return state
  }
}