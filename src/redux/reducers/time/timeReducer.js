import { TICK_TIME, GET_TIME } from '../../actions/types'

export default function(state = '', action) {
  switch(action.type) {
  case TICK_TIME:
  case GET_TIME:
    var timePieces = action.time.split('T')
    return timePieces[0] + ' ' + timePieces[1].split('Z')[0]
  default:
    return state
  }
}