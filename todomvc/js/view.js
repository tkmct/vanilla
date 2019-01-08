// have specific update method passed by controller
// attatch update method to dom event
export class TodoListView {
  /**
   * constructor function of TodoListView
   * @param {HTMLElement} root mount point
   */
  constructor(root) {
    this.root = root
    this.handlers = {}

    this.attatchEvents = this.attatchEvents.bind(this)
  }

  attatchEvents(handlers) {
    this.handlers = handlers
  }

  render(todos) {
    const { onChangeDone, onDelete } = this.handlers
    if (!onChangeDone || !onDelete) {
      throw new Error('No handler is provided')
    }

    // clean root children
    while (root.firstChild) {
      root.removeChild(root.firstChild)
    }

    // rerender using new todos
    const listContainer = document.createElement('div')
    listContainer.setAttribute('class', 'list-container')
    todos.forEach(todo => {
      const wrap = document.createElement('div')
      wrap.setAttribute('class', 'todo-list')
      listContainer.appendChild(
        TodoView(todo, this.handlers.onChangeDone, this.handlers.onDelete)
      )
    })

    root.appendChild(listContainer)
  }
}

function TodoView(todo, handleChangeDone, handleDelete) {
  const dom = document.createElement('div') 
  dom.setAttribute('class', 'todo-item')
  dom.innerHTML = todo.title

  const checkBox = document.createElement('input')
  checkBox.setAttribute('class', 'done-checkbox')
  checkBox.setAttribute('type', 'checkbox')
  if (todo.done) {
    checkBox.setAttribute('checked', '')
  }

  checkBox.addEventListener('change', () => {
    handleChangeDone(todo, checkBox.checked)
  })

  dom.insertBefore(checkBox, dom.childNodes[0])

  // TODO: add delete button
 
  return dom
}