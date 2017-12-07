'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MainLayout = require('./MainLayout.less');

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MainLayout(_ref) {
  var children = _ref.children,
      location = _ref.location;

  return _react2.default.createElement(
    'div',
    { className: _MainLayout2.default.normal },
    _react2.default.createElement(_Header2.default, { location: location }),
    _react2.default.createElement(
      'div',
      { className: _MainLayout2.default.content },
      _react2.default.createElement(
        'div',
        { className: _MainLayout2.default.main },
        children
      )
    )
  );
}

MainLayout.propTypes = {
  children: _react.PropTypes.element.isRequired,
  location: _react.PropTypes.object
};

exports.default = MainLayout;
module.exports = exports['default'];