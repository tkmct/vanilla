'use strict';

const todos = [
  'Read book',
  'Buy coffee',
  'Study'
];

function listItem(item) {
  const ref = document.createElement('div');
  ref.appendChild(document.createTextNode(item));
  return ref
}

function render() {
  const listRef = document.getElementById('todo-list');
  listRef.innerHtml = '';

  todos.forEach(todo => {
    listRef.appendChild(listItem(todo));
  });
}

render();
