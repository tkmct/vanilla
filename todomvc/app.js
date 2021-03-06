class TodoListController {
  constructor(TodoListView, TodoListModel) {
    this.TodoListView = TodoListView;
    this.TodoListModel = TodoListModel;

    this.render = this.render.bind(this);
  }

  init() {
    this.TodoListModel.init(this.render);
    const handlers = {
      onDelete: (todo) => { 
        this.TodoListModel.delete(todo.id);
       },
      onChangeDone: (todo, val) => { 
        this.TodoListModel.update({
          ...todo,
          done: val
        });
      }
    };
    this.TodoListView.attatchEvents(handlers);
  }

  didMount() {
    this.TodoListModel.getAll();
  }

  onAddTodo(value) {
    this.TodoListModel.create(value);
  }

  render() {
    this.TodoListView.render(
      this.TodoListModel.todos
    );
  }
}

// have specific update method passed by controller
// attatch update method to dom event
class TodoListView {
  /**
   * constructor function of TodoListView
   * @param {HTMLElement} root mount point
   */
  constructor(root) {
    this.root = root;
    this.handlers = {};

    this.attatchEvents = this.attatchEvents.bind(this);
  }

  attatchEvents(handlers) {
    this.handlers = handlers;
  }

  render(todos) {
    const { onChangeDone, onDelete } = this.handlers;
    if (!onChangeDone || !onDelete) {
      throw new Error('No handler is provided')
    }

    // clean root children
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    // rerender using new todos
    const listContainer = document.createElement('div');
    listContainer.setAttribute('class', 'list-container');
    todos.forEach(todo => {
      const wrap = document.createElement('div');
      wrap.setAttribute('class', 'todo-list');
      listContainer.appendChild(
        TodoView(todo, this.handlers.onChangeDone, this.handlers.onDelete)
      );
    });

    root.appendChild(listContainer);
  }
}

function TodoView(todo, handleChangeDone, handleDelete) {
  const dom = document.createElement('div'); 
  dom.setAttribute('class', 'todo-item');
  dom.innerHTML = todo.title;

  const checkBox = document.createElement('input');
  checkBox.setAttribute('class', 'done-checkbox');
  checkBox.setAttribute('type', 'checkbox');
  if (todo.done) {
    checkBox.setAttribute('checked', '');
  }

  checkBox.addEventListener('change', () => {
    handleChangeDone(todo, checkBox.checked);
  });
  dom.insertBefore(checkBox, dom.childNodes[0]);

  const deleteButton = document.createElement('button');
  deleteButton.appendChild(document.createTextNode('✕'));
  deleteButton.setAttribute('class', 'delete-button');
  deleteButton.addEventListener('click', () => {
    handleDelete(todo);
  });
  dom.appendChild(deleteButton);
 
  return dom
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = typeof commonjsGlobal !== 'undefined' && (commonjsGlobal.crypto || commonjsGlobal.msCrypto); // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

var rngBrowser = rng;

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

var bytesToUuid_1 = bytesToUuid;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rngBrowser();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid_1(b);
}

var v1_1 = v1;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rngBrowser)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

var uuid = v4_1;
uuid.v1 = v1_1;
uuid.v4 = v4_1;

var uuidBrowser = uuid;

const LOCALSTORAGE_KEY = 'ttm.todomvc';

// Data source is localstorage
function getAllFromLocalStorage() {
  const val = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  return val || []
}

function updateLocalStorage(todos) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
}

class TodoListModel {
  constructor() {
    // initial mock todos
    this.todos = [
      new TodoModel('Hello', false),
      new TodoModel('World', true),
    ];
  }

  init(updater) {
    this.render = updater;
  }

  getAll() {
    const todos = getAllFromLocalStorage();
    this.todos = todos;
    this.render();
  }

  create(title) {
    const newTodo = new TodoModel(title, false);
    this.todos.push(newTodo);
    updateLocalStorage(this.todos);
    this.render();
  }

  delete(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos.splice(index, 1);
    updateLocalStorage(this.todos);
    this.render();
  }

  update({ id, title, done }) {
    if (!id) {
      throw new Error('id is not provided')
    }

    const idx = this.todos.findIndex(todo => todo.id === id);
    const todo = this.todos[idx];
    // update field
    if (title !== undefined) {
      todo.title = title;
    }
    if (done !== undefined) {
      todo.done = done;
    }
    this.todos[idx] = todo;

    updateLocalStorage(this.todos);
    this.render();
  }
}

class TodoModel {
  constructor(title, done) {
    this.id = uuidBrowser();
    this.title = title;
    this.done = done;
  }
}

const main = () => {
  const root = document.getElementById('root');
  const model = new TodoListModel();
  const view = new TodoListView(root);
  const controller = new TodoListController(view, model);

  controller.init();
  controller.render();
  controller.didMount();

  // todo: write form as mvc later
  const form = document.getElementById('add-form');
  const input = document.getElementById('item-input');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = input.value;
    controller.onAddTodo(value);
    input.value = '';
  });
};
main();
