import { styleProps } from './styles'

export class Vlayer {
  constructor(type, props, style) {
    this.type = type
    this.props = props
    this.style = style
  }
}

export function h(type, config, ...children) {
  const props = {}
  const style = {}
  const childrenLength = children.length

  if (config !== null) {
    Object.entries(config).forEach(([propName, propValue]) => {
      if (styleProps[propName]) {
        style[propName] = propValue
      } else if (propName === 'style') {
        Object.entries(propValue).forEach(([styleName, styleValue]) => {
          style[styleName] = styleValue
        })
      } else {
        props[propName] = propValue
      }
    })
  }

  if (childrenLength === 1) {
    props.children = children[0] // eslint-disable-line
  } else if (childrenLength > 1) {
    props.children = children
  }

  const { defaultProps } = type
  if (defaultProps) {
    Object.entries(defaultProps).forEach(([defaultPropName, defaultPropValue]) => {
      if (props[defaultPropName] === undefined) {
        props[defaultPropName] = defaultPropValue
      }
    })
  }

  return new Vlayer(type, props, style)
}
