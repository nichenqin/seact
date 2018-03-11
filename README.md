# Seact

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

### insallation

```bash
npm install --save-dev seact
```

### babel config

```json
{
  "plugins": [["transform-react-jsx", { "pragma": "Seact.h" }]]
}
```
