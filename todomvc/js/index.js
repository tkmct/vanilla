import { TodoListController } from './controller'
import { TodoListView } from './view'
import { TodoListModel } from './model'

const main = () => {
  const root = document.getElementById('root')
  const model = new TodoListModel()
  const view = new TodoListView(root)
  const controller = new TodoListController(view, model)

  controller.init()
  controller.render()

  // todo: write form as mvc later
  const form = document.getElementById('add-form')
  const input = document.getElementById('item-input')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const value = input.value
    controller.onAddTodo(value)
    input.value = ''
  })
}
main()