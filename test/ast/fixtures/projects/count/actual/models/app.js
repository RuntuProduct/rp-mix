'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'app',
  state: {
    loading: false
  },
  reducers: {
    showLoading: function showLoading(state) {
      return (0, _extends3.default)({}, state, { loading: true });
    }
  }
};
module.exports = exports['default'];