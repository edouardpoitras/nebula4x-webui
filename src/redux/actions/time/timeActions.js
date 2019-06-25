import { TICK_TIME, GET_TIME } from '../types'
import { fetchDiscoveredSystems } from '../systems/systemActions'
import { fetchRaceResearch } from '../research/researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function tickTime(timeString) {
  return function(dispatch) {
    fetch(endpoint + '/api/tick/' + timeString, {
      method: 'POST'
    })
      .then(res => res.json())
      .then((time) => {
        // Updated the time in the UI
        dispatch({type: TICK_TIME, time: time})
        // We want to update the research for the user's race every time tick.
        dispatch(fetchRaceResearch())
        // We want to update all discovered systems on every tick.
        dispatch(fetchDiscoveredSystems())
      })
  }
}

export function getTime() {
  return function(dispatch) {
    fetch(endpoint + '/api/get-time')
      .then(res => res.json())
      .then(time => dispatch({
        type: GET_TIME,
        time: time
      }))
  }
}