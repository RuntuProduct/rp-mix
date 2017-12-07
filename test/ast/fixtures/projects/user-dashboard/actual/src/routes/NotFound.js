'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _NotFound = require('./NotFound.less');

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound() {
  return _react2.default.createElement(
    'div',
    { className: _NotFound2.default.normal },
    _react2.default.createElement(
      'div',
      { className: _NotFound2.default.container },
      _react2.default.createElement(
        'h1',
        { className: _NotFound2.default.title },
        '404'
      ),
      _react2.default.createElement(
        'p',
        { className: _NotFound2.default.desc },
        '\u672A\u627E\u5230\u8BE5\u9875\u9762'
      ),
      _react2.default.createElement(
        'a',
        { href: '/' },
        _react2.default.createElement(
          _antd.Button,
          { type: 'primary', style: { marginTop: 5 } },
          '\u8FD4\u56DE\u9996\u9875'
        )
      )
    )
  );
};

exports.default = NotFound;
module.exports = exports['default'];