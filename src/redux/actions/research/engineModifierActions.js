import { FETCH_ENGINE_DESIGN_MODIFIERS, RESEARCH_ENGINE_DESIGN_MODIFIERS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchEngineModifiers(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/engine-modifier')
      .then(res => res.json())
      .then(modifiers => dispatch({
        type: FETCH_ENGINE_DESIGN_MODIFIERS,
        payload: modifiers
      }))
      .then(callback)
  }
}

export function researchEngineModifiers(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/engine-modifier', {
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
          type: RESEARCH_ENGINE_DESIGN_MODIFIERS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}