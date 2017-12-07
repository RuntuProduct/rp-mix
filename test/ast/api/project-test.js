'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _index = require('../../src/api/index');

var _index2 = _interopRequireDefault(_index);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fs = require('fs');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('api/project', function () {

  it('loadAll', function () {
    var sourcePath = (0, _path.join)(__dirname, '../fixtures/projects/count/actual');
    var result = (0, _index2.default)('project.loadAll', {
      sourcePath: sourcePath
    });
    var expected = (0, _fs.readFileSync)((0, _path.join)(sourcePath, '../expected.json'), 'utf-8');
    (0, _expect2.default)((0, _stringify2.default)(result, null, 2)).toEqual(expected);
  });

  it('loadOne', function () {
    var sourcePath = (0, _path.join)(__dirname, '../fixtures/projects/count/actual');
    var result = (0, _index2.default)('project.loadOne', {
      sourcePath: sourcePath,
      filePath: 'models/app.js'
    });
    (0, _expect2.default)(result).toEqual({ dispatches: { 'app/showLoading': { input: [], output: ['Reducer^^models/app.js^^showLoading'] } }, models: { data: [{ effects: [], filePath: 'models/app.js', id: 'Model^^models/app.js^^app', namespace: 'app', reducers: ['Reducer^^models/app.js^^showLoading'], state: { loading: false }, subscriptions: [] }], effectByIds: {}, reducerByIds: { 'Reducer^^models/app.js^^showLoading': { filePath: 'models/app.js', id: 'Reducer^^models/app.js^^showLoading', modelId: 'Model^^models/app.js^^app', name: 'showLoading', source: 'function(state) {\n  return { ...state, loading: true, };\n}' } }, subscriptionByIds: {} }, routeComponents: [], router: null });
  });
});