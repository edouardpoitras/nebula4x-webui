/**
 * Helper function to get a printable huge number.
 */
function prettyNumber(number) {
  if (number > 1000000000000000) {
    return Math.round(number / 1000000000000000).toLocaleString() + ' quadrillion'
  } else if (number > 1000000000000) {
    return (number / 1000000000000).toFixed(2).toLocaleString() + ' trillion'
  } else if (number > 1000000000) {
    return (number / 1000000000).toFixed(2).toLocaleString() + ' billion'
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(2).toLocaleString() + ' million'
  } else {
    return Math.round(number).toLocaleString()
  }
}

function getAvailableConditions() {
  return {
    EnemyInSightCondition: {
      name: 'Enemy In Sight',
      parameters: {}
    },
    FuelCondition: {
      name: 'Fuel Condition',
      parameters: {
        fcMinimumFuel: { name: 'Minimum Fuel Percentage', type: 'number' }
      }
    },
    ShieldCondition: {
      name: 'Shield Condition',
      parameters: {
        fcMinimumShield: { name: 'Minimum Shield Percentage', type: 'number' }
      }
    }
  }
}

function getAvailableOrders() {
  return {
    MoveOrder: {
      name: 'Move',
      parameters: {
        moX: { name: 'X', type: 'number' },
        moY: { name: 'Y', type: 'number' }
      }
    },
    MoveToBodyOrder: {
      name: 'Move To',
      parameters: {
        mtboBodyId: { name: 'Body', type: 'select', data: 'body' }
      }
    },
    OrbitOrder: {
      name: 'Orbit',
      parameters: {
        ooBodyId: { name: 'Body', type: 'select', data: 'body' },
        ooArrived: { value: false }
      }
    },
    FollowOrder: {
      name: 'Follow',
      parameters: {
        foShipId: { name: 'Ship', type: 'select', data: 'ship' }
      }
    },
    AttackShipOrder: {
      name: 'Attack Ship',
      parameters: {
        asoShipId: { name: 'Ship', type: 'select', data: 'ship' }
      }
    },
    AttackNearestShipOrder: {
      name: 'Attack Nearest Ship',
      parameters: {}
    },
    ContinuousAttackNearestShipOrder: {
      name: 'Continuously Attack and Re-Target Nearest Ship',
      parameters: {}
    },
    AttackBodyOrder: {
      name: 'Attack Body',
      parameters: {
        aboBodyId: { name: 'Body', type: 'select', data: 'body' }
      }
    },
    PickupMineralsOrder: {
      name: 'Pickup Minerals',
      parameters: {
        pmoBodyId: { name: 'Body', type: 'select', data: 'body' },
        pmoMinerals: { name: 'Mineral', type: 'select', data: 'minerals' },
        pmoInProgress: { value: false },
        pmoAmount: { name: 'Amount', type: 'number', data: null }
      }
    },
    DropoffMineralsOrder: {
      name: 'Dropoff Minerals',
      parameters: {
        dmoBodyId: { name: 'Body', type: 'select', data: 'body' },
        dmoMinerals: { name: 'Mineral', type: 'select', data: 'minerals' },
        dmoInProgress: { value: false },
        dmoAmount: { name: 'Amount', type: 'number', data: null }
      }
    },
    PickupInstallmentOrder: {
      name: 'Pickup Installment',
      parameters: {
        pioBodyId: { name: 'Body', type: 'select', data: 'body' },
        pioInstallment: { name: 'Installment', type: 'select', data: 'installment' },
        pioInProgress: { value: false },
        pioProgress: { value: 0 }
      }
    },
    DropoffInstallmentOrder: {
      name: 'Dropoff Installment',
      parameters: {
        dioBodyId: { name: 'Body', type: 'select', data: 'body' },
        dioInstallment: { name: 'Installment', type: 'select', data: 'installment' },
        dioInProgress: { value: false },
        dioProgress: { value: 0 }
      }
    },
    RefuelAtBodyOrder: {
      name: 'Refuel From Body',
      parameters: {
        raboBodyId: { name: 'Body', type: 'select', data: 'body' }
      }
    },
    RefuelAtShipOrder: {
      name: 'Refuel From Ship',
      parameters: {
        rasoShipId: { name: 'Ship', type: 'select', data: 'ship' }
      }
    },
    TransferFuelToBody: {
      name: 'Transfer Fuel To Body',
      parameters: {
        tftbBodyId: { name: 'Body', type: 'select', data: 'body' },
        tftbFuelAmount: { name: 'Amount', type: 'number', data: null }
      }
    },
    TransferFuelToShip: {
      name: 'Transfer Fuel To Ship',
      parameters: {
        tftsShipId: { name: 'Ship', type: 'select', data: 'ship' },
        tftsFuelAmount: { name: 'Amount', type: 'number', data: null }
      }
    },
    GeologicalSurveyOrder: {
      name: 'Perform Geological Survey',
      parameters: {
        gsoBodyId: { name: 'Body', type: 'select', data: 'body' },
        gsoInProgress: { value: false }
      }
    },
    ContinuousGeologicalSurveyOrder: {
      name: 'Continuously Perform Geological Survey',
      parameters: {
        cgsoCurrentBodyId: { value: null },
        cgsoInProgress: { value: false },
        cgsoPlanets: { name: 'Planets', type: 'checkbox' },
        cgsoMoons: { name: 'Moons', type: 'checkbox' },
        cgsoComets: { name: 'Comets', type: 'checkbox' },
        cgsoAsteroids: { name: 'Asteroids', type: 'checkbox' }
      }
    },
    GravitationalSurveyOrder: {
      name: 'Perform Gravitational Survey',
      parameters: {
        grsoWormholeId: { name: 'Wormhole', type: 'select', data: 'wormhole' },
        grsoInProgress: { value: false }
      }
    },
    ContinuousGravitationalSurveyOrder: {
      name: 'Continuously Perform Gravitational Survey',
      parameters: {
        cgrsoCurrentWormholeId: { value: null },
        cgrsoInProgress: { value: false }
      }
    },
    BuildJumpGateOrder: {
      name: 'Build Jump Gate',
      parameters: {
        bjgoWormholeId: { name: 'Wormhole', type: 'select', data: 'wormhole' },
        bjgoInProgress: { value: false }
      }
    },
    MoveToJumpGateOrder: {
      name: 'Move To Jump Gate',
      parameters: {
        mtjgoWormholeId: { name: 'Wormhole', type: 'select', data: 'wormhole' }
      }
    },
    TransitJumpGateOrder: {
      name: 'Transit Jump Gate',
      parameters: {
        tjgoWormholeId: { name: 'Wormhole', type: 'select', data: 'wormhole' },
        tjgoCooldown: { value: 0 }
      }
    }
  }
}

function getRaceFromRaces(races) {
  var rId = 0
  Object.keys(races).map(function(raceId) {
    if (races[raceId].rController === 'Human') {
      rId = races[raceId].rId
    }
    return null
  })
  return rId
}

export { prettyNumber, getAvailableConditions, getAvailableOrders, getRaceFromRaces }