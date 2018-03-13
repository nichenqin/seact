import sketch from 'sketch/dom' // eslint-disable-line
import _ from 'lodash'

import { canContainsChildren } from './render'

const mapStylesStrategy = {
  backgroundColor(layer, color, fill) {
    fill.color = sketch.Style.colorFromString(color)
  },
  borderColor(layer, color, border) {
    border.color = sketch.Style.colorFromString(color)
  },
  borderWidth(layer, width, border) {
    width = parseInt(width, 10)
    if (!_.isNaN(width)) {
      border.thickness = width
    }
  },
}

export function mapStyles(layer, style) {
  // TODO: render style to native shape
  if (_.isEmpty(style) || !canContainsChildren[layer.type.toLowerCase()]) return

  const frame = new sketch.Rectangle(0, 0, layer.frame.width, layer.frame.height).asCGRect()
  const rect = MSRectangleShape.alloc().initWithFrame(frame)
  const shape = MSShapeGroup.shapeWithPath(rect)

  const fill = shape.style().addStylePartOfType(0)
  fill.color = sketch.Style.colorFromString('rgba(0, 0, 0, 0)')
  const border = shape.style().addStylePartOfType(1)
  border.color = sketch.Style.colorFromString('rgba(0, 0, 0, 0)')

  Object.entries(style).forEach(([styleName, styleValue]) => {
    if (typeof mapStylesStrategy[styleName] === 'function') {
      let shapeStyle
      if (/^background/.test(styleName)) {
        shapeStyle = fill
      } else if (/^border/.test(styleName)) {
        shapeStyle = border
      }
      mapStylesStrategy[styleName](layer, styleValue, shapeStyle)
    }
  })

  layer.sketchObject.addLayer(shape)
  MSLayerMovement.moveToBack([shape])
}
