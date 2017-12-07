'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _Helper = require('../../src/collections/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register methods.
_Helper2.default.register();

describe('collections/Helper', function () {

  // Tested in other collections

  it('hasModule', function () {
    (0, _expect2.default)((0, _jscodeshift2.default)('import "a"').hasModule('a')).toEqual(true);
    (0, _expect2.default)((0, _jscodeshift2.default)('import "a"').hasModule('b')).toEqual(false);
    (0, _expect2.default)((0, _jscodeshift2.default)('const a = require("b")').hasModule('b')).toEqual(true);
    // require 了未使用, 不算
    (0, _expect2.default)((0, _jscodeshift2.default)('require("b")').hasModule('b')).toEqual(false);
  });
});