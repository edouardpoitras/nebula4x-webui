import { FETCH_GEOLOGICAL_SENSORS, RESEARCH_GEOLOGICAL_SENSORS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchGeologicalSensors(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/geological-sensor')
      .then(res => res.json())
      .then(sensors => dispatch({
        type: FETCH_GEOLOGICAL_SENSORS,
        payload: sensors
      }))
      .then(callback)
  }
}

export function researchGeologicalSensors(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/geological-sensor', {
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
          type: RESEARCH_GEOLOGICAL_SENSORS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}