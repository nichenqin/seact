import Seact from 'seact'

export default class Button extends Seact.Component {
  static get defaultProps() {
    return {
      name: 'button',
      text: 'Hello World',
      flowTarget: null,
      url: '/Users/nichenqin/Desktop/button.sketch',
      path: 'button/normal',
    }
  }

  render() {
    const {
      name, text, flowTarget, url, path,
    } = this.props
    return (
      <group
        data={{ text }}
        flow={{ target: flowTarget }}
        name={name}
        frame={{
          x: 0,
          y: 0,
          width: 300,
          height: 100,
        }}
      >
        <symbolinstance from={{ url, path }} overrides={{ text }} />
      </group>
    )
  }
}
