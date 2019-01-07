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
    const todoList = document.createElement('ul')
    todos.forEach(todo => {
      const todoItem = document.createElement('li') 
      todoItem.innerHTML = TodoView(todo)
      todoList.appendChild(todoItem)
    })

    root.appendChild(todoList)
  }
}

function TodoView(todo) {
  return JSON.stringify(todo) // some dom here
}