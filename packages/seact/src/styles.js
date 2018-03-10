import sketch from 'sketch/dom' // eslint-disable-line

const { Rectangle } = sketch

export const styleProps = {
  frame: true,
}

const mapStylesStrategy = {
  frame(layer, frame) {
    const { x = 0, y = 0, width = 100, height = 100 } = frame
    const rect = new Rectangle(x, y, width, height)
    layer.frame = rect
  },
  backgroundColor(layer, color) {
    color = sketch.Style.colorFromString(color)
    const style = MSStyle.alloc().init()
    const fill = style.addStylePartOfType(0)
    fill.color = color

    let shape = MSRectangleShape.alloc().initWithFrame(layer.frame.asCGRect())
    shape = MSShapeGroup.shapeWithPath(shape)
    layer.sketchObject.addLayer(shape)
    shape.setStyle(style)

    MSLayerMovement.moveToBack([shape])
  },
}

export function mapStyles(layer, style) {
  Object.entries(style).forEach(([styleName, styleValue]) => {
    if (typeof mapStylesStrategy[styleName] === 'function') {
      mapStylesStrategy[styleName](layer, styleValue)
    }
  })
}
