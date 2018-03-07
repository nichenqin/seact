import sketch from 'sketch/dom' // eslint-disable-line
import Settings from 'sketch/settings' // eslint-disable-line
import _ from 'lodash'
import { setLayerSettingForKey } from './utils/data'

const { Flow } = sketch

export const LAYER_KEY = '@@seact-data'

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

export function generateConfig(type, props) {
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
      layer.systemFontSize = Number(fontSize)
    }
  },
  data(layer, data) {
    if (typeof Settings.setLayerSettingForKey === 'function') {
      Settings.setLayerSettingForKey(layer, LAYER_KEY, data)
    } else setLayerSettingForKey(layer, LAYER_KEY, data)
  },
  overrides(instance, overrides) {
    if (instance.type === String(sketch.Types.SymbolInstance)) {
      const values = Array.isArray(overrides) ? overrides : Object.values(overrides)
      instance.overrides.forEach((override, index) => {
        const value = values[index]
        instance.setOverrideValue(override, value)
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
