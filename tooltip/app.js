'use strict';

const button = document.getElementById('tooltip-button');
const root = document.getElementById('tooltip-root');

button.style.position = 'relative';
button.addEventListener('click', (e) => {
  e.stopPropagation();
  showTooltip(root, button);
});

window.addEventListener('click', (e) => {
  hideTooltip(root);
});

function showTooltip(root, button) {
  const content = document.createElement('div');
  content.appendChild(document.createTextNode('Hello, world'));
  root.appendChild(content);
}

function hideTooltip(root) {
  const content = root.firstChild;
  if (content) {
    root.removeChild(content);
  }
}
