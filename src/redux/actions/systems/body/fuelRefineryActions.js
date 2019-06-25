import { TOGGLE_FUEL_REFINERIES } from '../../types'
import Nebula4xGlobals from '../../../../utils/globals'
import { fetchSystem } from '../../systems/systemActions'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function toggleFuelRefineries(systemId, bodyId) {
  return function(dispatch) {
    fetch(endpoint + '/api/toggle-refining', {
      method: 'POST',
      body: JSON.stringify({
        toggleRefiningSystemId: parseInt(systemId, 10),
        toggleRefiningBodyId: parseInt(bodyId, 10)
      })
    })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: TOGGLE_FUEL_REFINERIES,
          payload: result
        })
        dispatch(fetchSystem(systemId))
      })
  }
}