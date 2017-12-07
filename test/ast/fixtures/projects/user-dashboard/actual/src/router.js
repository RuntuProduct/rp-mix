'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var history = _ref.history;

  return _react2.default.createElement(
    _router.Router,
    { history: history },
    _react2.default.createElement(_router.Route, { path: '/', component: _HomePage2.default }),
    _react2.default.createElement(_router.Route, { path: '/users', component: _Users2.default }),
    _react2.default.createElement(_router.Route, { path: '*', component: _NotFound2.default })
  );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('dva/router');

var _HomePage = require('./routes/HomePage');

var _HomePage2 = _interopRequireDefault(_HomePage);

var _NotFound = require('./routes/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _Users = require('./routes/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/* eslint react/prop-types:0 */