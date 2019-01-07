export class TodoListController {
  constructor(TodoListView, TodoListModel) {
    this.TodoListView = TodoListView
    this.TodoListModel = TodoListModel

    this.TodoListModel.init(this.update)
  }

  update() {
    console.log('initial render')
    this.TodoListView.render(
      this.TodoListModel.todos
    )
  }
}
