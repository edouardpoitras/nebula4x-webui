import Nebula4xGlobals from '../../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function checkShipyardBuild(systemId, bodyId, shipyardId, callback) {
  fetch(endpoint + '/api/check/shipyard/build', {
    method: 'POST',
    body: JSON.stringify({
      checkBuildSystem: parseInt(systemId, 10),
      checkBuildBody: parseInt(bodyId, 10),
      checkBuildShipyard: parseInt(shipyardId, 10)
    })})
    .then(res => res.json())
    .then(callback)
}

export function shipyardBuild(systemId, bodyId, shipyardId, shipName, callback) {
  fetch(endpoint + '/api/shipyard/build', {
    method: 'POST',
    body: JSON.stringify({
      createBuildSystem: parseInt(systemId, 10),
      createBuildBody: parseInt(bodyId, 10),
      createBuildShipyard: parseInt(shipyardId, 10),
      createBuildShipName: shipName
    })})
    .then(res => res.json())
    .then(callback)
}

export function checkShipyardRetool(systemId, bodyId, shipyardId, shipDesign, callback) {
  fetch(endpoint + '/api/check/shipyard/retool', {
    method: 'POST',
    body: JSON.stringify({
      checkRetoolSystem: parseInt(systemId, 10),
      checkRetoolBody: parseInt(bodyId, 10),
      checkRetoolShipyard: parseInt(shipyardId, 10),
      checkRetoolShipDesign: shipDesign 
    })})
    .then(res => res.json())
    .then(callback)
}

export function shipyardRetool(systemId, bodyId, shipyardId, shipDesign, callback) {
  fetch(endpoint + '/api/shipyard/retool', {
    method: 'POST',
    body: JSON.stringify({
      retoolSystem: parseInt(systemId, 10),
      retoolBody: parseInt(bodyId, 10),
      retoolShipyard: parseInt(shipyardId, 10),
      retoolShipDesign: shipDesign 
    })})
    .then(res => res.json())
    .then(callback)
}

export function checkShipyardCapacity(systemId, bodyId, shipyardId, capacity, callback) {
  fetch(endpoint + '/api/check/shipyard/capacity', {
    method: 'POST',
    body: JSON.stringify({
      checkCapacitySystem: parseInt(systemId, 10),
      checkCapacityBody: parseInt(bodyId, 10),
      checkCapacityShipyard: parseInt(shipyardId, 10),
      checkCapacityAmount: parseInt(capacity, 10)
    })})
    .then(res => res.json())
    .then(callback)
}

export function shipyardCapacity(systemId, bodyId, shipyardId, capacity, callback) {
  fetch(endpoint + '/api/shipyard/capacity', {
    method: 'POST',
    body: JSON.stringify({
      capacitySystem: parseInt(systemId, 10),
      capacityBody: parseInt(bodyId, 10),
      capacityShipyard: parseInt(shipyardId, 10),
      capacityAmount: parseInt(capacity, 10)
    })})
    .then(res => res.json())
    .then(callback)
}

export function checkShipyardSlipway(systemId, bodyId, shipyardId, callback) {
  fetch(endpoint + '/api/check/shipyard/slipway', {
    method: 'POST',
    body: JSON.stringify({
      checkSlipwaySystem: parseInt(systemId, 10),
      checkSlipwayBody: parseInt(bodyId, 10),
      checkSlipwayShipyard: parseInt(shipyardId, 10)
    })})
    .then(res => res.json())
    .then(callback)
}

export function shipyardSlipway(systemId, bodyId, shipyardId, callback) {
  fetch(endpoint + '/api/shipyard/slipway', {
    method: 'POST',
    body: JSON.stringify({
      slipwaySystem: parseInt(systemId, 10),
      slipwayBody: parseInt(bodyId, 10),
      slipwayShipyard: parseInt(shipyardId, 10)
    })})
    .then(res => res.json())
    .then(callback)
}