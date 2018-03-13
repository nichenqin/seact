# Seact

| under development

## example

```javascript
import Seact from 'seact'
import sketch from 'sketch/dom'

const document = sketch.getSelectedDocument()
const page = document.selectedPage

Seact.render(
  <group lock adjustToFit style={{ backgroundColor: '#e43', borderColor: '#ddd' }}>
    <text frame={{ x: 200, y: 200, widht: 200, height: 200 }} text="hello wolrd" />
  </group>,
  page,
)
```

## usage

The library help build constructed layers to sketch board by jsx which uses the [javascript API](https://github.com/BohemianCoding/SketchAPI). To use this library, you should ensure your sketch version >= v49. And it is recommended to init your project through [skpm](https://github.com/skpm/skpm).

### insallation

```bash
npm install --save-dev seact
```

### babel config

The example above ensure you're using compiler to transfrom `jsx` to valid javascript code like `babel`.

If you are using `babel`, you should install plugin to transform `jsx`

```bash
npm install --dev babel-plugin-transform-react-jsx
```

Then you should set config in `.babelrc`:

```json
{
  "plugins": [["transform-react-jsx", { "pragma": "Seact.h" }]]
}
```
