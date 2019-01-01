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

function addItem() {
  const listRef = document.getElementById('todo-list');
  const itemInput = document.getElementById('item-input');
  
  // add to model, update view
  todos.push(itemInput.value);
  listRef.appendChild(listItem(itemInput.value));

  itemInput.value = '';
  return false;
}

render();
