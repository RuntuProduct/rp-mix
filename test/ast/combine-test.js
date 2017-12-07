'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _combine = require('../src/combine');

var _combine2 = _interopRequireDefault(_combine);

var _path = require('path');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fixtures = (0, _path.join)(__dirname, 'fixtures');

describe('combine', function () {

  it('count', function () {
    var jsonPath = (0, _path.join)(fixtures, 'projects/count/expected.json');
    var infos = JSON.parse((0, _fs.readFileSync)(jsonPath, 'utf-8'));
    var result = (0, _combine2.default)(infos);
    var expected = (0, _fs.readFileSync)((0, _path.join)(jsonPath, '../combined.json'), 'utf-8');
    (0, _expect2.default)((0, _stringify2.default)(result, null, 2)).toEqual(expected);
  });

  xit('user-dashboard', function () {
    var result = runner((0, _path.join)(fixtures, 'projects/user-dashboard/actual'));
    var expected = (0, _fs.readFileSync)((0, _path.join)(fixtures, 'projects/user-dashboard/expected.json'), 'utf-8');
    (0, _expect2.default)((0, _stringify2.default)(result, null, 2)).toEqual(expected);
  });
});