import WebUI from 'sketch-module-web-view'
import sketch from 'sketch/dom' // eslint-disable-line
import Seact from '../../seact'

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
      nativeLog(width) {
        console.log('render')
        const document = sketch.getSelectedDocument()
        const page = document.selectedPage
        const selection = document.selectedLayers
        const parent = selection.isEmpty ? new sketch.Group({ parent: page }) : selection.layers[0]
        try {
          Seact.render(
            <symbolinstance
              from={{
                url: '/Users/nichenqin/Desktop/button.sketch',
                path: 'button/primary/normal',
              }}
              fix={['height']}
              frame={{ width }}
            />,
            parent,
          )

          parent.adjustToFit()
          parent.selected = true
        } catch (error) {
          console.log(error)
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
