import { FETCH_LASER_DESIGN_RECHARGE_RATES, RESEARCH_LASER_DESIGN_RECHARGE_RATES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchLaserRechargeRates(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/laser-recharge-rate')
      .then(res => res.json())
      .then(rates => dispatch({
        type: FETCH_LASER_DESIGN_RECHARGE_RATES,
        payload: rates
      }))
      .then(callback)
  }
}

export function researchLaserRechargeRates(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/laser-recharge-rate', {
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
          type: RESEARCH_LASER_DESIGN_RECHARGE_RATES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}