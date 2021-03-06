import sketch from 'sketch/dom' // eslint-disable-line
import { initFrame } from './frame'
import { mapProps, parseConfig } from './props'
import { mapStyles } from './styles'
import { getInstanceByPath } from './utils/symbols'
import { callHook, hooks } from './hooks'

const document = sketch.getSelectedDocument()

const mountStrategy = {
  artboard(vlayer) {
    const { Artboard } = sketch
    const config = parseConfig('artboard', vlayer.props)
    const { from } = config
    if (from && from.type === String(sketch.Types.SymbolMaster)) {
      return from.toArtboard()
    }
    return new Artboard(config)
  },
  group(vlayer) {
    const { Group } = sketch
    const config = parseConfig('group', vlayer.props)
    return new Group(config)
  },
  text(vlayer) {
    const { Text } = sketch
    const config = parseConfig('text', vlayer.props)
    return new Text(config)
  },
  shape(vlayer) {
    const { Shape } = sketch
    const config = parseConfig('shape', vlayer.props)
    return new Shape(config)
  },
  image(vlayer) {
    const { Image } = sketch
    const config = parseConfig('image', vlayer.props)
    return new Image(config)
  },
  symbolmaster(vlayer) {
    const { SymbolMaster } = sketch
    const config = parseConfig('symbolmaster', vlayer.props)
    const { from } = config
    if (from && from.type === String(sketch.Types.Artboard)) {
      return SymbolMaster.fromArtboard(from)
    }
    return new SymbolMaster(config)
  },
  symbolinstance(vlayer) {
    const { SymbolInstance } = sketch
    const config = parseConfig('symbolinstance', vlayer.props)

    const { from } = config

    if (from) {
      if (typeof from.url === 'string' && typeof from.path === 'string') {
        return getInstanceByPath(from.url, from.path, from.timestamp)
      }
    }

    return new SymbolInstance(config)
  },
}

export const canContainsChildren = {
  artboard: true,
  group: true,
}

function mountComponent(vlayer, parentLayer) {
  const { type: Component, props } = vlayer

  const instance = new Component(props)

  const renderedVlayer = typeof instance.render !== 'function' ? instance : instance.render()

  const layer = mount(renderedVlayer, parentLayer)

  instance.$root = layer
  callHook(instance, hooks.DID_MOUNT, layer)

  return layer
}

function mountChildren(childrenOrVnode, parentLayer) {
  const typeOfChildren = typeof childrenOrVnode
  const children = childrenOrVnode

  if (Array.isArray(children)) {
    children.forEach((childVlayer) => {
      const typeOfChild = typeof childVlayer
      if (Array.isArray(childVlayer)) {
        mountChildren(childVlayer, parentLayer)
      } else if (typeOfChild === 'object') {
        const typeOfChildType = typeof childVlayer.type
        if (typeOfChildType === 'function') {
          mountComponent(childVlayer, parentLayer)
        } else if (typeOfChildType === 'string') {
          mount(childVlayer, parentLayer)
        }
      }
    })
  } else if (typeOfChildren === 'object') {
    const typeOfChildrenType = typeof children.type
    if (typeOfChildrenType === 'string') {
      mount(children, parentLayer)
    } else if (typeOfChildrenType === 'function') {
      mountComponent(children, parentLayer)
    }
  }

  return children
}

function mountLayer(vlayer) {
  const { type } = vlayer
  // TODO: throw error if is not a function
  const layer = mountStrategy[type](vlayer)
  return layer
}

function mount(vlayer, parentLayer) {
  const { type, props, frame, style } = vlayer
  const typeOfType = typeof type

  let layer
  if (typeOfType === 'function') {
    layer = mountComponent(vlayer, parentLayer)
  } else if (typeOfType === 'string' || typeOfType === 'number') {
    layer = mountLayer(vlayer)
  }

  layer.parent = parentLayer

  const { children } = props
  if (
    typeOfType !== 'function' &&
    // TODO: add warning if not can contains children
    canContainsChildren[type] &&
    typeof children === 'object' &&
    children !== null
  ) {
    props.children = mountChildren(children, layer)
  }

  if (props.adjustToFit && typeof layer.adjustToFit === 'function') {
    layer.adjustToFit()
  }

  initFrame(layer, frame)
  mapProps(layer, props)
  mapStyles(layer, style)

  return layer
}

export function render(vlayer, parentLayer = document.selectedPage) {
  parentLayer.layers = []

  const layer = mount(vlayer, parentLayer)

  return layer
}
