import { ADD_GRID_ITEM, REMOVE_GRID_ITEM, SAVE_GRID_LAYOUT } from '../../actions/types'
import uuidv4 from 'uuid/v4'

export default function(state = {}, action) {
  var newContent = {}
  var newLayouts = {}
  switch(action.type) {
  case ADD_GRID_ITEM:
    var currentContent = state.content
    var currentLayouts = state.layouts
    var newKey = uuidv4()
    var newLayout = {
      i: newKey,
      w: 2,
      h: 5,
      x: 0,
      y: 0,
      minW: 1,
      minH: 1
    }
    var contentObj = {}
    contentObj[newKey] = {
      title: action.title,
      componentType: action.componentType,
      props: Object.assign({}, action.props, {gridItemId: newKey})
    }
    var newLgLayout = currentLayouts.lg ? currentLayouts.lg.concat(newLayout) : [newLayout]
    var newSmLayout = currentLayouts.sm ? currentLayouts.sm.concat(newLayout) : [newLayout]
    newContent = Object.assign({}, currentContent, contentObj)
    newLayouts = Object.assign({}, {lg: newLgLayout, sm: newSmLayout})
    return {content: newContent, layouts: newLayouts}
  case REMOVE_GRID_ITEM:
    newContent = Object.assign({}, state.content)
    newLayouts = Object.assign({}, state.layouts)
    delete newContent[action.key]
    Object.keys(newLayouts).map(function(layout) {
      delete newLayouts[layout][action.key]
      return null
    })
    return {content: newContent, layouts: newLayouts}
  case SAVE_GRID_LAYOUT:
    return action.newState
  default:
    return state
  }
}