import { FETCH_INSTALLMENTS, FETCH_BODY_INSTALLMENTS } from '../types'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchInstallments(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/installments')
      .then(res => res.json())
      .then(installments => dispatch({
        type: FETCH_INSTALLMENTS,
        payload: installments 
      }))
      .then(callback)
  }
}

export function fetchBodyInstallments(systemId, bodyId) {
  return function(dispatch) {
    fetch(endpoint + '/api/installments/' + systemId + '/' + bodyId)
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: FETCH_BODY_INSTALLMENTS,
          payload: result
        })
      })
  }
}