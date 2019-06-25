import { ADD_STARMAP, REMOVE_STARMAP, UPDATE_STARMAP } from '../../actions/types'

export default function(state = {}, action) {
  var newStarmaps = {}
  switch(action.type) {
  case ADD_STARMAP:
  case UPDATE_STARMAP:
    newStarmaps = Object.assign({}, state)
    newStarmaps[action.key] = {
      zoom: action.zoom,
      coordX: action.coordX,
      coordY: action.coordY
    }
    return newStarmaps
  case REMOVE_STARMAP:
    newStarmaps = Object.assign({}, state.starmaps)
    delete newStarmaps[action.key]
    return newStarmaps
  default:
    return state
  }
}