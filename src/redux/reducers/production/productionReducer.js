import { FETCH_PRODUCTION, UPDATE_PRODUCTION } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_PRODUCTION:
    return action.payload
  case UPDATE_PRODUCTION:
    return action.payload
  default:
    return state
  }
}