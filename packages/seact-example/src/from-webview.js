import WebUI from 'sketch-module-web-view'
import sketch from 'sketch/dom' // eslint-disable-line
import Seact from '../../seact'
import Button from './components/Button'

export default function (context) {
  /* eslint-disable-next-line */
  new WebUI(context, require('../resources/webview.html'), {
    identifier: 'unique.id', // to reuse the UI
    x: 0,
    y: 0,
    width: 240,
    height: 180,
    blurredBackground: true,
    onlyShowCloseButton: true,
    hideTitleBar: false,
    shouldKeepAround: true,
    handlers: {
      nativeLog() {
        log('render')
        const document = sketch.getSelectedDocument()
        const page = document.selectedPage
        const selection = document.selectedLayers
        const parent = selection.isEmpty
          ? new sketch.Group({ parent: page, name: 'button' })
          : selection.layers[0]
        try {
          Seact.render(<Button name="button" />, parent)
        } catch (error) {
          log('error')
          log(error)
        }
      },
      upload(file) {
        try {
          console.log(file)
        } catch (error) {
          console.log(error.message)
        }
      },
    },
  })
}
