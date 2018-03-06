import Seact from 'seact'
import { Style, Text } from 'sketch/dom'

export default class Button extends Seact.Component {
  static get defaultProps() {
    return {
      name: 'button',
      text: 'Hello World',
      flowTarget: null,
    }
  }

  render() {
    const { name, text, flowTarget } = this.props
    return (
      <group
        flow={{ target: flowTarget }}
        name={name}
        frame={{ x: 0, y: 0, width: 300, height: 100 }}
      >
        <text text={text} systemFontSize={30} />
        <shape style={{ fills: ['#c0ffee'] }} />
      </group>
    )
  }
}
