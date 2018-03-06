import Seact from 'seact'

export default class SymbolMaster extends Seact.Component {
  static get defaultProps() {
    return {
      name: 'my symbol master',
      from: null,
    }
  }

  render() {
    const { name, from } = this.props

    return <symbolmaster name={name} from={from} />
  }
}
