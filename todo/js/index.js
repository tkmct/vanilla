import { todos } from './model'

function listItem(item) {
  const ref = document.createElement('div')
  ref.appendChild(document.createTextNode(item))
  return ref
}

function render() {
  const listRef = document.getElementById('todo-list')
  listRef.innerHtml = ''

  todos.forEach(todo => {
    listRef.appendChild(listItem(todo))
  })
}

function addItem() {
  const listRef = document.getElementById('todo-list')
  const item = document.getElementById('item-input').value
  todos.push(item)
  listRef.appendChild(listItem(item))
}

render()