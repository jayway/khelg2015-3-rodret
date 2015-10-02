'use strict';

function empty(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
