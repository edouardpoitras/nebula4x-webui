import { fabric } from 'fabric'
import { getZoom, getTextAttributes } from './utils'
import { getTopLeftLocation, getBottomRightLocation } from './canvas'

/**
 * Draw zoom helper indicator.
 */
function drawZoomHelper(props, canvas) {
  var zoom = getZoom(props)
  var topLeft = getTopLeftLocation(props, canvas)
  var bottomRight = getBottomRightLocation(props, canvas)
  var scaleText = new fabric.Text('Reset Zoom',
    Object.assign({}, getTextAttributes(props), {
      top: topLeft[1] + 20 / zoom,
      opacity: 0.7,
      hoverCursor: 'pointer',
      objectType: 'zoomHelper'
    })
  )
  scaleText.left = bottomRight[0] - (scaleText.width / 2) / zoom
  canvas.add(scaleText)
}

export { drawZoomHelper }