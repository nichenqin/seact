import sketch from 'sketch/dom' // eslint-disable-line
import _ from 'lodash'

export function initFrame(layer, frame) {
  if (!frame || _.isEmpty(frame)) return

  const { x = 0, y = 0, width = 100, height = 100 } = frame
  const rect = { x, y, width, height }
  layer.frame = rect
}
