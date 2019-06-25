import { FETCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES, RESEARCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchMissleLauncherReloadRates(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/missle-launcher-reload-rate')
      .then(res => res.json())
      .then(rates => dispatch({
        type: FETCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES,
        payload: rates
      }))
      .then(callback)
  }
}

export function researchMissleLauncherReloadRates(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/missle-launcher-reload-rate', {
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
          type: RESEARCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}