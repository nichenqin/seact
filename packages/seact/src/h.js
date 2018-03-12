export class Vlayer {
  constructor(type, props, frame, style) {
    this.type = type
    this.props = props
    this.frame = frame
    this.style = style
  }
}

export function h(type, config, ...children) {
  const props = {}
  let frame = {}
  let style = {}
  const childrenLength = children.length

  if (config !== null) {
    Object.entries(config).forEach(([propName, propValue]) => {
      if (propName === 'frame') {
        frame = propValue
      } else if (propName === 'style') {
        style = propValue
      }
      props[propName] = propValue
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

  return new Vlayer(type, props, frame, style)
}
