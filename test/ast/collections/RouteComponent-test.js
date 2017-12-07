'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _RouteComponent = require('../../src/collections/RouteComponent');

var _RouteComponent2 = _interopRequireDefault(_RouteComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register methods.
_RouteComponent2.default.register();

describe('collections/RouteComponent', function () {

  describe('getFirstComponentName', function () {
    it('FunctionDeclaration', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('function A() {}').find(_jscodeshift2.default.FunctionDeclaration).getFirstComponentName()).toEqual('A');
    });
    it('FunctionExpression', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('Form.create(function A() {})').find(_jscodeshift2.default.FunctionExpression).getFirstComponentName()).toEqual('A');
    });
    it('VariableDeclarator 1', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('const A = function() {}').find(_jscodeshift2.default.VariableDeclarator).getFirstComponentName()).toEqual('A');
    });
    it('VariableDeclarator 2', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('const A = () => {}').find(_jscodeshift2.default.VariableDeclarator).getFirstComponentName()).toEqual('A');
    });
    it('ClassDeclaration', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('class A {}').find(_jscodeshift2.default.ClassDeclaration).getFirstComponentName()).toEqual('A');
    });
    it('throw error for anonymous component', function () {
      (0, _expect2.default)(function (_) {
        (0, _jscodeshift2.default)('Form.create(function() {})').find(_jscodeshift2.default.FunctionExpression).getFirstComponentName();
      }).toThrow(/getFirstComponentName: component should not be anonymous/);
    });
    it('throw error for unsupported types', function () {
      (0, _expect2.default)(function (_) {
        (0, _jscodeshift2.default)('const a = 1;').getFirstComponentName();
      }).toThrow(/getFirstComponentName: unsupported node.type/);
    });
  });

  describe('findDispatchCalls', function () {
    it('dispatch', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('dispatch()').findDispatchCalls().size()).toEqual(1);
      (0, _expect2.default)((0, _jscodeshift2.default)('props.dispatch()').findDispatchCalls().size()).toEqual(1);
    });
    it('put', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('function* a() { yield put() }').findDispatchCalls().size()).toEqual(1);
    });
  });

  describe('getActionTypeFromCall', function () {
    it('dispatch', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('dispatch({type:\'a\'})').find(_jscodeshift2.default.CallExpression).getActionTypeFromCall()).toEqual(['a']);
    });
    it('put', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('function* a() { yield put({type:\'a\'}) }').find(_jscodeshift2.default.CallExpression).getActionTypeFromCall()).toEqual(['a']);
    });
    it('multiple dispatch', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('dispatch({type:\'a\'});put({type:\'b\'})').find(_jscodeshift2.default.CallExpression).getActionTypeFromCall()).toEqual(['a', 'b']);
    });
    it('resolve scope identifier (inside)', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('function A() { const a = \'a\'; dispatch({type:a}) }').find(_jscodeshift2.default.CallExpression).getActionTypeFromCall()).toEqual(['a']);
    });
    it('resolve scope identifier (outside)', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('const a = \'a\'; function A() { dispatch({type:a}) }').find(_jscodeshift2.default.CallExpression).getActionTypeFromCall()).toEqual(['a']);
    });
    it('throw error if identifier is unresolved', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('function A() { dispatch({type:a}) }').find(_jscodeshift2.default.CallExpression).getActionTypeFromCall()).toEqual([_RouteComponent.UNRESOLVED_IDENTIFIER]);
    });
  });

  describe('findMapFunction', function () {
    it('FunctionExpression', function () {
      var fns = (0, _jscodeshift2.default)('connect(function(state) { return { c: state.count }; })(App)').find(_jscodeshift2.default.CallExpression).at(1).findMapFunction();
      (0, _expect2.default)((0, _jscodeshift2.default)(fns.get()).toSource()).toEqual('function(state) { return { c: state.count }; }');
    });
    it('ArrowFunctionExpression', function () {
      var fns = (0, _jscodeshift2.default)('connect(state => ({ c: state.count }) )(App)').find(_jscodeshift2.default.CallExpression).at(1).findMapFunction();
      (0, _expect2.default)((0, _jscodeshift2.default)(fns.get()).toSource()).toEqual('state => ({ c: state.count })');
    });
    it('ref VariableDeclaration', function () {
      var fns = (0, _jscodeshift2.default)('const m = function(state) { return { c: state.count }; }; connect(m)(App)').find(_jscodeshift2.default.CallExpression).at(1).findMapFunction();
      (0, _expect2.default)((0, _jscodeshift2.default)(fns.get()).toSource()).toEqual('function(state) { return { c: state.count }; }');
    });
    it('ref VariableDeclaration (ArrowFunctionExpression)', function () {
      var fns = (0, _jscodeshift2.default)('const m = state => ({ c: state.count }); connect(m)(App)').find(_jscodeshift2.default.CallExpression).at(1).findMapFunction();
      (0, _expect2.default)((0, _jscodeshift2.default)(fns.get()).toSource()).toEqual('state => ({ c: state.count })');
    });
    it('ref FunctionDeclaration', function () {
      var fns = (0, _jscodeshift2.default)('function m(state) { return { c: state.count }; } connect(m)(App)').find(_jscodeshift2.default.CallExpression).at(1).findMapFunction();
      (0, _expect2.default)((0, _jscodeshift2.default)(fns.get()).toSource()).toEqual('function m(state) { return { c: state.count }; }');
    });
  });

  describe('getModulesFromMapFunction', function () {
    it('params with Identifier', function () {
      var modules = (0, _jscodeshift2.default)('function A(state) { return { c: state.a, d:state.b.c } }').find(_jscodeshift2.default.FunctionDeclaration).getModulesFromMapFunction();
      (0, _expect2.default)(modules).toEqual(['a', 'b']);
    });
    it('params with ObjectPattern', function () {
      var modules = (0, _jscodeshift2.default)('function A({ a, b }) { }').find(_jscodeshift2.default.FunctionDeclaration).getModulesFromMapFunction();
      (0, _expect2.default)(modules).toEqual(['a', 'b']);
    });
  });
});