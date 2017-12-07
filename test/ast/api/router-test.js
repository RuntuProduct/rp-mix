'use strict';

var _index = require('../../src/api/index');

var _index2 = _interopRequireDefault(_index);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fsExtra = require('fs-extra');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('api/routeComponents', function () {
  var filePath = './tmp/router.js';
  var absFilePath = (0, _path.join)(__dirname, filePath);

  afterEach(function () {
    (0, _fsExtra.removeSync)((0, _path.dirname)(absFilePath));
  });

  var prepareRouterjs = function prepareRouterjs() {
    (0, _fsExtra.outputFileSync)(absFilePath, 'import React, { PropTypes } from \'react\';\nimport { Router, Route, IndexRoute, Link } from \'dva/router\';\nimport IndexPage from \'./routes/IndexPage\';\nimport UserPage from \'./routes/UserPage\';\nimport UserDetailPage from \'./routes/UserDetailPage\';\n\nexport default function({ history }) {\n  return (\n    <Router history={history}>\n      <Route path="/" component={IndexPage} />\n      <Route path="/users" component={UserPage} >\n        <Route path="user" component={UserDetailPage} />\n      </Route>\n    </Router>\n  );\n};');
  };

  var componentFilePath = './tmp/ccccc/Test.jsx';
  var prepareComponent = function prepareComponent() {
    (0, _index2.default)('routeComponents.create', {
      filePath: componentFilePath,
      sourcePath: __dirname,
      componentName: 'Test'
    });
  };

  it('router.createRoute: without parent', function () {
    prepareRouterjs();
    prepareComponent();

    var result = (0, _index2.default)('router.createRoute', {
      filePath: filePath,
      sourcePath: __dirname,
      path: 'Test',
      component: {
        componentName: 'Test',
        filePath: componentFilePath
      }
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": { "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "Route-/Test", "children": [] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "IndexPage" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Route-/users/user": { "type": "Route", "depth": 2, "attributes": { "path": "user", "component": "UserDetailPage" }, "absolutePath": "/users/user", "id": "Route-/users/user", "children": [] }, "Route-/users": { "type": "Route", "depth": 1, "attributes": { "path": "/users", "component": "UserPage" }, "absolutePath": "/users", "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, "Route-/Test": { "type": "Route", "depth": 1, "attributes": { "path": "Test", "component": "Test" }, "absolutePath": "/Test", "id": "Route-/Test", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": { "history": "history" }, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "Route-/Test", "children": [] }] } }, "filePath": "./tmp/router.js" }, "routeComponents": [], "dispatches": {} });
  });

  it('router.createRoute: with parentId', function () {
    prepareRouterjs();
    prepareComponent();

    var result = (0, _index2.default)('router.createRoute', {
      filePath: filePath,
      sourcePath: __dirname,
      parentId: 'Route-/users',
      path: 'Test',
      component: {
        componentName: 'Test',
        filePath: componentFilePath
      }
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": { "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }, { "id": "Route-/users/Test", "children": [] }] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "IndexPage" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Route-/users/user": { "type": "Route", "depth": 2, "attributes": { "path": "user", "component": "UserDetailPage" }, "absolutePath": "/users/user", "id": "Route-/users/user", "children": [] }, "Route-/users/Test": { "type": "Route", "depth": 2, "attributes": { "path": "Test", "component": "Test" }, "absolutePath": "/users/Test", "id": "Route-/users/Test", "children": [] }, "Route-/users": { "type": "Route", "depth": 1, "attributes": { "path": "/users", "component": "UserPage" }, "absolutePath": "/users", "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }, { "id": "Route-/users/Test", "children": [] }] }, "Router-root": { "type": "Router", "depth": 0, "attributes": { "history": "history" }, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }, { "id": "Route-/users/Test", "children": [] }] }] } }, "filePath": "./tmp/router.js" }, "routeComponents": [], "dispatches": {} });
  });

  it('router.createIndexRoute', function () {
    prepareRouterjs();
    prepareComponent();

    var result = (0, _index2.default)('router.createIndexRoute', {
      filePath: filePath,
      sourcePath: __dirname,
      component: {
        componentName: 'Test',
        filePath: componentFilePath
      }
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": { "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "IndexRoute-parentId_Router-root", "children": [] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "IndexPage" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Route-/users/user": { "type": "Route", "depth": 2, "attributes": { "path": "user", "component": "UserDetailPage" }, "absolutePath": "/users/user", "id": "Route-/users/user", "children": [] }, "Route-/users": { "type": "Route", "depth": 1, "attributes": { "path": "/users", "component": "UserPage" }, "absolutePath": "/users", "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, "IndexRoute-parentId_Router-root": { "type": "IndexRoute", "depth": 1, "attributes": { "component": "Test" }, "id": "IndexRoute-parentId_Router-root", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": { "history": "history" }, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "IndexRoute-parentId_Router-root", "children": [] }] } }, "filePath": "./tmp/router.js" }, "routeComponents": [], "dispatches": {} });
  });

  it('router.createRedirect', function () {
    prepareRouterjs();

    var result = (0, _index2.default)('router.createRedirect', {
      filePath: filePath,
      sourcePath: __dirname,
      from: '/a/b',
      to: '/a/c'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": { "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "Redirect-parentId_Router-root", "children": [] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "IndexPage" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Route-/users/user": { "type": "Route", "depth": 2, "attributes": { "path": "user", "component": "UserDetailPage" }, "absolutePath": "/users/user", "id": "Route-/users/user", "children": [] }, "Route-/users": { "type": "Route", "depth": 1, "attributes": { "path": "/users", "component": "UserPage" }, "absolutePath": "/users", "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, "Redirect-parentId_Router-root": { "type": "Redirect", "depth": 1, "attributes": { "from": "/a/b", "to": "/a/c" }, "id": "Redirect-parentId_Router-root", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": { "history": "history" }, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "Redirect-parentId_Router-root", "children": [] }] } }, "filePath": "./tmp/router.js" }, "routeComponents": [], "dispatches": {} });
  });

  it('router.createIndexRedirect', function () {
    prepareRouterjs();

    var result = (0, _index2.default)('router.createIndexRedirect', {
      filePath: filePath,
      sourcePath: __dirname,
      to: '/a/c'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": { "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "IndexRedirect-parentId_Router-root", "children": [] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "IndexPage" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Route-/users/user": { "type": "Route", "depth": 2, "attributes": { "path": "user", "component": "UserDetailPage" }, "absolutePath": "/users/user", "id": "Route-/users/user", "children": [] }, "Route-/users": { "type": "Route", "depth": 1, "attributes": { "path": "/users", "component": "UserPage" }, "absolutePath": "/users", "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, "IndexRedirect-parentId_Router-root": { "type": "IndexRedirect", "depth": 1, "attributes": { "to": "/a/c" }, "id": "IndexRedirect-parentId_Router-root", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": { "history": "history" }, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }, { "id": "Route-/users", "children": [{ "id": "Route-/users/user", "children": [] }] }, { "id": "IndexRedirect-parentId_Router-root", "children": [] }] } }, "filePath": "./tmp/router.js" }, "routeComponents": [], "dispatches": {} });
  });

  it('router.remove', function () {
    prepareRouterjs();

    var result = (0, _index2.default)('router.remove', {
      filePath: filePath,
      sourcePath: __dirname,
      id: 'Route-/users'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": { "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }] }, "routeByIds": { "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "IndexPage" }, "absolutePath": "/", "id": "Route-/", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": { "history": "history" }, "id": "Router-root", "children": [{ "id": "Route-/", "children": [] }] } }, "filePath": "./tmp/router.js" }, "routeComponents": [], "dispatches": {} });
  });

  it('router.moveTo', function () {
    prepareRouterjs();

    var result = (0, _index2.default)('router.moveTo', {
      filePath: filePath,
      sourcePath: __dirname,
      id: 'Route-/users/user',
      parentId: 'Route-/'
    });
    (0, _expect2.default)(result).toEqual({ "models": { "data": [], "reducerByIds": {}, "effectByIds": {}, "subscriptionByIds": {} }, "router": { "tree": { "id": "Router-root", "children": [{ "id": "Route-/", "children": [{ "id": "Route-//user", "children": [] }] }, { "id": "Route-/users", "children": [] }] }, "routeByIds": { "Route-//user": { "type": "Route", "depth": 2, "attributes": { "path": "user", "component": "UserDetailPage" }, "absolutePath": "//user", "id": "Route-//user", "children": [] }, "Route-/": { "type": "Route", "depth": 1, "attributes": { "path": "/", "component": "IndexPage" }, "absolutePath": "/", "id": "Route-/", "children": [{ "id": "Route-//user", "children": [] }] }, "Route-/users": { "type": "Route", "depth": 1, "attributes": { "path": "/users", "component": "UserPage" }, "absolutePath": "/users", "id": "Route-/users", "children": [] }, "Router-root": { "type": "Router", "depth": 0, "attributes": { "history": "history" }, "id": "Router-root", "children": [{ "id": "Route-/", "children": [{ "id": "Route-//user", "children": [] }] }, { "id": "Route-/users", "children": [] }] } }, "filePath": "./tmp/router.js" }, "routeComponents": [], "dispatches": {} });
  });
});