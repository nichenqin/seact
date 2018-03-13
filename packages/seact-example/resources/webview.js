import pluginCall from 'sketch-module-web-view/client'

// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

document.getElementById('width').addEventListener('change', (e) => {
  pluginCall('nativeLog', e.target.value)
})

document.getElementById('button').addEventListener('change', () => {
  pluginCall('nativeLog', 200)
})

// called from the plugin
window.setRandomNumber = function (randomNumber) {
  document.getElementById('answer').innerHTML = `Random number from the plugin: ${randomNumber}`
}
