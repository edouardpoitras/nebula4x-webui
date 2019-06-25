import { FETCH_GRAVITATIONAL_SENSORS, RESEARCH_GRAVITATIONAL_SENSORS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchGravitationalSensors(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/gravitational-sensor')
      .then(res => res.json())
      .then(sensors => dispatch({
        type: FETCH_GRAVITATIONAL_SENSORS,
        payload: sensors
      }))
      .then(callback)
  }
}

export function researchGravitationalSensors(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/gravitational-sensor', {
      method: 'POST',
      body: JSON.stringify({
        rrSystemId: parseInt(systemId, 10),
        rrBodyId: parseInt(bodyId, 10),
        rrNumLabs: parseInt(numLabs, 10)
      })
    })
      .then(res => res.json())
      .then(research => {
        dispatch({
          type: RESEARCH_GRAVITATIONAL_SENSORS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}