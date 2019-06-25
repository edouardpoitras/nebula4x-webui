import { ADD_GRID_ITEM, REMOVE_GRID_ITEM, SAVE_GRID_LAYOUT } from '../types'
import Alert from 'react-s-alert'

export function addGridItem(title, componentType, props) {
  return function(dispatch) {
    Alert.success('New grid item added')
    return dispatch({
      type: ADD_GRID_ITEM,
      title: title,
      componentType: componentType,
      props: props
    })
  }
}

export function removeGridItem(key) {
  return function(dispatch) {
    return dispatch({
      type: REMOVE_GRID_ITEM,
      key: key
    })
  }
}

export function saveGridLayout(content, layouts) {
  return function(dispatch) {
    var value = {
      content: Object.assign({}, content),
      layouts: Object.assign({}, layouts)
    }
    if (global.localStorage) {
      global.localStorage.setItem('nebula4x', JSON.stringify({
        grid: value
      }))
    }
    return dispatch({
      type: SAVE_GRID_LAYOUT,
      newState: value
    })
  }
}