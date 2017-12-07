'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mock = {};

require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function (file) {
  (0, _assign2.default)(mock, require('./mock/' + file));
});

module.exports = mock;