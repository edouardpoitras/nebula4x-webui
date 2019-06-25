import { FETCH_ENGINE_DESIGN_TECHNOLOGIES, RESEARCH_ENGINE_DESIGN_TECHNOLOGIES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchEngineTechnologies(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/engine-technology')
      .then(res => res.json())
      .then(technologies => dispatch({
        type: FETCH_ENGINE_DESIGN_TECHNOLOGIES,
        payload: technologies
      }))
      .then(callback)
  }
}

export function researchEngineTechnologies(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/engine-technology', {
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
          type: RESEARCH_ENGINE_DESIGN_TECHNOLOGIES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}