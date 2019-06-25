import { FETCH_RESEARCH, FETCH_RACE_RESEARCH, UNLOCK_ALL_RESEARCH } from '../types'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchResearch(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research')
      .then(res => res.json())
      .then(research => dispatch({
        type: FETCH_RESEARCH,
        payload: research
      }))
      .then(callback)
  }
}

export function fetchRaceResearch() {
  return function(dispatch) {
    fetch(endpoint + '/api/research-race')
      .then(res => res.json())
      .then(research => dispatch({
        type: FETCH_RACE_RESEARCH,
        payload: research
      }))
  }
}

export function unlockAllResearch(raceId, callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research-unlock-all', {
      method: 'POST',
      body: JSON.stringify({
        uarRaceId: parseInt(raceId, 10)
      })
    })
      .then(res => res.json())
      .then(research => dispatch({
        type: UNLOCK_ALL_RESEARCH,
        payload: research
      }))
      .then(callback)
  }
}