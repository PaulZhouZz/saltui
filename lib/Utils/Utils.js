'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var preventDefault = function preventDefault(e) {
  e.preventDefault();
};

var stopBodyScrolling = function stopBodyScrolling(bool) {
  if (bool === true) {
    document.body.addEventListener('touchmove', preventDefault, false);
  } else {
    document.body.removeEventListener('touchmove', preventDefault, false);
  }
};

exports.default = {
  stopBodyScrolling: stopBodyScrolling
};
module.exports = exports['default'];