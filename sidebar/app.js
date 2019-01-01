'use strict';

let isOpen = false;

function toggle() {
  if (!isOpen) {
    document.getElementById('side-nav').classList.add('open');
  } else {
    document.getElementById('side-nav').classList.remove('open');
  }
  isOpen = !isOpen;
}
