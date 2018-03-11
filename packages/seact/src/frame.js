import sketch from 'sketch/dom' // eslint-disable-line

const { Rectangle } = sketch

export function initFrame(layer, frame) {
  const { x = 0, y = 0, width = 100, height = 100 } = frame
  const rect = new Rectangle(x, y, width, height)
  layer.frame = rect
}
