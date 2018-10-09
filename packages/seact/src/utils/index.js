export function createShape(rect) {
  if (typeof MSShapeGroup.shapeWithPath === 'function') {
    return MSShapeGroup.shapeWithPath(rect)
  }
  return MSShapeGroup.layerWithPath(rect)
}
