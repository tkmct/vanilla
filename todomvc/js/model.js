import uuid from 'uuid-browser'

// Data source is localstorage
async function getAllFromLocalStorage() {
  // TODO: Write later
  return Promise.resolve([])
}

async function saveToLocalStorage(todo) {
  // TODO: Write later
  return Promise.resolve()
}

async function deleteFromLocalStorage(id) {
  // TODO: Write later
  return Promise.resolve()
}

async function updateToLocalStorage(todo) {
  // TODO: Write later
  return Promise.resolve()
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
    this.update = updater
  }

  async getAll() {
    // get all code
    const todos = await getAllFromLocalStorage() // write later
    this.todos = todos
    this.update()
  }

  async create(title) {
    const newTodo = new TodoModel(title, false)
    this.todos.push(newTodo)
    await saveToLocalStorage(newTodo) // write later
    this.update()
  }

  async delete(id) {
    const index = this.todos.findIndex(todo => todo.id === id)
    this.todos.splice(index, 1)
    await deleteFromLocalStorage(id)
    this.update()
  }

  async update({ id, title, done }) {
    if (!id) {
      throw new Error('id is not provided')
    }

    const todo = this.todos.find(todo => todo.id === id)
    // update field
    if (title !== undefined) {
      todo.title = title
    }
    if (done !== undefined) {
      todo.done = done
    }
    await updateToLocalStorage(todo)
    this.update()
  }
}

export class TodoModel {
  constructor(title, done) {
    this.id = uuid()
    this.title = title
    this.done = done
  }
}