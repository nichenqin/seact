import Seact from 'seact'

class Button extends Seact.Component {
  componentDidMount(layer) {
    log(layer)
  }

  render() {
    const { url, path } = this.props
    return (
      <symbolinstance
        lock
        fix={['height']}
        from={{ url, path }}
        frame={{ width: 300, height: 40 }}
        overrides={{
          text: 'hello world',
        }}
      />
    )
  }
}

Button.defaultProps = {
  name: 'button',
  text: 'Hello World',
  flowTarget: null,
  url: '/Users/nichenqin/Desktop/button.sketch',
  path: 'button/primary/normal',
}

export default Button
