'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _Model = require('../../src/collections/Model');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register methods.
_Model2.default.register();

describe('collections/Model', function () {

  describe('findModelProperties', function () {
    it('namespace and state', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('({namespace:\'count\',state:0})').findModels().size()).toEqual(1);
    });
    it('namespace only', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('({namespace:\'count\'})').findModels().size()).toEqual(0);
    });
    it('namespace and reducers', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('({namespace:\'count\',reducers:{}})').findModels().size()).toEqual(1);
    });
    it('skip non-literal namespace', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('({namespace: count,reducers:{}})').findModels().size()).toEqual(0);
    });
  });

  describe('getModelInfo', function () {
    it('normal', function () {
      var code = '\n        export default {\n          namespace: \'count\',\n          state: 0,\n          reducers: {\n            add() {},\n            minus() {},\n          },\n          effects: {\n            *addMinus() {\n              yield put({ type: \'a\' });\n            },\n          },\n          subscriptions: {\n            setup() {\n              dispatch({ type: \'addMinus\' });\n            },\n          },\n        };\n      ';
      var model = (0, _jscodeshift2.default)(code).find(_jscodeshift2.default.ObjectExpression).at(0).getModelInfo();
      (0, _expect2.default)(model).toEqual([{ "namespace": "count", "state": 0, "reducers": [{ "name": "add", "source": "function() {}" }, { "name": "minus", "source": "function() {}" }], "effects": [{ "name": "addMinus", "source": "function*() {\n  yield put({ type: 'a' });\n}", "dispatches": ["a"] }], "subscriptions": [{ "name": "setup", "source": "function() {\n  dispatch({ type: 'addMinus' });\n}", "dispatches": ["addMinus"] }] }]);
    });
  });

  describe('addReducer', function () {
    it('has reducers', function () {
      var root = (0, _jscodeshift2.default)('({reducers:{}})');
      root.find(_jscodeshift2.default.ObjectExpression).at(0).addReducer('add');
      (0, _expect2.default)(root.toSource()).toEqual('({reducers:{\n  add: function(state) {\n    return state;\n  }\n}})');
    });
    it('no reducers', function () {
      var root = (0, _jscodeshift2.default)('({})');
      root.find(_jscodeshift2.default.ObjectExpression).at(0).addReducer('add');
      (0, _expect2.default)(root.toSource()).toEqual('(({\n  reducers: {\n    add: function(state) {\n      return state;\n    }\n  }\n}))');
    });
    it('add with source', function () {
      var root = (0, _jscodeshift2.default)('({})');
      root.find(_jscodeshift2.default.ObjectExpression).at(0).addReducer('add', 'function(state) { return state + 1; }');
      (0, _expect2.default)(root.toSource()).toEqual('(({\n  reducers: {\n    add: function(state) { return state + 1; }\n  }\n}))');
    });
  });

  describe('updateReducer', function () {
    it('normal', function () {
      var root = (0, _jscodeshift2.default)('({reducers:{a:1,b:2}})');
      root.find(_jscodeshift2.default.ObjectExpression).at(0).updateReducer('a', '2');
      (0, _expect2.default)(root.toSource()).toEqual('({reducers:{a:2,b:2}})');
    });
    it('throw error if reducers not found', function () {
      var root = (0, _jscodeshift2.default)('({})');
      (0, _expect2.default)(function () {
        root.find(_jscodeshift2.default.ObjectExpression).at(0).updateReducer('a', '2');
      }).toThrow(/_updateModelItem: reducers not found/);
    });
    it('throw error if reducers.item not found', function () {
      var root = (0, _jscodeshift2.default)('({reducers:{a:1,b:2}})');
      (0, _expect2.default)(function () {
        root.find(_jscodeshift2.default.ObjectExpression).at(0).updateReducer('c', '2');
      }).toThrow(/_updateModelItem: reducers.c not found/);
    });
  });

  describe('removeReducer', function () {
    it('normal', function () {
      var root = (0, _jscodeshift2.default)('({reducers:{a:1,b:2}})');
      root.find(_jscodeshift2.default.ObjectExpression).at(0).removeReducer('a');
      (0, _expect2.default)(root.toSource()).toEqual('({reducers:{\n  b:2\n}})');
    });
    it('throw error if reducers not found', function () {
      var root = (0, _jscodeshift2.default)('({})');
      (0, _expect2.default)(function () {
        root.find(_jscodeshift2.default.ObjectExpression).at(0).removeReducer('a');
      }).toThrow(/_removeModelItem: reducers not found/);
    });
    it('throw error if reducers.item not found', function () {
      var root = (0, _jscodeshift2.default)('({reducers:{a:1,b:2}})');
      (0, _expect2.default)(function () {
        root.find(_jscodeshift2.default.ObjectExpression).at(0).removeReducer('c');
      }).toThrow(/_removeModelItem: reducers.c not found/);
    });
  });

  describe('removeReducer with key type: Literal', function () {
    it('normal', function () {
      var root = (0, _jscodeshift2.default)('({reducers:{"a":1,b:2}})');
      root.find(_jscodeshift2.default.ObjectExpression).at(0).removeReducer('a');
      (0, _expect2.default)(root.toSource()).toEqual('({reducers:{\n  b:2\n}})');
    });
  });
});