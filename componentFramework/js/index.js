const app = () => {
  // app component
  return document.createElement('div')
}

const render = (app, root) => {
  // implement
  const appDOM = app()
  root.appendChild(appDOM)
}

const root = document.getElementById('root')
render(app, root)
