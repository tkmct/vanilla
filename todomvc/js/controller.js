export class TodoListController {
  constructor(TodoListView, TodoListModel) {
    this.TodoListView = TodoListView
    this.TodoListModel = TodoListModel

    this.render = this.render.bind(this)
  }

  init() {
    this.TodoListModel.init(this.render)
  }

  onAddTodo(value) {
    this.TodoListModel.create(value)
  }

  render() {
    this.TodoListView.render(
      this.TodoListModel.todos
    )
  }
}
