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
  backgroundColor(layer, color) {},
}

export function mapStyles(layer, styles) {
  Object.entries(styles).forEach(([styleName, styleValue]) => {
    if (typeof mapStylesStrategy[styleName] === 'function') {
      mapStylesStrategy[styleName](layer, styleValue)
    }
  })
}
