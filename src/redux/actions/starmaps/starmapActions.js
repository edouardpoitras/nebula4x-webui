import { ADD_STARMAP, REMOVE_STARMAP, UPDATE_STARMAP } from '../types'

export function addStarmap(key, zoom = 1, coordX = 0, coordY = 0) {
  return function(dispatch) {
    return dispatch({
      type: ADD_STARMAP,
      key: key,
      zoom: zoom,
      coordX: coordX,
      coordY: coordY
    })
  }
}

export function removeStarmap(key) {
  return function(dispatch) {
    return dispatch({
      type: REMOVE_STARMAP,
      key: key
    })
  }
}

export function updateStarmap(key, zoom = 1, coordX = 0, coordY = 0) {
  return function(dispatch) {
    return dispatch({
      type: UPDATE_STARMAP,
      key: key,
      zoom: zoom,
      coordX: coordX,
      coordY: coordY
    })
  }
}