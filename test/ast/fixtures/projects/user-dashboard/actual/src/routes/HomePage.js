'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('dva/router');

var _HomePage = require('./HomePage.less');

var _HomePage2 = _interopRequireDefault(_HomePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HomePage() {
  return _react2.default.createElement(
    'div',
    { className: _HomePage2.default.normal },
    _react2.default.createElement(
      'h1',
      null,
      'Hello Antd.'
    ),
    _react2.default.createElement('hr', null),
    _react2.default.createElement(
      'ul',
      { className: _HomePage2.default.list },
      _react2.default.createElement(
        'li',
        null,
        'You can go to ',
        _react2.default.createElement(
          _router.Link,
          { to: '/users' },
          '/users'
        )
      )
    )
  );
}

HomePage.propTypes = {};

exports.default = HomePage;
module.exports = exports['default'];