import { fabric } from 'fabric'
import { getTextAttributes, getZoom } from './utils'

var packetColor = 'grey'
var packetSize = 5

/**
 * Helper function to draw the system's mineral packets.
 */
function drawPackets(props, canvas, packets) {
  packets.map(function(packet) {
    var location = packet.mpLocation
    var locationX = location.plLocationX
    var locationY = location.plLocationY
    var zoom = getZoom(props)
    var packetText = new fabric.Text('Mineral Packet',
      Object.assign({}, getTextAttributes(props), {left: locationX, top: locationY + 10 / zoom, fontSize: 14, fill: 'gray'}))
    var packetObject = new fabric.Rect({
      width: packetSize / zoom,
      height: packetSize / zoom,
      fill: packetColor,
      left: locationX,
      top: locationY,
      originX: 'center',
      originY: 'center',
      textObject: packetText,
      metadata: packet,
      objectType: 'packet' 
    })
    packetObject.selectable = false
    packetText.selectable = false
    canvas.add(packetObject)
    canvas.add(packetText)
    return null
  })
}

export {packetColor, packetSize, drawPackets}