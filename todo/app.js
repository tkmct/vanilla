const todos = [
  'Read book',
  'Buy coffee',
  'Study'
]

function listItem(item) {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))
  return li
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