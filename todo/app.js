'use strict';

const todos = [];

class Item {
  constructor(text) {
    this.text = text;
    this.done = false;
    this.id = Date.now().toString();
  }

  toggleDone() {
    this.done = true;
  }
}

function listItem(item) {
  const ref = document.createElement('li');
  ref.appendChild(document.createTextNode(item.text));
  const buttonElement = document.createElement('button');
  buttonElement.appendChild(document.createTextNode('✕'));
  const buttonAttr = document.createAttribute('class');
  buttonAttr.value = 'delete-button';
  buttonElement.setAttributeNode(buttonAttr);
  const buttonClickHandler = document.createAttribute('onclick');
  buttonClickHandler.value = `deleteItem("${item.id}")`;
  buttonElement.setAttributeNode(buttonClickHandler);
  ref.appendChild(buttonElement);
  return ref
}

function render() {
  const listNode = document.getElementById('todo-list');
  while (listNode.firstChild) {
    listNode.removeChild(listNode.firstChild);
  }

  todos.forEach(item => {
    listNode.appendChild(listItem(item));
  });
}

function addItem() {
  const listRef = document.getElementById('todo-list');
  const itemInput = document.getElementById('item-input');
  const item = new Item(itemInput.value);
  
  todos.push(item);
  render();

  itemInput.value = '';
  return false;
}

function deleteItem(id) {
  const i = todos.findIndex(item => item.id === id);
  todos.splice(i, 1);
  render();
}

render();
