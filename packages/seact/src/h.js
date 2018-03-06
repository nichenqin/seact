import { styleProps } from './styles'

export class Vlayer {
  constructor(type, props, styles) {
    this.type = type
    this.props = props
    this.styles = styles
  }
}

export function h(type, config, ...children) {
  const props = {}
  const styles = {}
  const childrenLength = children.length

  if (config !== null) {
    Object.entries(config).forEach(([propName, propValue]) => {
      if (styleProps[propName]) {
        styles[propName] = propValue
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

  return new Vlayer(type, props, styles)
}
