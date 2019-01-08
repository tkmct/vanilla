import uuid from 'uuid-browser'

const LOCALSTORAGE_KEY = 'ttm.todomvc'

// Data source is localstorage
function getAllFromLocalStorage() {
  const val = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
  return val || []
}

function updateLocalStorage(todos) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos))
}

export class TodoListModel {
  constructor() {
    // initial mock todos
    this.todos = [
      new TodoModel('Hello', false),
      new TodoModel('World', true),
    ]
  }

  init(updater) {
    this.render = updater
  }

  getAll() {
    const todos = getAllFromLocalStorage()
    this.todos = todos
    this.render()
  }

  create(title) {
    const newTodo = new TodoModel(title, false)
    this.todos.push(newTodo)
    updateLocalStorage(this.todos)
    this.render()
  }

  delete(id) {
    const index = this.todos.findIndex(todo => todo.id === id)
    this.todos.splice(index, 1)
    updateLocalStorage(this.todos)
    this.render()
  }

  update({ id, title, done }) {
    if (!id) {
      throw new Error('id is not provided')
    }

    const idx = this.todos.findIndex(todo => todo.id === id)
    const todo = this.todos[idx]
    // update field
    if (title !== undefined) {
      todo.title = title
    }
    if (done !== undefined) {
      todo.done = done
    }
    this.todos[idx] = todo

    updateLocalStorage(this.todos)
    this.render()
  }
}

export class TodoModel {
  constructor(title, done) {
    this.id = uuid()
    this.title = title
    this.done = done
  }
}