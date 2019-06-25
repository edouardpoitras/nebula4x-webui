import { FETCH_FUEL_STORAGES, RESEARCH_FUEL_STORAGES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchFuelStorages(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/fuel-storage')
      .then(res => res.json())
      .then(storages => dispatch({
        type: FETCH_FUEL_STORAGES,
        payload: storages
      }))
      .then(callback)
  }
}

export function researchFuelStorages(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/fuel-storage', {
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
          type: RESEARCH_FUEL_STORAGES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}