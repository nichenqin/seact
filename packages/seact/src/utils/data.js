export function layerSettingForKey(layer, key) {
  const value = __command.valueForKey_onLayer(key, layer.sketchObject || layer)

  if (typeof value === 'undefined' || value === 'undefined' || value === null) {
    return undefined
  }
  return JSON.parse(value)
}

export function setLayerSettingForKey(layer, key, value) {
  __command.setValue_forKey_onLayer(JSON.stringify(value), key, layer.sketchObject || layer)
}
