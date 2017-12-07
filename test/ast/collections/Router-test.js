'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _Router = require('../../src/collections/Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register methods.
_Router2.default.register();

describe('collections/Router', function () {

  describe('getRouterInfo', function () {
    it('simple', function () {
      var code = '<Router><Route path="/" component={App} /></Router>';
      var tree = (0, _jscodeshift2.default)(code).find(_jscodeshift2.default.JSXElement).at(0).getRouterInfo();
      (0, _expect2.default)(tree).toEqual([{ "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "App" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": {}, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }] } } }]);
    });
    it('complex', function () {
      var code = '\n        <Router>\n          <Route path="/" component={Home} />\n          <Route path="/users">\n            <Route path="list" component={UserList} />\n            <Route path="edit" component={UserEdit} />\n          </Route>\n          <Route path="*" component={NotFoundPage} />\n        </Router>';
      var tree = (0, _jscodeshift2.default)(code).find(_jscodeshift2.default.JSXElement).at(0).getRouterInfo();
      (0, _expect2.default)(tree).toEqual([{ "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/list", "children": [] }, { "id": "Route-/users/edit", "children": [] }] }, { "id": "Route-/*", "children": [] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "Home" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Route-/users/list": { "type": "Route", "depth": 2, "attributes": { "path": "list", "component": "UserList" }, "absolutePath": "/users/list", "id": "Route-/users/list", "children": [] }, "Route-/users/edit": { "type": "Route", "depth": 2, "attributes": { "path": "edit", "component": "UserEdit" }, "absolutePath": "/users/edit", "id": "Route-/users/edit", "children": [] }, "Route-/users": { "type": "Route", "depth": 1, "attributes": { "path": "/users" }, "absolutePath": "/users", "id": "Route-/users", "children": [{ "id": "Route-/users/list", "children": [] }, { "id": "Route-/users/edit", "children": [] }] }, "Route-/*": { "type": "Route", "depth": 1, "attributes": { "path": "*", "component": "NotFoundPage" }, "absolutePath": "/*", "id": "Route-/*", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": {}, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/list", "children": [] }, { "id": "Route-/users/edit", "children": [] }] }, { "id": "Route-/*", "children": [] }] } } }]);
    });
  });

  describe('findRouters', function () {
    it('import and Router', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('import a from \'dva/router\'; (<Router />)').findRouters().size()).toEqual(1);
    });
    it('require and Router', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('const a = require(\'dva/router\'); (<Router />)').findRouters().size()).toEqual(1);
    });
    it('Router', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('(<Router />)').findRouters().size()).toEqual(0);
    });
    it('import wrong', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('import a from \'dva/xrouter\'; (<Router />)').findRouters().size()).toEqual(0);
    });
    it('no Router', function () {
      (0, _expect2.default)((0, _jscodeshift2.default)('import a from \'dva/router\'; (<Route />)').findRouters().size()).toEqual(0);
    });
  });
});