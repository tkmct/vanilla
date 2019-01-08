export class TodoListController {
  constructor(TodoListView, TodoListModel) {
    this.TodoListView = TodoListView
    this.TodoListModel = TodoListModel

    this.render = this.render.bind(this)
  }

  init() {
    this.TodoListModel.init(this.render)
    const handlers = {
      onDelete: () => { console.log('delete') },
      onChangeDone: (todo, val) => { 
        this.TodoListModel.update({
          ...todo,
          done: val
        })
      }
    }
    this.TodoListView.attatchEvents(handlers)
  }

  didMount() {
    this.TodoListModel.getAll()
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
