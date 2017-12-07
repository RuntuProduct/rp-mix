'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var history = _ref.history;

  return _react2.default.createElement(
    _router.Router,
    { history: history },
    _react2.default.createElement(_router.Route, { component: _App2.default })
  );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('dva/router');

var _App = require('./routes/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];