import { FETCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS, RESEARCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchEngineFuelConsumptions(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/engine-fuel-consumption')
      .then(res => res.json())
      .then(fuelConsumptions => dispatch({
        type: FETCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS,
        payload: fuelConsumptions
      }))
      .then(callback)
  }
}

export function researchEngineFuelConsumptions(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/engine-fuel-consumption', {
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
          type: RESEARCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}