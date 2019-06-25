import { FETCH_MISSLE_LAUNCHER_DESIGN_SIZES, RESEARCH_MISSLE_LAUNCHER_DESIGN_SIZES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchMissleLauncherSizes(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/missle-launcher-size')
      .then(res => res.json())
      .then(sizes => dispatch({
        type: FETCH_MISSLE_LAUNCHER_DESIGN_SIZES,
        payload: sizes
      }))
      .then(callback)
  }
}

export function researchMissleLauncherSizes(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/missle-launcher-size', {
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
          type: RESEARCH_MISSLE_LAUNCHER_DESIGN_SIZES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}