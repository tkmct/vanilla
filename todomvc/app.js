'use strict';

// have specific update method passed by controller
// attatch update method to dom event
class TodoListView {
  /**
   * constructor function of TodoListView
   * @param {HTMLElement} root mount point
   */
  constructor(root) {
    this.root = root;
  }

  attatchEvents() {
    // todo: write later
  }

  render(todos) {
    // clean root children
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    // rerender using new todos
    const todoList = document.createElement('ul');
    todos.forEach(todo => {
      const todoItem = document.createElement('li'); 
      todoItem.innerHTML = TodoView(todo);
      todoList.appendChild(todoItem);
    });

    root.appendChild(todoList);
  }
}

function TodoView(todo) {
  return JSON.stringify(todo) // some dom here
}

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

class TodoList {
  constructor(updater) {
    this.todos = [];
    this.update = updater;
  }

  async getAll() {
    // get all code
    const todos = await getAllFromLocalStorage(); // write later
    this.todos = todos;
    this.update();
  }

  async create(title) {
    const newTodo = new Todo(title, false);
    this.todos.append(newTodo);
    await saveToLocalStorage(Todo); // write later
    this.update();
  }

  async delete(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos.splice(index, 1);
    await deleteFromLocalStorage(id);
    this.update();
  }

  async update({ id, title, done }) {
    if (!id) {
      throw new Error('id is not provided')
    }

    const todo = this.todos.find(todo => todo.id === id);
    // update field
    if (title !== undefined) {
      todo.title = title;
    }
    if (done !== undefined) {
      todo.done = done;
    }
    await updateToLocalStorage(todo);
    this.update();
  }
}

class Todo {
  constructor(title, done) {
    this.id = Date.now().toString(); // unique id using unix timestamp
    this.title = title;
    this.done = done;
  }
}

const todos = [
  new Todo('Hello', false),
  new Todo('World', false),
];

window.onload = () => {
  const root = document.getElementById('root');
  const view = new TodoListView(root);
  view.render(todos);
};
