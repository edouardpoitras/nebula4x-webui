import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import ShipDesignCheck from '../../../components/Ship/ShipDesignCheck'
import { createShipDesign, checkShipDesign } from '../../../redux/actions/design/shipDesignActions'
import { fetchEngines } from '../../../redux/actions/design/engineDesignActions'
import { fetchMissleLaunchers } from '../../../redux/actions/design/missleLauncherDesignActions'
import { fetchLasers } from '../../../redux/actions/design/laserDesignActions'
import { fetchArmor } from '../../../redux/actions/research/armorActions'
import { fetchShields } from '../../../redux/actions/research/shieldActions'
import { fetchFuelStorages } from '../../../redux/actions/research/fuelStorageActions'
import { fetchCargoHandlingSystems } from '../../../redux/actions/research/cargoHandlingSystemActions'
import { fetchCargoHolds } from '../../../redux/actions/research/cargoHoldActions'
import { fetchJumpGates } from '../../../redux/actions/research/jumpGateActions'
import { fetchGeologicalSensors } from '../../../redux/actions/research/geologicalSensorActions'
import { fetchGravitationalSensors } from '../../../redux/actions/research/gravitationalSensorActions'

class NewShip extends React.Component {
  constructor(props) {
    super(props)
    // Initial internal state
    this.state = {
      engineSelection: null,
      engineCount: 0,
      missleLauncherSelection: null,
      missleLauncherCount: 0,
      laserSelection: null,
      laserCount: 0,
      armorCount: 1,
      shieldCount: 0,
      fuelStorageSelection: null,
      fuelStorageCount: 0,
      cargoHandlingSelection: null,
      cargoHandlingCount: 0,
      cargoHoldSelection: null,
      cargoHoldCount: 0,
      jumpGateSelection: null,
      jumpGateCount: 0,
      geologicalSensorSelection: null,
      geologicalSensorCount: 0,
      gravitationalSensorSelection: null,
      gravitationalSensorCount: 0,
      designCheck: null
    }
    // Bind all class functions to this
    this.dataLoaded = this.dataLoaded.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.handleSubmitNewDesign = this.handleSubmitNewDesign.bind(this)
    this.getDesignData = this.getDesignData.bind(this)
    this.handleEngineChange = this.handleEngineChange.bind(this)
    this.handleMissleLauncherChange = this.handleMissleLauncherChange.bind(this)
    this.handleLaserChange = this.handleLaserChange.bind(this)
    this.handleFuelStorageChange = this.handleFuelStorageChange.bind(this)
    this.handleCargoHandlingChange = this.handleCargoHandlingChange.bind(this)
    this.handleCargoHoldChange = this.handleCargoHoldChange.bind(this)
    this.handleJumpGateChange = this.handleJumpGateChange.bind(this)
    this.getEngineKeys = this.getEngineKeys.bind(this)
    this.getMissleLauncherKeys = this.getMissleLauncherKeys.bind(this)
    this.getArmorKeys = this.getArmorKeys.bind(this)
    this.getShieldKeys = this.getShieldKeys.bind(this)
    this.getFuelStorageKeys = this.getFuelStorageKeys.bind(this)
    this.getCargoHandlingKeys = this.getCargoHandlingKeys.bind(this)
    this.getCargoHoldKeys = this.getCargoHoldKeys.bind(this)
    this.getJumpGateKeys = this.getJumpGateKeys.bind(this)
    this.onAddEngine = this.onAddEngine.bind(this)
    this.onRemoveEngine = this.onRemoveEngine.bind(this)
    this.onAddMissleLauncher = this.onAddMissleLauncher.bind(this)
    this.onRemoveMissleLauncher = this.onRemoveMissleLauncher.bind(this)
    this.onAddLaser = this.onAddLaser.bind(this)
    this.onRemoveLaser = this.onRemoveLaser.bind(this)
    this.onAddArmor = this.onAddArmor.bind(this)
    this.onRemoveArmor = this.onRemoveArmor.bind(this)
    this.onAddShield = this.onAddShield.bind(this)
    this.onRemoveShield = this.onRemoveShield.bind(this)
    this.onAddFuelStorage = this.onAddFuelStorage.bind(this)
    this.onRemoveFuelStorage = this.onRemoveFuelStorage.bind(this)
    this.onAddCargoHandling = this.onAddCargoHandling.bind(this)
    this.onRemoveCargoHandling = this.onRemoveCargoHandling.bind(this)
    this.onAddCargoHold = this.onAddCargoHold.bind(this)
    this.onRemoveCargoHold = this.onRemoveCargoHold.bind(this)
    this.onAddJumpGate = this.onAddJumpGate.bind(this)
    this.onRemoveJumpGate = this.onRemoveJumpGate.bind(this)
    this.onAddGeologicalSensor = this.onAddGeologicalSensor.bind(this)
    this.onRemoveGeologicalSensor = this.onRemoveGeologicalSensor.bind(this)
    this.onAddGravitationalSensor = this.onAddGravitationalSensor.bind(this)
    this.onRemoveGravitationalSensor = this.onRemoveGravitationalSensor.bind(this)
    // Fetch necessary data
    if (!this.props.research ||
        !this.props.research[this.props.playerRace]) {
      this.props.fetchEngines()
      this.props.fetchMissleLaunchers()
      this.props.fetchLasers()
      this.props.fetchArmor()
      this.props.fetchShields()
      this.props.fetchFuelStorages()
      this.props.fetchCargoHandlingSystems()
      this.props.fetchCargoHolds()
      this.props.fetchJumpGates()
      this.props.fetchGeologicalSensors()
      this.props.fetchGravitationalSensors()
    } else {
      if (!this.props.research[this.props.playerRace].rEngineDesigns) this.props.fetchEngines()
      if (!this.props.research[this.props.playerRace].rMissleLauncherDesigns) this.props.fetchMissleLaunchers()
      if (!this.props.research[this.props.playerRace].rLaserDesigns) this.props.fetchLasers()
      if (!this.props.research[this.props.playerRace].rArmor) this.props.fetchArmor()
      if (!this.props.research[this.props.playerRace].rShield) this.props.fetchShields()
      if (!this.props.research[this.props.playerRace].rFuelStorage) this.props.fetchFuelStorages()
      if (!this.props.research[this.props.playerRace].rCargoHandling) this.props.fetchCargoHandlingSystems()
      if (!this.props.research[this.props.playerRace].rCargoHold) this.props.fetchCargoHolds()
      if (!this.props.research[this.props.playerRace].rJumpGate) this.props.fetchJumpGates()
      if (!this.props.research[this.props.playerRace].rGeologicalSensor) this.props.fetchGeologicalSensors()
      if (!this.props.research[this.props.playerRace].rGravitationalSensor) this.props.fetchGravitationalSensors()
    }
    // Load initial design specs
    this.checkShipDesign()
  }
  dataLoaded() {
    if (Object.keys(this.props.research).length < 1 ||
        !this.props.research[this.props.playerRace] ||
        !this.props.research[this.props.playerRace].rEngineDesigns ||
        !this.props.research[this.props.playerRace].rMissleLauncherDesigns ||
        !this.props.research[this.props.playerRace].rLaserDesigns ||
        !this.props.research[this.props.playerRace].rArmor ||
        !this.props.research[this.props.playerRace].rShield ||
        !this.props.research[this.props.playerRace].rFuelStorage ||
        !this.props.research[this.props.playerRace].rCargoHandling ||
        !this.props.research[this.props.playerRace].rCargoHold ||
        !this.props.research[this.props.playerRace].rJumpGate ||
        !this.props.research[this.props.playerRace].rGeologicalSensor ||
        !this.props.research[this.props.playerRace].rGravitationalSensor) {
      return false
    }
    return true
  }
  checkShipDesign() {
    if (!this.dataLoaded()) {
      return
    }
    if (this.state.engineCount > 0 && this.state.fuelStorageCount > 0) {
      var shipData = this.getDesignData()
      var shields = shipData.shipShield != null ? Array(this.state.shieldCount).fill(shipData.shipShield) : []
      checkShipDesign(
        Array(this.state.engineCount).fill(shipData.shipEngine),
        Array(this.state.missleLauncherCount).fill(shipData.shipMissleLauncher),
        Array(this.state.laserCount).fill(shipData.shipLaser),
        Array(this.state.armorCount).fill(shipData.shipArmor),
        shields,
        Array(this.state.fuelStorageCount).fill(shipData.shipFuelStorage),
        Array(this.state.cargoHandlingCount).fill(shipData.shipCargoHandling),
        Array(this.state.cargoHoldCount).fill(shipData.shipCargoHold),
        Array(this.state.jumpGateCount).fill(shipData.shipJumpGate),
        Array(this.state.geologicalSensorCount).fill(shipData.shipGeologicalSensor),
        Array(this.state.gravitationalSensorCount).fill(shipData.shipGravitationalSensor),
        function(ship) {
          if (this.state.designCheck) {
            ship.sdName = this.state.designCheck.sdName
          }
          this.setState({
            designCheck: ship
          })
        }.bind(this)
      )
    }
  }
  getDesignData() {
    var shipEngine = this.state.engineSelection
    if (!shipEngine) {
      shipEngine = this.getEngineKeys()[1][0]
    }
    var shipMissleLauncher = this.state.missleLauncherSelection
    if (!shipMissleLauncher) {
      shipMissleLauncher = this.getMissleLauncherKeys()[1][0]
    }
    var shipLaser = this.state.laserSelection
    if (!shipLaser) {
      shipLaser = this.getLaserKeys()[1][0]
    }
    var shipArmor = this.getArmorKeys()[1][0]
    var shipShield = this.getShieldKeys()[1][0]
    var shipFuelStorage = this.state.fuelStorageSelection
    if (!shipFuelStorage) {
      shipFuelStorage = this.getFuelStorageKeys()[1][0]
    }
    var shipCargoHandling = this.state.cargoHandlingSelection
    if (!shipCargoHandling) {
      shipCargoHandling = this.getCargoHandlingKeys()[1][0]
    }
    var shipCargoHold = this.state.cargoHoldSelection
    if (!shipCargoHold) {
      shipCargoHold = this.getCargoHoldKeys()[1][0]
    }
    var shipJumpGate = this.state.jumpGateSelection
    if (!shipJumpGate) {
      shipJumpGate = this.getJumpGateKeys()[1][0]
    }
    var shipGeologicalSensor = this.state.geologicalSensorSelection
    if (!shipGeologicalSensor) {
      shipGeologicalSensor = this.getGeologicalSensorKeys()[1][0]
    }
    var shipGravitationalSensor = this.state.gravitationalSensorSelection
    if (!shipGravitationalSensor) {
      shipGravitationalSensor = this.getGravitationalSensorKeys()[1][0]
    }
    return {
      shipEngine: shipEngine,
      shipMissleLauncher: shipMissleLauncher,
      shipLaser: shipLaser,
      shipArmor: shipArmor,
      shipShield: shipShield,
      shipFuelStorage: shipFuelStorage,
      shipCargoHandling: shipCargoHandling,
      shipCargoHold: shipCargoHold,
      shipJumpGate: shipJumpGate,
      shipGeologicalSensor: shipGeologicalSensor,
      shipGravitationalSensor: shipGravitationalSensor
    }
  }
  onNameChange(e) {
    var newShipDesign = {}
    if (this.state.designCheck) {
      newShipDesign = this.state.designCheck
    }
    newShipDesign.sdName = e.target.value
    this.setState({
      designCheck: newShipDesign
    })
  }
  onAddEngine() {
    var ec = this.state.engineCount + 1
    this.setState({
      engineCount: ec
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveEngine() {
    var ec = Math.max(0, this.state.engineCount - 1)
    this.setState({
      engineCount: ec
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddMissleLauncher() {
    var ml = this.state.missleLauncherCount + 1
    this.setState({
      missleLauncherCount: ml
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveMissleLauncher() {
    var ml = Math.max(0, this.state.missleLauncherCount - 1)
    this.setState({
      missleLauncherCount: ml
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddLaser() {
    var l = this.state.laserCount + 1
    this.setState({
      laserCount: l
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveLaser() {
    var l = Math.max(0, this.state.laserCount - 1)
    this.setState({
      laserCount: l
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddArmor() {
    var ar = this.state.armorCount + 1
    this.setState({
      armorCount: ar
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveArmor() {
    var ar = Math.max(1, this.state.armorCount - 1)
    this.setState({
      armorCount: ar
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddShield() {
    var sh = this.state.shieldCount + 1
    this.setState({
      shieldCount: sh
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveShield() {
    var sh = Math.max(0, this.state.shieldCount - 1)
    this.setState({
      shieldCount: sh
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddFuelStorage() {
    var fsc = this.state.fuelStorageCount + 1
    this.setState({
      fuelStorageCount: fsc
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveFuelStorage() {
    var fsc = Math.max(0, this.state.fuelStorageCount - 1)
    this.setState({
      fuelStorageCount: fsc
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddCargoHandling() {
    var chsc = this.state.cargoHandlingCount + 1
    this.setState({
      cargoHandlingCount: chsc
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveCargoHandling() {
    var chsc = Math.max(0, this.state.cargoHandlingCount - 1)
    this.setState({
      cargoHandlingCount: chsc
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddCargoHold() {
    var chc = this.state.cargoHoldCount + 1
    this.setState({
      cargoHoldCount: chc
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveCargoHold() {
    var chc = Math.max(0, this.state.cargoHoldCount - 1)
    this.setState({
      cargoHoldCount: chc
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddJumpGate() {
    var jgc = this.state.jumpGateCount + 1
    this.setState({
      jumpGateCount: jgc
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveJumpGate() {
    var jgc = Math.max(0, this.state.jumpGateCount - 1)
    this.setState({
      jumpGateCount: jgc
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddGeologicalSensor() {
    var gsc = this.state.geologicalSensorCount + 1
    this.setState({
      geologicalSensorCount: gsc
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveGeologicalSensor() {
    var gsc = Math.max(0, this.state.geologicalSensorCount - 1)
    this.setState({
      geologicalSensorCount: gsc
    }, function() {
      this.checkShipDesign()
    })
  }
  onAddGravitationalSensor() {
    var gsc = this.state.gravitationalSensorCount + 1
    this.setState({
      gravitationalSensorCount: gsc
    }, function() {
      this.checkShipDesign()
    })
  }
  onRemoveGravitationalSensor() {
    var gsc = Math.max(0, this.state.gravitationalSensorCount - 1)
    this.setState({
      gravitationalSensorCount: gsc
    }, function() {
      this.checkShipDesign()
    })
  }
  handleEngineChange(e) {
    this.setState({
      engineSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleMissleLauncherChange(e) {
    this.setState({
      missleLauncherSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleLaserChange(e) {
    this.setState({
      laserSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleFuelStorageChange(e) {
    this.setState({
      fuelStorageSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleCargoHandlingChange(e) {
    this.setState({
      cargoHandlingSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleCargoHoldChange(e) {
    this.setState({
      cargoHoldSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleJumpGateChange(e) {
    this.setState({
      jumpGateSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleGeologicalSensorChange(e) {
    this.setState({
      geologicalSensorSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleGravitationalSensorChange(e) {
    this.setState({
      gravitationalSensorSelection: e.target.value
    }, function() {
      this.checkShipDesign()
    })
  }
  handleSubmitNewDesign() {
    var shipData = this.getDesignData()
    var shields = shipData.shipShield != null ? Array(this.state.shieldCount).fill(shipData.shipShield) : []
    this.props.createShipDesign(
      Array(this.state.engineCount).fill(shipData.shipEngine),
      Array(this.state.missleLauncherCount).fill(shipData.shipMissleLauncher),
      Array(this.state.laserCount).fill(shipData.shipLaser),
      Array(this.state.armorCount).fill(shipData.shipArmor),
      shields,
      Array(this.state.fuelStorageCount).fill(shipData.shipFuelStorage),
      Array(this.state.cargoHandlingCount).fill(shipData.shipCargoHandling),
      Array(this.state.cargoHoldCount).fill(shipData.shipCargoHold),
      Array(this.state.jumpGateCount).fill(shipData.shipJumpGate),
      Array(this.state.geologicalSensorCount).fill(shipData.shipGeologicalSensor),
      Array(this.state.gravitationalSensorCount).fill(shipData.shipGravitationalSensor),
      this.state.designCheck.sdName
    )
    Alert.success('New Ship Created!')
    this.setState({
      engineSelection: null,
      engineCount: 0,
      missleLauncherSelection: null,
      missielLauncherCount: 0,
      laserSelection: null,
      laserCount: 0,
      armorCount: 1,
      shieldCount: 0,
      fuelStorageSelection: null,
      fuelStorageCount: 0,
      cargoHandlingSelection: null,
      cargoHoldCount: 0,
      jumpGateSelection: null,
      jumpGateCount: 0,
      geologicalSensorSelection: null,
      geologicalSensorCount: 0,
      gravitationalSensorSelection: null,
      gravitationalSensorCount: 0,
      designCheck: null
    })
  }
  getEngineKeys() {
    var obj = this.props.research[this.props.playerRace].rEngineDesigns.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].edEngine.eRating - obj[b].edEngine.eRating
    })
    return [obj, objSorted]
  }
  getMissleLauncherKeys() {
    var obj = this.props.research[this.props.playerRace].rMissleLauncherDesigns.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].mldMissleLauncher.mlSize - obj[b].mldMissleLauncher.mlSize
    })
    return [obj, objSorted]
  }
  getLaserKeys() {
    var obj = this.props.research[this.props.playerRace].rLaserDesigns.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].ldLaser.lDamage - obj[b].ldLaser.lDamage
    })
    return [obj, objSorted]
  }
  getArmorKeys() {
    var obj = this.props.research[this.props.playerRace].rArmor.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].arArmor.aRating - obj[b].arArmor.aRating
    })
    return [obj, objSorted]
  }
  getShieldKeys() {
    var obj = this.props.research[this.props.playerRace].rShield.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].shrShield.shRating - obj[b].shrShield.shRating
    })
    return [obj, objSorted]
  }
  getFuelStorageKeys() {
    var obj = this.props.research[this.props.playerRace].rFuelStorage.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].fsrFuelStorage.fsRating - obj[b].fsrFuelStorage.fsRating
    })
    return [obj, objSorted]
  }
  getCargoHandlingKeys() {
    var obj = this.props.research[this.props.playerRace].rCargoHandling.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].chsrCargoHandling.cHandleRating - obj[b].chsrCargoHandling.cHandleRating
    })
    return [obj, objSorted]
  }
  getCargoHoldKeys() {
    var obj = this.props.research[this.props.playerRace].rCargoHold.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].chrCargoHold.cHoldRating - obj[b].chrCargoHold.cHoldRating
    })
    return [obj, objSorted]
  }
  getJumpGateKeys() {
    var obj = this.props.research[this.props.playerRace].rJumpGate.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].jgrJumpGate.jgRating - obj[b].jgrJumpGate.jgRating
    })
    return [obj, objSorted]
  }
  getGeologicalSensorKeys() {
    var obj = this.props.research[this.props.playerRace].rGeologicalSensor.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].srSensor.senRating - obj[b].srSensor.senRating
    })
    return [obj, objSorted]
  }
  getGravitationalSensorKeys() {
    var obj = this.props.research[this.props.playerRace].rGravitationalSensor.unlocked
    var objSorted = Object.keys(obj).sort(function(a, b) {
      return obj[a].srSensor.senRating - obj[b].srSensor.senRating
    })
    return [obj, objSorted]
  }
  render() {
    if (!this.dataLoaded()) {
      return null
    }
    var engineKeys = this.getEngineKeys()[1]
    var formEngines = []
    if (engineKeys.length > 0) {
      for (let engineKey of engineKeys) {
        formEngines.push(<option key={engineKey} value={engineKey}>{this.props.research[this.props.playerRace].rEngineDesigns.unlocked[engineKey].edEngine.eName}</option>)
      }
    } else {
      formEngines.push(<option key='0' value='You must create and research an engine design first'>You must create and research an engine design first</option>)
    }
    var missleLauncherKeys = this.getMissleLauncherKeys()[1]
    var formMissleLaunchers = []
    if (missleLauncherKeys.length > 0) {
      for (let missleLauncherKey of missleLauncherKeys) {
        formMissleLaunchers.push(<option key={missleLauncherKey} value={missleLauncherKey}>{this.props.research[this.props.playerRace].rMissleLauncherDesigns.unlocked[missleLauncherKey].mldMissleLauncher.mlName}</option>)
      }
    } else {
      formMissleLaunchers.push(<option key='0' value='You must create and research a missle launcher design first'>You must create and research a missle launcher design first</option>)
    }
    var laserKeys = this.getLaserKeys()[1]
    var formLasers = []
    if (laserKeys.length > 0) {
      for (let laserKey of laserKeys) {
        formLasers.push(<option key={laserKey} value={laserKey}>{this.props.research[this.props.playerRace].rLaserDesigns.unlocked[laserKey].ldLaser.lName}</option>)
      }
    } else {
      formLasers.push(<option key='0' value='You must create and research a laser design first'>You must create and research a laser design first</option>)
    }
    var formFuelStorages = []
    var fuelStorageKeys = this.getFuelStorageKeys()[1]
    for (let fsKey of fuelStorageKeys) {
      formFuelStorages.push(<option key={fsKey} value={fsKey}>{this.props.research[this.props.playerRace].rFuelStorage.unlocked[fsKey].fsrFuelStorage.fsName}</option>)
    }
    var armorKeys = this.getArmorKeys()[1]
    var armorName = ''
    if (armorKeys.length > 0 && this.props.research[this.props.playerRace].rArmor.unlocked) {
      armorName = this.props.research[this.props.playerRace].rArmor.unlocked[armorKeys[armorKeys.length - 1]].arArmor.aName
    }
    var shieldKeys = this.getShieldKeys()[1]
    var formShields = ''
    if (shieldKeys.length > 0 && this.props.research[this.props.playerRace].rShield.unlocked) {
      var shieldName = this.props.research[this.props.playerRace].rShield.unlocked[shieldKeys[0]].shrShield.shName
      formShields = (
        <ControlLabel>
          Number of {shieldName}
          <span className="ship-design-shield-count"> x {this.state.shieldCount} </span>
          <Button onClick={this.onAddShield}>
            <Glyphicon glyph="plus" />
          </Button>
          <Button onClick={this.onRemoveShield}>
            <Glyphicon glyph="minus" />
          </Button>
        </ControlLabel>
      )
    } else {
      formShields = <ControlLabel>Shields - None Researched</ControlLabel>
    }
    var formCargoHandlings = []
    var cargoHandlingKeys = this.getCargoHandlingKeys()[1]
    for (let chsKey of cargoHandlingKeys) {
      formCargoHandlings.push(<option key={chsKey} value={chsKey}>{this.props.research[this.props.playerRace].rCargoHandling.unlocked[chsKey].chsrCargoHandling.cHandleName}</option>)
    }
    var formCargoHolds = []
    var cargoHoldKeys = this.getCargoHoldKeys()[1]
    for (let chKey of cargoHoldKeys) {
      formCargoHolds.push(<option key={chKey} value={chKey}>{this.props.research[this.props.playerRace].rCargoHold.unlocked[chKey].chrCargoHold.cHoldName}</option>)
    }
    var formJumpGates = []
    var jumpGateKeys = this.getJumpGateKeys()[1]
    for (let jgKey of jumpGateKeys) {
      formJumpGates.push(<option key={jgKey} value={jgKey}>{this.props.research[this.props.playerRace].rJumpGate.unlocked[jgKey].jgrJumpGate.jgName}</option>)
    }
    var jumpGateModules = ''
    if (formJumpGates.length > 0) {
      jumpGateModules = (
        <FormGroup controlId="formShipJumpGates">
          <ControlLabel>
            Jump Gate Construction Modules
            <span className="ship-design-jump-gate-count"> x {this.state.jumpGateCount} </span>
            <Button onClick={this.onAddJumpGate}>
              <Glyphicon glyph="plus" />
            </Button>
            <Button onClick={this.onRemoveJumpGate}>
              <Glyphicon glyph="minus" />
            </Button>
          </ControlLabel>
          <FormControl onChange={this.handleJumpGateChange} componentClass="select" placeholder="Ship Jump Gate Construction Module">
            {formJumpGates}
          </FormControl>
        </FormGroup>
      )
    } else {
      jumpGateModules = <FormGroup><ControlLabel>Jump Gate Construction Modules - None Researched</ControlLabel></FormGroup>
    }
    var formGeologicalSensors = []
    var geologicalSensorKeys = this.getGeologicalSensorKeys()[1]
    for (let gsKey of geologicalSensorKeys) {
      formGeologicalSensors.push(<option key={gsKey} value={gsKey}>{this.props.research[this.props.playerRace].rGeologicalSensor.unlocked[gsKey].srSensor.senName}</option>)
    }
    var formGravitationalSensors = []
    var gravitationalSensorKeys = this.getGravitationalSensorKeys()[1]
    for (let gsKey of gravitationalSensorKeys) {
      formGravitationalSensors.push(<option key={gsKey} value={gsKey}>{this.props.research[this.props.playerRace].rGravitationalSensor.unlocked[gsKey].srSensor.senName}</option>)
    }
    var specifications = '...'
    var submitButton = ''
    if (this.state.designCheck && this.state.designCheck.sdArmor && this.state.engineCount > 0 && this.state.fuelStorageCount > 0) {
      specifications = <ShipDesignCheck designCheck={this.state.designCheck} />
      submitButton = <Button bsStyle="success" onClick={this.handleSubmitNewDesign}>Submit</Button>
    }
    var shipName = ''
    if (this.state.designCheck) {
      shipName = this.state.designCheck.sdName
    }
    return (
      <div className="new-ship-design">
        <Grid fluid={true}>
          <h3>New Ship Design</h3>
          <Row>
            <Col sm={6}>
              <form>
                <FormGroup controlId="formShipEngines">
                  <ControlLabel>
                    Engines
                    <span className="ship-design-engine-count"> x {this.state.engineCount} </span>
                    <Button onClick={this.onAddEngine}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveEngine}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleEngineChange} componentClass="select" placeholder="Ship Engine">
                    {formEngines}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formShipMissleLaunchers">
                  <ControlLabel>
                    Missle Launchers
                    <span className="ship-design-missle-launcher-count"> x {this.state.missleLauncherCount} </span>
                    <Button onClick={this.onAddMissleLauncher}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveMissleLauncher}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleMissleLauncherChange} componentClass="select" placeholder="Ship Missle Launcher">
                    {formMissleLaunchers}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formShipLasers">
                  <ControlLabel>
                    Lasers
                    <span className="ship-design-laser-count"> x {this.state.laserCount} </span>
                    <Button onClick={this.onAddLaser}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveLaser}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleLaserChange} componentClass="select" placeholder="Ship Laser">
                    {formLasers}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formShipFuelStorages">
                  <ControlLabel>
                    Fuel Storages
                    <span className="ship-design-fuel-storage-count"> x {this.state.fuelStorageCount} </span>
                    <Button onClick={this.onAddFuelStorage}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveFuelStorage}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleFuelStorageChange} componentClass="select" placeholder="Ship Fuel Storage">
                    {formFuelStorages}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formArmor">
                  <ControlLabel>
                    Layers of {armorName} Armor
                    <span className="ship-design-armor-count"> x {this.state.armorCount} </span>
                    <Button onClick={this.onAddArmor}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveArmor}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                </FormGroup>
                <FormGroup controlId="formShield">
                  {formShields}
                </FormGroup>
                <FormGroup controlId="formShipCargoHolds">
                  <ControlLabel>
                    Cargo Holds
                    <span className="ship-design-cargo-hold-count"> x {this.state.cargoHoldCount} </span>
                    <Button onClick={this.onAddCargoHold}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveCargoHold}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleCargoHoldChange} componentClass="select" placeholder="Ship Cargo Hold">
                    {formCargoHolds}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formShipCargoHandlings">
                  <ControlLabel>
                    Cargo Handling Systems
                    <span className="ship-design-cargo-handling-count"> x {this.state.cargoHandlingCount} </span>
                    <Button onClick={this.onAddCargoHandling}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveCargoHandling}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleCargoHandlingChange} componentClass="select" placeholder="Ship Cargo Handling System">
                    {formCargoHandlings}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formShipGeologicalSensors">
                  <ControlLabel>
                    Geological Sensors
                    <span className="ship-design-geological-sensor-count"> x {this.state.geologicalSensorCount} </span>
                    <Button onClick={this.onAddGeologicalSensor}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveGeologicalSensor}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleGeologicalSensorChange} componentClass="select" placeholder="Ship Geological Sensor">
                    {formGeologicalSensors}
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formShipGravitationalSensors">
                  <ControlLabel>
                    Gravitational Sensors
                    <span className="ship-design-gravitational-sensor-count"> x {this.state.gravitationalSensorCount} </span>
                    <Button onClick={this.onAddGravitationalSensor}>
                      <Glyphicon glyph="plus" />
                    </Button>
                    <Button onClick={this.onRemoveGravitationalSensor}>
                      <Glyphicon glyph="minus" />
                    </Button>
                  </ControlLabel>
                  <FormControl onChange={this.handleGravitationalSensorChange} componentClass="select" placeholder="Ship Gravitational Sensor">
                    {formGravitationalSensors}
                  </FormControl>
                </FormGroup>
                {jumpGateModules}
                <FormGroup controlId="formShipName">
                  <ControlLabel>Ship Design Name</ControlLabel>
                  <FormControl
                    type="text" placeholder={'Ship Design Name'} value={shipName} onChange={this.onNameChange}>
                  </FormControl>
                </FormGroup>
                {submitButton}
              </form>
            </Col>
            <Col sm={6}>
              <h4>Ship Design Specifications</h4>
              {specifications}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

NewShip.propTypes = {
  createShipDesign: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired,
  research: PropTypes.object.isRequired,
  fetchEngines: PropTypes.func.isRequired,
  fetchMissleLaunchers: PropTypes.func.isRequired,
  fetchLasers: PropTypes.func.isRequired,
  fetchArmor: PropTypes.func.isRequired,
  fetchShields: PropTypes.func.isRequired,
  fetchFuelStorages: PropTypes.func.isRequired,
  fetchCargoHandlingSystems: PropTypes.func.isRequired,
  fetchCargoHolds: PropTypes.func.isRequired,
  fetchJumpGates: PropTypes.func.isRequired,
  fetchGeologicalSensors: PropTypes.func.isRequired,
  fetchGravitationalSensors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  research: state.research,
})

export default connect (mapStateToProps, {
  createShipDesign,
  fetchEngines,
  fetchMissleLaunchers,
  fetchLasers,
  fetchArmor,
  fetchShields,
  fetchFuelStorages,
  fetchCargoHandlingSystems,
  fetchCargoHolds,
  fetchJumpGates,
  fetchGeologicalSensors,
  fetchGravitationalSensors
})(NewShip)