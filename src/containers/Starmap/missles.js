import { fabric } from 'fabric'
import { getTextAttributes, getZoom } from './utils'

var missleColor = 'red'
var missleSize = 5

/**
 * Helper function to draw the system's missles.
 */
function drawMissles(props, canvas, missles) {
  missles.map(function(missle) {
    var location = missle.msLocation
    var locationX = location.mLocationX
    var locationY = location.mLocationY
    var zoom = getZoom(props)
    var firstMissle = missle.msMissleStrengths
    var text = 'Missle Salvo x' + firstMissle.length + ' @ ' + firstMissle[0] + ' str'
    var missleText = new fabric.Text(text,
      Object.assign({}, getTextAttributes(props), {left: locationX, top: locationY + 10 / zoom, fontSize: 16, fill: 'gray'}))
    var missleObject = new fabric.Rect({
      width: missleSize / zoom,
      height: missleSize / zoom,
      fill: missleColor,
      left: locationX,
      top: locationY,
      originX: 'center',
      originY: 'center',
      textObject: missleText,
      metadata: missle,
      objectType: 'missle' 
    })
    missleObject.selectable = false
    missleText.selectable = false
    canvas.add(missleObject)
    canvas.add(missleText)
    return null
  })
}

export {missleColor, missleSize, drawMissles}