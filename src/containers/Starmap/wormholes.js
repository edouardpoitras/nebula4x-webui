import { fabric } from 'fabric'
import { getTextAttributes, getZoom} from './utils'

var wormholeColor = 'pink'
var minWormholeRadius = 3

/**
 * Helper function to draw the system's wormholes.
 */
function drawWormholes(props, canvas, wormholes, systems) {
  Object.keys(wormholes).map(function(wormholeId) {
    var wormholeData = wormholes[wormholeId]
    var locationX = wormholeData.wLocation.wLocationX
    var locationY = wormholeData.wLocation.wLocationY
    var zoom = getZoom(props)
    var text = 'Gravitational Anomaly ' + ('' + wormholeData.wId).substring(0, 3)
    if (wormholeData.wSurveyed && wormholeData.wDestinationStarId && wormholeData.wJumpGate) {
      text = 'Jump Gate to ' + systems[wormholeData.wDestinationStarId].ssStar.starName
    } else if (wormholeData.wSurveyed && wormholeData.wDestinationStarId) {
      text = 'Wormhole to ' + systems[wormholeData.wDestinationStarId].ssStar.starName
    } else if (wormholeData.wSurveyed) {
      text = null
    }
    if (text) {
      var wormholeText = new fabric.Text(text,
        Object.assign({}, getTextAttributes(props), {
          left: locationX,
          top: locationY + 10 / zoom,
          fill: 'pink',
        }))
      if (!wormholeData.wSurveyed) {
        wormholeText.set('opacity', 0)
      }
      var radius = 1
      if (radius * zoom < minWormholeRadius) {
        radius = minWormholeRadius / zoom
      }
      var wormhole = new fabric.Circle({
        radius: radius,
        fill: wormholeColor,
        left: locationX,
        top: locationY,
        originX: 'center',
        originY: 'center',
        textObject: wormholeText,
        metadata: wormholeData,
        objectType: 'wormhole'
      })
      if (wormholeData.wSurveyed && wormholeData.wJumpGate) {
        wormhole.set('hoverCursor', 'pointer')
      }
      wormhole.selectable = false
      wormholeText.selectable = false
      canvas.add(wormhole)
      canvas.add(wormholeText)
      return null
    }
    return null
  })
}

export {wormholeColor, drawWormholes}