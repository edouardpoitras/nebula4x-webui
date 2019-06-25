import { fabric } from 'fabric'
import { getTextAttributes, getZoom } from './utils'

var shipColor = 'grey'
var shipSize = 5

/**
 * Helper function to draw the system's ships.
 */
function drawShips(props, canvas, ships) {
  Object.keys(ships).map(function(shipKey) {
    var shipData = ships[shipKey]
    var location = shipData.sLocation
    var locationX = location.sLocationX
    var locationY = location.sLocationY
    var zoom = getZoom(props)
    var shipText = new fabric.Text(shipData.sName,
      Object.assign({}, getTextAttributes(props), {left: locationX}, {top: locationY + 10 / zoom}))
    var ship = new fabric.Rect({
      width: shipSize / zoom,
      height: shipSize / zoom,
      fill: shipColor,
      left: locationX,
      top: locationY,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
      textObject: shipText,
      metadata: shipData,
      objectType: 'ship' 
    })
    ship.selectable = false
    shipText.selectable = false
    canvas.add(ship)
    canvas.add(shipText)
    return null
  })
}

export {shipColor, shipSize, drawShips}