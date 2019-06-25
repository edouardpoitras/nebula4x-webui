import { FETCH_RACES, FETCH_RACE, SWITCH_RACE } from '../types'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchRaces() {
  return function(dispatch) {
    fetch(endpoint + '/api/races')
      .then(res => res.json())
      .then(races => dispatch({
        type: FETCH_RACES,
        payload: races
      }))
  }
}

export function fetchRace(raceId) {
  return function(dispatch) {
    fetch(endpoint + '/api/races/' + raceId)
      .then(res => res.json())
      .then(race => dispatch({
        type: FETCH_RACE,
        payload: race
      }))
  }
}

export function switchRace(raceId, callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/races', {
      method: 'POST',
      body: JSON.stringify({
        srrRaceId: parseInt(raceId, 10)
      })
    })
      .then(res => res.json())
      .then(races => dispatch({
        type: SWITCH_RACE,
        payload: races
      }))
      .then(callback)
  }
}