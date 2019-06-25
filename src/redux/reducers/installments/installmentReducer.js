import { FETCH_INSTALLMENTS } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_INSTALLMENTS:
    return action.payload
  default:
    return state
  }
}