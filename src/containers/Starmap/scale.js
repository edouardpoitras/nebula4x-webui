import { fabric } from 'fabric'
import { getZoom, getTextAttributes } from './utils'
import { prettyNumber } from '../../utils/helpers'
import { getBottomRightLocation } from './canvas'

/**
 * Draw scale indicator.
 */
function drawScale(props, canvas) {
  var zoom = getZoom(props)
  var bottomRight = getBottomRightLocation(props, canvas)
  var currentScaleWidth = prettyNumber(canvas.getWidth() / zoom) + ' km'
  var currentScaleHeight = prettyNumber(canvas.getHeight() / zoom) + ' km'
  var currentScaleWidthText = new fabric.Text('<  <  <    ' + currentScaleWidth + '    >  >  >',
    Object.assign({}, getTextAttributes(props), {
      top: bottomRight[1] - 10 / zoom,
      opacity: 0.7
    })
  )
  var currentScaleHeightText = new fabric.Text('^\n' + currentScaleHeight,
    Object.assign({}, getTextAttributes(props), {
      top: bottomRight[1] - 40 / zoom,
      opacity: 0.7
    })
  )
  currentScaleWidthText.left = bottomRight[0] - (canvas.getWidth() / 2) / zoom
  currentScaleHeightText.left = bottomRight[0] - (canvas.getWidth() / 2) / zoom
  canvas.add(currentScaleWidthText)
  canvas.add(currentScaleHeightText)
}

export { drawScale }