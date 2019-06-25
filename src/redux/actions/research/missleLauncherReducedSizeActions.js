import { FETCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES, RESEARCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchMissleLauncherReducedSizes(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/missle-launcher-reduced-size')
      .then(res => res.json())
      .then(reducedSizes => dispatch({
        type: FETCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES,
        payload: reducedSizes
      }))
      .then(callback)
  }
}

export function researchMissleLauncherReducedSizes(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/missle-launcher-reduced-size', {
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
          type: RESEARCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}