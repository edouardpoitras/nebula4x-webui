import { UPDATE_MASS_DRIVER } from '../../types'
import Nebula4xGlobals from '../../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function updateMassDriver(systemId, bodyId, destinationBody) {
  return function(dispatch) {
    fetch(endpoint + '/api/mass-driver', {
      method: 'POST',
      body: JSON.stringify({
        massDriverSystemId: parseInt(systemId, 10),
        massDriverBodyId: parseInt(bodyId, 10),
        massDriverDestinationId: parseInt(destinationBody, 10)
      })
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: UPDATE_MASS_DRIVER,
        payload: result
      }))
  }
}