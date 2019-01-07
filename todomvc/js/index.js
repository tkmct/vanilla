import { TodoListController } from './controller'
import { TodoListView } from './view'
import { TodoListModel } from './model'

window.onload = () => {
  const root = document.getElementById('root')
  const model = new TodoListModel()
  const view = new TodoListView(root)
  const controller = new TodoListController(view, model)

  controller.render()
}