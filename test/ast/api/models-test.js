'use strict';

var _index = require('../../src/api/index');

var _index2 = _interopRequireDefault(_index);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fsExtra = require('fs-extra');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('api/models', function () {

  var filePath = './tmp/a.js';
  var absFilePath = (0, _path.join)(__dirname, filePath);

  afterEach(function () {
    (0, _fsExtra.removeSync)((0, _path.dirname)(absFilePath));
  });

  it('models.create', function () {
    var result = (0, _index2.default)('models.create', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'a'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [{ "reducers": [], "effects": [], "subscriptions": [], "namespace": "a", "state": {}, "id": "Model^^./tmp/a.js^^a", "filePath": "./tmp/a.js" }], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": null, "routeComponents": [], "dispatches": {} });
  });

  it('models.updateNamespace', function () {
    var source = '\n      export default {\n        namespace: \'count\',\n        state: 0,\n      };\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    var result = (0, _index2.default)('models.updateNamespace', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'count',
      newNamespace: 'newCount'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [{ "reducers": [], "effects": [], "subscriptions": [], "namespace": "newCount", "state": 0, "id": "Model^^./tmp/a.js^^newCount", "filePath": "./tmp/a.js" }], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": null, "routeComponents": [], "dispatches": {} });
  });

  it('models.updateState', function () {
    var source = '\n      export default {\n        namespace: \'count\',\n        state: 0,\n      };\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    var result = (0, _index2.default)('models.updateState', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'count',
      source: '{ a: 1 }'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [{ "reducers": [], "effects": [], "subscriptions": [], "namespace": "count", "state": { "a": 1 }, "id": "Model^^./tmp/a.js^^count", "filePath": "./tmp/a.js" }], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": null, "routeComponents": [], "dispatches": {} });
  });

  it('models.addReducer', function () {
    var source = '\n      export default {\n        namespace: \'count\',\n        state: 0,\n      };\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    var result = (0, _index2.default)('models.addReducer', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'add',
      source: '1'
    });
    (0, _expect2.default)(result).toEqual({ dispatches: { 'count/add': { input: [], output: ['Reducer^^./tmp/a.js^^add'] } }, models: { data: [{ effects: [], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: ['Reducer^^./tmp/a.js^^add'], state: 0, subscriptions: [] }], effectByIds: {}, reducerByIds: { 'Reducer^^./tmp/a.js^^add': { filePath: './tmp/a.js', id: 'Reducer^^./tmp/a.js^^add', modelId: 'Model^^./tmp/a.js^^count', name: 'add', source: '1' } }, subscriptionByIds: {} }, routeComponents: [], router: null });
  });

  it('models.addEffect', function () {
    var source = '\n      export default {\n        namespace: \'count\',\n        state: 0,\n      };\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    var result = (0, _index2.default)('models.addEffect', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'addRemote',
      source: '1'
    });
    (0, _expect2.default)(result).toEqual({ dispatches: { 'count/addRemote': { input: [], output: ['Effect^^./tmp/a.js^^addRemote'] } }, models: { data: [{ effects: ['Effect^^./tmp/a.js^^addRemote'], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: [], state: 0, subscriptions: [] }], effectByIds: { 'Effect^^./tmp/a.js^^addRemote': { dispatches: [], filePath: './tmp/a.js', id: 'Effect^^./tmp/a.js^^addRemote', modelId: 'Model^^./tmp/a.js^^count', name: 'addRemote', source: '1' } }, reducerByIds: {}, subscriptionByIds: {} }, routeComponents: [], router: null });
  });

  it('models.addSubscription', function () {
    var source = '\n      export default {\n        namespace: \'count\',\n        state: 0,\n      };\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    var result = (0, _index2.default)('models.addSubscription', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'setup',
      source: '1'
    });
    (0, _expect2.default)(result).toEqual({ dispatches: {}, models: { data: [{ effects: [], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: [], state: 0, subscriptions: ['Subscription^^./tmp/a.js^^setup'] }], effectByIds: {}, reducerByIds: {}, subscriptionByIds: { 'Subscription^^./tmp/a.js^^setup': { dispatches: [], filePath: './tmp/a.js', id: 'Subscription^^./tmp/a.js^^setup', modelId: 'Model^^./tmp/a.js^^count', name: 'setup', source: '1' } } }, routeComponents: [], router: null });
  });

  it('models.updateReducer', function () {
    var source = '\n      export default {\n        namespace: \'count\',\n        state: 0,\n        reducers: { a: 1 }\n      };\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    var result = (0, _index2.default)('models.updateReducer', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'a',
      source: '2'
    });
    (0, _expect2.default)(result).toEqual({ dispatches: { 'count/a': { input: [], output: ['Reducer^^./tmp/a.js^^a'] } }, models: { data: [{ effects: [], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: ['Reducer^^./tmp/a.js^^a'], state: 0, subscriptions: [] }], effectByIds: {}, reducerByIds: { 'Reducer^^./tmp/a.js^^a': { filePath: './tmp/a.js', id: 'Reducer^^./tmp/a.js^^a', modelId: 'Model^^./tmp/a.js^^count', name: 'a', source: '2' } }, subscriptionByIds: {} }, routeComponents: [], router: null });
  });

  it('models.removeReducer', function () {
    var source = '\n      export default {\n        namespace: \'count\',\n        state: 0,\n        reducers: { a: 1 }\n      };\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    var result = (0, _index2.default)('models.removeReducer', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'a'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [{ "reducers": [], "effects": [], "subscriptions": [], "namespace": "count", "state": 0, "id": "Model^^./tmp/a.js^^count", "filePath": "./tmp/a.js" }], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": null, "routeComponents": [], "dispatches": {} });
  });
});