import sketch from 'sketch'
import dialog from '@skpm/dialog'
import Seact from 'seact'

class ImageView extends Seact.Component {
  static get defaultProps() {
    return {
      name: 'image-group',
      images: [],
      width: 300,
      height: 150,
    }
  }

  render() {
    const { name, images, width, height } = this.props
    return (
      <group name={name} adjustToFit>
        {images.map((image, index) => (
          <image image={image} frame={{ x: 0, y: index * height, width, height }} />
        ))}
      </group>
    )
  }
}

export function uploadImage(context) {
  const document = sketch.fromNative(context.document)
  const urls = dialog.showOpenDialog({
    filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
    properties: ['multiSelections'],
  })

  Seact.render(<ImageView images={urls} />, document.selectedPage)
}
