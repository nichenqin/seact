import WebUI from 'sketch-module-web-view'
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
      nativeLog() {
        try {
          Seact.render(<group
              name="nichenqin"
              frame={{ width: 300 }}
              style={{ backgroundColor: '#fff', borderColor: '#e43', borderWidth: 3 }}
              adjustToFit
              lock
            >
              <symbolinstance
                from={{ url: '/Users/nichenqin/Desktop/button.sketch', path: 'button/normal' }}
              />
            </group>)
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
