'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _router = require('dva/router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMenuKeyFromUrl(pathname) {
  var key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}

function Header(_ref) {
  var location = _ref.location;

  return _react2.default.createElement(
    _antd.Menu,
    {
      selectedKeys: [getMenuKeyFromUrl(location.pathname)],
      mode: 'horizontal',
      theme: 'dark'
    },
    _react2.default.createElement(
      _antd.Menu.Item,
      { key: 'users' },
      _react2.default.createElement(
        _router.Link,
        { to: '/users' },
        _react2.default.createElement(_antd.Icon, { type: 'bars' }),
        'Users'
      )
    ),
    _react2.default.createElement(
      _antd.Menu.Item,
      { key: 'home' },
      _react2.default.createElement(
        _router.Link,
        { to: '/' },
        _react2.default.createElement(_antd.Icon, { type: 'home' }),
        'Home'
      )
    ),
    _react2.default.createElement(
      _antd.Menu.Item,
      { key: '404' },
      _react2.default.createElement(
        _router.Link,
        { to: '/page-you-dont-know' },
        _react2.default.createElement(_antd.Icon, { type: 'frown-circle' }),
        '404'
      )
    ),
    _react2.default.createElement(
      _antd.Menu.Item,
      { key: 'antd' },
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/dvajs/dva', target: '_blank' },
        'dva'
      )
    )
  );
}

Header.propTypes = {
  location: _react.PropTypes.object
};

exports.default = Header;
module.exports = exports['default'];