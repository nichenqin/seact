import WebUI from 'sketch-module-web-view'
import Seact from '../../seact'
import Button from './components/Button'
import Artboard from './components/Artboard'
import SymbolMaster from './components/SymbolMaster'

export default function (context) {
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
      'webView:didFinishLoadForFrame:': function (webView, webFrame) {
        context.document.showMessage('UI loaded!')
      },
    },
    handlers: {
      nativeLog(s) {
        try {
          // const instance = Seact.render(<symbolinstance
          //     from={{ url: '/Users/nichenqin/Desktop/button.sketch', path: 'button/normal' }}
          //     frame={{
          //       width: 300,
          //       height: 200,
          //       x: 20,
          //       y: 500,
          //     }}
          //   />)
          Seact.render(<Button />)
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
