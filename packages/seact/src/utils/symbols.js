import sketch from 'sketch/dom' // eslint-disable-line

const allSymbols = {}
const assetLibrary = {}
const symbolLibrary = {}
const instanceLibrary = {}
const masterLibrary = {}

export function getSymbolsFromLibrary(document, url) {
  if (!assetLibrary[document.id + url]) {
    if (!url) {
      throw new Error('url required')
    }

    const uikit = NSURL.fileURLWithPath(url)
    const library = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit)

    if (!library) {
      throw new Error('asset library not found')
    }

    library.loadSynchronously()
    assetLibrary[document.id + url] = library
  }

  const symbols = assetLibrary[document.id + url].document().allSymbols()
  allSymbols[document.id + url] = symbols
  return symbols
}

export function getSymboFromLibrarylByPath(document, url, path) {
  const symbols = allSymbols[document.id + url] || getSymbolsFromLibrary(document, url)
  if (!symbols.count()) {
    throw new Error('Tried to open library but no symbol found inside the file')
  }

  let symbol = null
  const len = symbols.count()
  for (let i = 0; i < len; i += 1) {
    const symbolName = String(symbols[i].name())
    if (path === symbolName) {
      symbol = symbols[i]
      break
    }
  }

  if (symbol) {
    symbolLibrary[document.id + url + path] = symbol
  }
  return symbol
}

export function createSymbolMasterByPath(document, url, path) {
  if (!path) {
    throw new Error('path required')
  }

  const symbol =
    symbolLibrary[document.id + url + path] || getSymboFromLibrarylByPath(document, url, path)
  if (!symbol) {
    throw new Error(`symbol not found in path: ${path}`)
  }

  const foreignSymbol = MSForeignSymbol.foreignSymbolWithMaster_inLibrary(
    symbol,
    assetLibrary[document.id + url],
  )
  document.sketchObject.documentData().addForeignSymbol(foreignSymbol)

  const symbolMaster = foreignSymbol.symbolMaster()
  masterLibrary[document.id + url + path] = symbolMaster

  return symbolMaster
}

export function createSymbolInstanceByPath(document, url, path) {
  const symbolMaster =
    masterLibrary[document.id + url + path] || createSymbolMasterByPath(document, url, path)

  const instance = symbolMaster.newSymbolInstance()

  if (instance) {
    instanceLibrary[document.id + url + path] = instance
  }

  return instance
}

export function getInstanceByPath(url, path) {
  const document = sketch.getSelectedDocument()
  const instance =
    instanceLibrary[document.id + url + path] || createSymbolInstanceByPath(document, url, path)
  return sketch.fromNative(instance.copy())
}
