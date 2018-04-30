import sketch from 'sketch/dom' // eslint-disable-line
import Settings from 'sketch/settings' // eslint-disable-line
import _ from 'lodash'
import { setLayerSettingForKey } from './utils/data'

const { Flow } = sketch

const commonProps = {
  id: true,
  name: true,
}

const availableProps = {
  artboard: {
    ...commonProps,
    from: true,
  },
  group: {
    ...commonProps,
    flow: true,
  },
  text: {
    ...commonProps,
    flow: true,
    text: true,
    alignment: true,
  },
  shape: {
    ...commonProps,
    flow: true,
  },
  image: {
    ...commonProps,
    flow: true,
    image: true,
  },
  symbolmaster: {
    ...commonProps,
    flow: true,
    from: true,
    symbolId: true,
  },
  symbolinstance: {
    ...commonProps,
    flow: true,
    from: true,
  },
}

const specialProps = {
  flow(props) {
    if ((props.flow && !!props.flow.target) || !!props.flow.targetId) {
      const {
        target,
        targetId,
        animationType = String(Flow.AnimationType.slideFromLeft),
      } = props.flow

      const flow = {}
      if (target) {
        flow.target = target
      } else {
        flow.targetId = targetId
      }
      flow.animationType = String(animationType)

      return flow
    }
    return null
  },
}

export function parseConfig(type, props) {
  const config = {}
  const availables = availableProps[type]

  Object.entries(props).forEach(([propName, propValue]) => {
    if (typeof specialProps[propName] === 'function') {
      if (specialProps[propName](props)) {
        config[propName] = specialProps[propName](props)
      }
    } else if (availables[propName]) {
      config[propName] = propValue
    }
  })

  return config
}

const mapPropsStrategy = {
  systemFontSize(layer, fontSize) {
    if (!_.isNaN(Number(fontSize)) && layer.type === String(sketch.Types.Text)) {
      layer.sketchObject.setFontSize(Number(fontSize))
    }
  },
  data(layer, data) {
    if (typeof Settings.setLayerSettingForKey === 'function') {
      Object.entries(data).forEach(([key, value]) => {
        Settings.setLayerSettingForKey(layer, key, value)
      })
    } else {
      Object.entries(data).forEach(([key, value]) => {
        setLayerSettingForKey(layer, key, value)
      })
    }
  },
  overrides(instance, overrides) {
    if (instance.type === String(sketch.Types.SymbolInstance)) {
      if (Array.isArray(overrides)) {
        instance.overrides.forEach((override, index) => {
          const value = overrides[index]
          if (value !== undefined) {
            override.value = value
          }
        })
      } else if (typeof overrides === 'object' && overrides !== null) {
        instance.overrides.forEach((override) => {
          const name = String(override.sketchObject.overridePoint().layerName())
          const value = overrides[name]
          if (value !== undefined) {
            override.value = value
          }
        })
      }
    }
  },
  lock(layer, isLocked) {
    layer.sketchObject.setIsLocked(!!isLocked)
  },
  fix(layer, fixProps) {
    if (Array.isArray(fixProps)) {
      fixProps.forEach((prop) => {
        layer.sketchObject[`hasFixed${_.upperFirst(prop)}`] = true
      })
    } else if (typeof fixProps === 'object' && fixProps !== null) {
      Object.entries(fixProps).forEach(([prop, value]) => {
        layer.sketchObject[`hasFixed${_.upperFirst(prop)}`] = !!value
      })
    }
  },
}

export function mapProps(layer, props) {
  Object.entries(props).forEach(([propName, propValue]) => {
    if (typeof mapPropsStrategy[propName] === 'function') {
      mapPropsStrategy[propName](layer, propValue)
    }
  })
}
