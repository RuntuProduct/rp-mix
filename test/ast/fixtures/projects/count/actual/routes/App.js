'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App(_ref) {
  var dispatch = _ref.dispatch;

  function handleClick() {
    dispatch({
      type: 'count/add'
    });
    dispatch({
      type: 'app/showLoading'
    });
  }
  return _react2.default.createElement(
    'div',
    null,
    'App'
  );
}

exports.default = App;
module.exports = exports['default'];