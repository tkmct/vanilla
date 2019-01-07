import { TodoListView } from './view'
import { Todo } from './model'

const todos = [
  new Todo('Hello', false),
  new Todo('World', false),
]

window.onload = () => {
  const root = document.getElementById('root')
  const view = new TodoListView(root)
  view.render(todos)
}