import sketch from 'sketch/dom' // eslint-disable-line

const document = sketch.getSelectedDocument()

let allSymbols = null
let assetLibrary = null
const symbolLibrary = {}
const instanceLibrary = {}
const masterLibrary = {}

export function getSymbolsFromLibrary(url) {
  if (!assetLibrary) {
    if (!url) {
      throw new Error('url required')
    }

    url = NSURL.fileURLWithPath(url)
    const library = MSUserAssetLibrary.alloc().initWithDocumentAtURL(url)

    if (!library) {
      throw new Error('asset library not found')
    }

    library.loadSynchronously()
    assetLibrary = library
  }

  const symbols = assetLibrary.document().allSymbols()
  allSymbols = symbols
  return symbols
}

export function getSymboFromLibrarylByPath(url, path) {
  const symbols = allSymbols || getSymbolsFromLibrary(url)
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
    symbolLibrary[path] = symbol
  }
  return symbol
}

export function createSymbolMasterByPath(url, path) {
  if (!path) {
    throw new Error('path required')
  }

  const symbol = symbolLibrary[path] || getSymboFromLibrarylByPath(url, path)
  if (!symbol) {
    throw new Error(`symbol not found in path: ${path}`)
  }

  const foreignSymbol = MSForeignSymbol.foreignSymbolWithMaster_inLibrary(symbol, assetLibrary)
  document.sketchObject.documentData().addForeignSymbol(foreignSymbol)

  const symbolMaster = foreignSymbol.symbolMaster()
  masterLibrary[path] = symbolMaster

  return symbolMaster
}

export function createSymbolInstanceByPath(url, path) {
  const symbolMaster = masterLibrary[path] || createSymbolMasterByPath(url, path)

  const instance = symbolMaster.newSymbolInstance()

  if (instance) {
    instanceLibrary[path] = instance
  }

  return instance
}

export function getInstanceByPath(url, path) {
  const instance = instanceLibrary[path] || createSymbolInstanceByPath(url, path)
  return sketch.fromNative(instance.copy())
}
