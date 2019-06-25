import { FETCH_SHIP_DESIGNS, FETCH_SHIP_DESIGN, CREATE_SHIP_DESIGN, DELETE_SHIP_DESIGN } from '../types'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchShipDesigns() {
  return function(dispatch) {
    fetch(endpoint + '/api/design/ship')
      .then(res => res.json())
      .then(designs => dispatch({
        type: FETCH_SHIP_DESIGNS,
        payload: designs
      }))
  }
}

export function fetchShipDesign(shipDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/ship/' + shipDesignId)
      .then(res => res.json())
      .then(design => dispatch({
        type: FETCH_SHIP_DESIGN,
        payload: design
      }))
  }
}

export function createShipDesign(engineIds, missleLauncherIds, laserIds, armorIds, shieldIds, fuelStorageIds, cargoHandlingIds, cargoHoldIds, jumpGateIds, geoSensorIds, gravSensorIds, name) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/ship', {
      method: 'POST',
      body: JSON.stringify({
        shipDesignEngines: engineIds.map(parseFloat), // parseInt not working as expected.
        shipDesignMissleLaunchers: missleLauncherIds[0] ? missleLauncherIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignLasers: laserIds[0] ? laserIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignArmor: armorIds.map(parseFloat), // parseInt not working as expected.
        shipDesignShields: shieldIds[0] ? shieldIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignFuelStorages: fuelStorageIds.map(parseFloat), // parseInt not working as expected.
        shipDesignCargoHandlings: cargoHandlingIds[0] ? cargoHandlingIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignCargoHolds: cargoHoldIds[0] ? cargoHoldIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignJumpGates: jumpGateIds[0] ? jumpGateIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignGeoSensors: geoSensorIds[0] ? geoSensorIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignGravSensors: gravSensorIds[0] ? gravSensorIds.map(parseFloat) : [], // parseInt not working as expected.
        shipDesignName: name
      })
    })
      .then(res => res.json())
      .then(shipDesign => dispatch({
        type: CREATE_SHIP_DESIGN,
        payload: shipDesign
      }))
  }
}

export function deleteShipDesign(shipDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/ship', {
      method: 'DELETE',
      body: JSON.stringify({shipDesignId: parseInt(shipDesignId, 10)})
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: DELETE_SHIP_DESIGN,
        payload: result
      }))
  }
}

export function checkShipDesign(engineIds, missleLauncherIds, laserIds, armorIds, shieldIds, fuelStorageIds, cargoHandlingIds, cargoHoldIds, jumpGateIds, geoSensorIds, gravSensorIds, callback) {
  fetch(endpoint + '/api/check/design/ship', {
    method: 'POST',
    body: JSON.stringify({
      checkShipDesignEngines: engineIds.map(parseFloat), // parseInt not working as expected.
      checkShipDesignMissleLaunchers: missleLauncherIds[0] ? missleLauncherIds.map(parseFloat) : [], // parseInt not working as expected.
      checkShipDesignLasers: laserIds[0] ? laserIds.map(parseFloat) : [], // parseInt not working as expected.
      checkShipDesignArmor: armorIds.map(parseFloat), // parseInt not working as expected.
      checkShipDesignShields: shieldIds[0] ? shieldIds.map(parseFloat) : [], // parseInt not working as expected.
      checkShipDesignFuelStorages: fuelStorageIds.map(parseFloat), // parseInt not working as expected.
      checkShipDesignCargoHandlings: cargoHandlingIds[0] ? cargoHandlingIds.map(parseFloat) : [], // parseInt not working as expected.
      checkShipDesignCargoHolds: cargoHoldIds[0] ? cargoHoldIds.map(parseFloat) : [], // parseInt not working as expected.
      checkShipDesignJumpGates: jumpGateIds[0] ? jumpGateIds.map(parseFloat) : [], // parseInt not working as expected.
      checkShipDesignGeoSensors: geoSensorIds[0] ? geoSensorIds.map(parseFloat) : [], // parseInt not working as expected.
      checkShipDesignGravSensors: gravSensorIds[0] ? gravSensorIds.map(parseFloat) : [] // parseInt not working as expected.
    })})
    .then(res => res.json())
    .then(callback)
}