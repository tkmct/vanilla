// have specific update method passed by controller
// attatch update method to dom event
export class TodoListView {
  /**
   * constructor function of TodoListView
   * @param {HTMLElement} root mount point
   */
  constructor(root) {
    this.root = root
  }

  attatchEvents() {
    // todo: write later
  }

  render(todos) {
    // clean root children
    while (root.firstChild) {
      root.removeChild(root.firstChild)
    }

    // rerender using new todos
    const listContainer = document.createElement('div')
    todos.forEach(todo => {
      listContainer.appendChild(TodoView(todo))
    })

    root.appendChild(listContainer)
  }
}

function TodoView(todo) {
  const dom = document.createElement('div') 
  dom.setAttribute('class', 'todo-item')
  dom.innerHTML = todo.title
 
  return dom
}