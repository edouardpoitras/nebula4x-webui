import { SAVE_STATE, LOAD_STATE } from '../types'
import Alert from 'react-s-alert'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function saveState() {
  return function(dispatch) {
    fetch(endpoint + '/api/get-state')
      .then(res => res.json())
      .then(function(state) {
        if (global.localStorage) {
          global.localStorage.setItem('nebula4x', JSON.stringify(state))
          Alert.success('Game state saved')
        }
        dispatch({ type: SAVE_STATE, payload: state })
      })
  }
}

export function loadState() {
  return function(dispatch) {
    if (global.localStorage) {
      try {
        var rawState = global.localStorage.getItem('nebula4x')
        fetch(endpoint + '/api/load-state', {
          method: 'POST',
          body: rawState
        })
          .then(res => res.json())
          .then(state => dispatch({
            type: LOAD_STATE,
            payload: state
          }))
        Alert.success('Game state loaded')
      } catch (e) {
        Alert.error('Game state could not be loaded')
      }
    } else {
      Alert.warning('No previous saved game state')
    }
  }
}