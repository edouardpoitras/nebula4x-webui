import { FETCH_RACES, FETCH_RACE, SWITCH_RACE } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_RACES:
    return action.payload
  case FETCH_RACE:
    var newState = JSON.parse(JSON.stringify(state))
    newState[action.payload.rId] = action.payload
    return newState
  case SWITCH_RACE:
    return action.payload
  default:
    return state
  }
}