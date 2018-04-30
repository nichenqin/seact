import sketch from 'sketch/dom' // eslint-disable-line
import Seact from 'seact'

export function importPdf() {
  try {
    const document = sketch.getSelectedDocument()
    const page = document.selectedPage
    Seact.render(
      <pdf from={'/Users/nichenqin/Desktop/list.pdf'} />,
      new sketch.Group({ name: 'pdf', parent: page }),
    )
  } catch (error) {
    log(error)
    log(error.message)
  }
}
