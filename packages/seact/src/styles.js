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
  shadowColor(layer, color, shadow) {
    shadow.shadowColor = sketch.Style.colorFromString(color)
  },
  shadowX(layer, offsetX, shadow) {
    offsetX = parseInt(offsetX, 10)
    if (!_.isNaN(offsetX)) {
      shadow.offsetX = offsetX
    }
  },
  shadowY(layer, offsetY, shadow) {
    offsetY = parseInt(offsetY, 10)
    if (!_.isNaN(offsetY)) {
      shadow.offsetY = offsetY
    }
  },
  shadowBlur(layer, blur, shadow) {
    blur = parseInt(blur, 10)
    if (!_.isNaN(blur)) {
      shadow.blurRadius = blur
    }
  },
  shadowSpread(layer, spread, shadow) {
    spread = parseInt(spread, 10)
    if (!_.isNaN(spread)) {
      shadow.spread = spread
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
  const shadow = shape.style().addStylePartOfType(2)
  shadow.color = sketch.Style.colorFromString('rgba(0, 0, 0, 0)')

  Object.entries(style).forEach(([styleName, styleValue]) => {
    if (typeof mapStylesStrategy[styleName] === 'function') {
      let shapeStyle
      if (/^background/.test(styleName)) {
        shapeStyle = fill
      } else if (/^border/.test(styleName)) {
        shapeStyle = border
      } else if (/^shadow/.test(styleName)) {
        shapeStyle = shadow
      }
      mapStylesStrategy[styleName](layer, styleValue, shapeStyle)
    }
  })

  layer.sketchObject.addLayer(shape)
  MSLayerMovement.moveToBack([shape])
}
