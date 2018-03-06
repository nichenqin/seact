import { Flow } from 'sketch/dom'
import Seact from 'seact'
import Button from './Button'

export default class Artboard extends Seact.Component {
  static get defaultProps() {
    return {
      name: 'artboard',
      flowTarget: null,
      x: 0,
      y: 0,
    }
  }

  render() {
    const { name, flowTarget, x, y } = this.props
    return (
      <artboard name={name} frame={{ x, y, width: 375, height: 667 }}>
        {this.props.children}
        <Button />
        <image
          flow={{ target: flowTarget }}
          styles={{ backgroundColor: '#000' }}
          frame={{ x: (375 - 300) / 2, y: 20, width: 300, height: 200 }}
          image="/Users/nichenqin/Pictures/fuka.jpg"
        />
      </artboard>
    )
  }
}
