const todos = []
// For debug
window.todos = todos

class Item {
  constructor(text) {
    this.text = text
    this.done = false
    this.id = Date.now().toString()
  }

  toggleDone() {
    this.done = !this.done 
  }
}

function listItem(item) {
  const node = document.createElement('li')
  // Done checkbox
  const checkBox = document.createElement('input')
  const checkAttrs = [
    ['class', 'done-checkbox'],
    ['onchange', `checkDone("${item.id}")`],
    ['type', 'checkbox'],
  ]
  checkAttrs.forEach((kv) => {
    const attr = document.createAttribute(kv[0])
    attr.value = kv[1]
    checkBox.setAttributeNode(attr)
  })
  // checked attribute has no value.
  if (item.done) {
    const attr = document.createAttribute('checked')
    checkBox.setAttributeNode(attr)
  }
  node.appendChild(checkBox)

  node.appendChild(document.createTextNode(item.text))

  // Delete button
  const buttonElement = document.createElement('button')
  buttonElement.appendChild(document.createTextNode('✕'))
  const buttonAttr = document.createAttribute('class')
  buttonAttr.value = 'delete-button'
  buttonElement.setAttributeNode(buttonAttr)
  const buttonClickHandler = document.createAttribute('onclick')
  buttonClickHandler.value = `deleteItem("${item.id}")`
  buttonElement.setAttributeNode(buttonClickHandler)
  node.appendChild(buttonElement)

  return node 
}

function render() {
  const listNode = document.getElementById('todo-list')
  while (listNode.firstChild) {
    listNode.removeChild(listNode.firstChild)
  }

  todos.forEach(item => {
    listNode.appendChild(listItem(item))
  })
}

function addItem() {
  const listRef = document.getElementById('todo-list')
  const itemInput = document.getElementById('item-input')
  const item = new Item(itemInput.value)
  
  todos.push(item)
  render()

  itemInput.value = ''
  return false;
}

function deleteItem(id) {
  const i = todos.findIndex(item => item.id === id)
  todos.splice(i, 1)
  render()
}

function checkDone(id) {
  const i = todos.findIndex(item => item.id === id)
  todos[i].toggleDone()
  render()
}

render()