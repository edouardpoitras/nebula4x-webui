import { FETCH_PRODUCTION, UPDATE_PRODUCTION } from '../types'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchProduction(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/production')
      .then(res => res.json())
      .then(mines => dispatch({
        type: FETCH_PRODUCTION,
        payload: mines
      }))
      .then(callback)
  }
}

export function updateProduction(bodyId, updateProductionPercentages) {
  return function(dispatch) {
    fetch(endpoint + '/api/production/update', {
      method: 'POST',
      body: JSON.stringify({
        updateProductionBodyId: bodyId,
        updateProductionPercentages: updateProductionPercentages
      })
    })
      .then(res => res.json())
      .then(production => dispatch({
        type: UPDATE_PRODUCTION,
        payload: production
      }))
  }
}