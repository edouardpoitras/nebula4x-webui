import * as types from '../../actions/types'
import shipDesignReducer from './shipDesignReducer'
import engineDesignReducer from './engineDesignReducer'
import engineFuelConsumptionReducer from './engineFuelConsumptionReducer'
import engineModifierReducer from './engineModifierReducer'
import engineSizeReducer from './engineSizeReducer'
import engineTechnologyReducer from './engineTechnologyReducer'
import missleLauncherDesignReducer from './missleLauncherDesignReducer'
import missleLauncherSizeReducer from './missleLauncherSizeReducer'
import missleLauncherReloadRateReducer from './missleLauncherReloadRateReducer'
import missleLauncherReducedSizeReducer from './missleLauncherReducedSizeReducer'
import laserDesignReducer from './laserDesignReducer'
import laserFocalSizeReducer from './laserFocalSizeReducer'
import laserWavelengthReducer from './laserWavelengthReducer'
import laserRechargeRateReducer from './laserRechargeRateReducer'
import laserReducedSizeReducer from './laserReducedSizeReducer'
import fuelStorageReducer from './fuelStorageReducer'
import cargoHandlingReducer from './cargoHandlingReducer'
import cargoHoldReducer from './cargoHoldReducer'
import jumpGateReducer from './jumpGateReducer'
import geologicalSensorReducer from './geologicalSensorReducer'
import gravitationalSensorReducer from './gravitationalSensorReducer'
import minesReducer from './minesReducer'
import researchLabsReducer from './researchLabsReducer'
import fuelRefineriesReducer from './fuelRefineriesReducer'
import shieldReducer from './shieldReducer'
import armorReducer from './armorReducer'

export default function(state = {}, action) {
  switch(action.type) {
  case types.FETCH_RESEARCH:
    return action.payload
  case types.UNLOCK_ALL_RESEARCH:
    return action.payload
  case types.FETCH_RACE_RESEARCH:
    var newState = Object.assign({}, state)
    var raceId = action.payload.rRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId] = action.payload.rResearch
    return newState
  case types.FETCH_SHIP_DESIGNS:
  case types.FETCH_SHIP_DESIGN:
  case types.CREATE_SHIP_DESIGN:
  case types.DELETE_SHIP_DESIGN:
    return shipDesignReducer(state, action)
  case types.FETCH_ENGINE_DESIGNS:
  case types.RESEARCH_ENGINE_DESIGNS:
  case types.FETCH_ENGINE_DESIGN:
  case types.CREATE_ENGINE_DESIGN:
  case types.DELETE_ENGINE_DESIGN:
    return engineDesignReducer(state, action)
  case types.FETCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS:
  case types.RESEARCH_ENGINE_DESIGN_FUEL_CONSUMPTIONS:
    return engineFuelConsumptionReducer(state, action)
  case types.FETCH_ENGINE_DESIGN_MODIFIERS:
  case types.RESEARCH_ENGINE_DESIGN_MODIFIERS:
    return engineModifierReducer(state, action)
  case types.FETCH_ENGINE_DESIGN_SIZES:
  case types.RESEARCH_ENGINE_DESIGN_SIZES:
    return engineSizeReducer(state, action)
  case types.FETCH_ENGINE_DESIGN_TECHNOLOGIES:
  case types.RESEARCH_ENGINE_DESIGN_TECHNOLOGIES:
    return engineTechnologyReducer(state, action)
  case types.FETCH_MISSLE_LAUNCHER_DESIGNS:
  case types.RESEARCH_MISSLE_LAUNCHER_DESIGNS:
  case types.FETCH_MISSLE_LAUNCHER_DESIGN:
  case types.CREATE_MISSLE_LAUNCHER_DESIGN:
  case types.DELETE_MISSLE_LAUNCHER_DESIGN:
    return missleLauncherDesignReducer(state, action)
  case types.FETCH_MISSLE_LAUNCHER_DESIGN_SIZES:
  case types.RESEARCH_MISSLE_LAUNCHER_DESIGN_SIZES:
    return missleLauncherSizeReducer(state, action)
  case types.FETCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES:
  case types.RESEARCH_MISSLE_LAUNCHER_DESIGN_RELOAD_RATES:
    return missleLauncherReloadRateReducer(state, action)
  case types.FETCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES:
  case types.RESEARCH_MISSLE_LAUNCHER_DESIGN_REDUCED_SIZES:
    return missleLauncherReducedSizeReducer(state, action)
  case types.FETCH_LASER_DESIGNS:
  case types.RESEARCH_LASER_DESIGNS:
  case types.FETCH_LASER_DESIGN:
  case types.CREATE_LASER_DESIGN:
  case types.DELETE_LASER_DESIGN:
    return laserDesignReducer(state, action)
  case types.FETCH_LASER_DESIGN_FOCAL_SIZES:
  case types.RESEARCH_LASER_DESIGN_FOCAL_SIZES:
    return laserFocalSizeReducer(state, action)
  case types.FETCH_LASER_DESIGN_WAVELENGTHS:
  case types.RESEARCH_LASER_DESIGN_WAVELENGTHS:
    return laserWavelengthReducer(state, action)
  case types.FETCH_LASER_DESIGN_RECHARGE_RATES:
  case types.RESEARCH_LASER_DESIGN_RECHARGE_RATES:
    return laserRechargeRateReducer(state, action)
  case types.FETCH_LASER_DESIGN_REDUCED_SIZES:
  case types.RESEARCH_LASER_DESIGN_REDUCED_SIZES:
    return laserReducedSizeReducer(state, action)
  case types.FETCH_FUEL_STORAGES:
  case types.RESEARCH_FUEL_STORAGES:
    return fuelStorageReducer(state, action)
  case types.FETCH_CARGO_HANDLING_SYSTEMS:
  case types.RESEARCH_CARGO_HANDLING_SYSTEMS:
    return cargoHandlingReducer(state, action)
  case types.FETCH_CARGO_HOLDS:
  case types.RESEARCH_CARGO_HOLDS:
    return cargoHoldReducer(state, action)
  case types.FETCH_JUMP_GATE_MODULES:
  case types.RESEARCH_JUMP_GATES:
    return jumpGateReducer(state, action)
  case types.FETCH_GEOLOGICAL_SENSORS:
  case types.RESEARCH_GEOLOGICAL_SENSORS:
    return geologicalSensorReducer(state, action)
  case types.FETCH_GRAVITATIONAL_SENSORS:
  case types.RESEARCH_GRAVITATIONAL_SENSORS:
    return gravitationalSensorReducer(state, action)
  case types.FETCH_MINES:
  case types.RESEARCH_MINES:
    return minesReducer(state, action)
  case types.FETCH_RESEARCH_LABS:
  case types.RESEARCH_RESEARCH_LABS:
    return researchLabsReducer(state, action)
  case types.FETCH_FUEL_REFINERIES:
  case types.RESEARCH_FUEL_REFINERIES:
    return fuelRefineriesReducer(state, action)
  case types.FETCH_SHIELD:
  case types.RESEARCH_SHIELD:
    return shieldReducer(state, action)
  case types.FETCH_ARMOR:
  case types.RESEARCH_ARMOR:
    return armorReducer(state, action)
  default:
    return state
  }
}