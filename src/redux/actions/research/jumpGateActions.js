import { FETCH_JUMP_GATE_MODULES, RESEARCH_JUMP_GATES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchJumpGates(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/jump-gates')
      .then(res => res.json())
      .then(jumpGates => dispatch({
        type: FETCH_JUMP_GATE_MODULES,
        payload: jumpGates
      }))
      .then(callback)
  }
}

export function researchJumpGates(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/jump-gates', {
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
          type: RESEARCH_JUMP_GATES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}