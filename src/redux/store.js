import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

function getFromLS(key) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('nebula4x')) || {}
    } catch (e) {
      // Placeholder
    }
  }
  return ls[key]
}

const originalGrid = getFromLS('grid') || { layouts: { lg: [], sm: [] }, content: {} }
const previousSavedState = getFromLS('state') || {
  universeTime: '',
  grid: JSON.parse(JSON.stringify(originalGrid)),
  starmaps: {},
  systems: {},
  races: {},
  production: {},
  installments: {},
  research: {}
}

const middleware = [thunk]
const store = createStore(
  rootReducer,
  JSON.parse(JSON.stringify(previousSavedState)),
  compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store