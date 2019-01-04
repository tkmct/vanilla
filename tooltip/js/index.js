const button = document.getElementById('tooltip-button')
const root = document.getElementById('tooltip-root')

button.style.position = 'relative'
button.addEventListener('click', () => {
  toggleTooltip(root, button)
})

function toggleTooltip(root, button) {
  const content = document.createElement('div')
  content.appendChild(document.createTextNode('Hello, world'))
  root.appendChild(content)
}
