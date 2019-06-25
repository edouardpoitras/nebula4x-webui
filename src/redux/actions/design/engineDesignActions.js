import { FETCH_ENGINE_DESIGNS, RESEARCH_ENGINE_DESIGNS, FETCH_ENGINE_DESIGN, CREATE_ENGINE_DESIGN, DELETE_ENGINE_DESIGN } from '../types'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchEngines(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/engine')
      .then(res => res.json())
      .then(engines => dispatch({
        type: FETCH_ENGINE_DESIGNS,
        payload: engines
      }))
      .then(callback)
  }
}

export function fetchEngine(engineDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/engine/' + engineDesignId)
      .then(res => res.json())
      .then(engine => dispatch({
        type: FETCH_ENGINE_DESIGN,
        payload: engine
      }))
  }
}

export function createEngine(modifierId, sizeId, name) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/engine', {
      method: 'POST',
      body: JSON.stringify({engineModifier: parseInt(modifierId, 10), engineSize: parseInt(sizeId, 10), engineName: name})
    })
      .then(res => res.json())
      .then(engine => dispatch({
        type: CREATE_ENGINE_DESIGN,
        payload: engine
      }))
  }
}

export function researchEngines(systemId, bodyId, numLabs, researchId) {
  return function(dispatch) {
    var bodyPayload = {
      rreSystemId: parseInt(systemId, 10),
      rreBodyId: parseInt(bodyId, 10),
      rreNumLabs: parseInt(numLabs, 10)
    }
    if (researchId) {
      bodyPayload.rreResearchId = parseInt(researchId, 10)
    }
    fetch(endpoint + '/api/research/engine', {
      method: 'POST',
      body: JSON.stringify(bodyPayload)
    })
      .then(res => res.json())
      .then(research => {
        dispatch({
          type: RESEARCH_ENGINE_DESIGNS,
          payload: research 
        })
      })
  }
}

export function deleteEngine(engineDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/engine', {
      method: 'DELETE',
      body: JSON.stringify({engineDesignId: parseInt(engineDesignId, 10)})
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: DELETE_ENGINE_DESIGN,
        payload: result
      }))
  }
}

export function checkEngine(modifierId, sizeId, callback) {
  fetch(endpoint + '/api/check/design/engine', {
    method: 'POST',
    body: JSON.stringify({
      checkEngineModifier: parseInt(modifierId, 10),
      checkEngineSize: parseInt(sizeId, 10)
    })})
    .then(res => res.json())
    .then(callback)
}