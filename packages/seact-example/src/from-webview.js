import WebUI from 'sketch-module-web-view'
import Seact from '../../seact'
import Button from './components/Button'
import Artboard from './components/Artboard'
import SymbolMaster from './components/SymbolMaster'

export default function(context) {
  const webUI = new WebUI(context, require('../resources/webview.html'), {
    identifier: 'unique.id', // to reuse the UI
    x: 0,
    y: 0,
    width: 240,
    height: 180,
    blurredBackground: true,
    onlyShowCloseButton: true,
    hideTitleBar: false,
    shouldKeepAround: true,
    frameLoadDelegate: {
      // https://developer.apple.com/reference/webkit/webframeloaddelegate?language=objc
      'webView:didFinishLoadForFrame:'(webView, webFrame) {
        context.document.showMessage('UI loaded!')
      },
    },
    handlers: {
      nativeLog(s) {
        try {
          // const artboard1 = Seact.render(<Artboard name="artboard1" />)
          const instance = Seact.render(
            <symbolinstance
              from={{ url: '/Users/nichenqin/Desktop/button.sketch', path: 'button/normal' }}
            />,
          )
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
