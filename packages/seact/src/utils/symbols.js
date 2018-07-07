import sketch from 'sketch/dom' // eslint-disable-line

const allSymbols = {}
const assetLibrary = {}
const symbolLibrary = {}
const instanceLibrary = {}
const masterLibrary = {}

export function getSymbolsFromLibrary(document, url, timestamp) {
  if (!assetLibrary[document.id + url + timestamp]) {
    if (!url) {
      throw new Error('url required')
    }

    const uikit = NSURL.fileURLWithPath(url)
    const library = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit)

    if (!library) {
      throw new Error('asset library not found')
    }

    library.loadSynchronously()
    assetLibrary[document.id + url + timestamp] = library
  }

  const symbols = assetLibrary[document.id + url + timestamp].document().allSymbols()
  allSymbols[document.id + url + timestamp] = symbols
  return symbols
}

export function getSymboFromLibrarylByPath(document, url, path, timestamp) {
  const symbols =
    allSymbols[document.id + url + timestamp] || getSymbolsFromLibrary(document, url, timestamp)
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
    symbolLibrary[document.id + url + path + timestamp] = symbol
  }
  return symbol
}

export function createSymbolMasterByPath(document, url, path, timestamp) {
  if (!path) {
    throw new Error('path required')
  }

  const symbol =
    symbolLibrary[document.id + url + path + timestamp] ||
    getSymboFromLibrarylByPath(document, url, path, timestamp)
  if (!symbol) {
    throw new Error(`symbol not found in path: ${path}`)
  }

  const foreignSymbol = MSForeignSymbol.foreignSymbolWithMaster_inLibrary(
    symbol,
    assetLibrary[document.id + url + timestamp],
  )
  document.sketchObject.documentData().addForeignSymbol(foreignSymbol)

  const symbolMaster = foreignSymbol.symbolMaster()
  masterLibrary[document.id + url + path + timestamp] = symbolMaster

  return symbolMaster
}

export function createSymbolInstanceByPath(document, url, path, timestamp) {
  const symbolMaster =
    masterLibrary[document.id + url + path + timestamp] ||
    createSymbolMasterByPath(document, url, path, timestamp)

  const instance = symbolMaster.newSymbolInstance()

  if (instance) {
    instanceLibrary[document.id + url + path + timestamp] = instance
  }

  return instance
}

export function getInstanceByPath(url, path, timestamp = '') {
  const document = sketch.getSelectedDocument()
  const instance =
    instanceLibrary[document.id + url + path + timestamp] ||
    createSymbolInstanceByPath(document, url, path, timestamp)
  return sketch.fromNative(instance.copy())
}
