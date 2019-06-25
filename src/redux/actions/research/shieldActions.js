import { FETCH_SHIELD, RESEARCH_SHIELD } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchShields(callback) {
  return function (dispatch) {
    fetch(endpoint + '/api/research/shields')
      .then(res => res.json())
      .then(shields => dispatch({
        type: FETCH_SHIELD,
        payload: shields
      }))
      .then(callback)
  }
}

export function researchShields(systemId, bodyId, numLabs) {
  return function (dispatch) {
    fetch(endpoint + '/api/research/shields', {
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
          type: RESEARCH_SHIELD,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}