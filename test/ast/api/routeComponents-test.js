'use strict';

var _index = require('../../src/api/index');

var _index2 = _interopRequireDefault(_index);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fsExtra = require('fs-extra');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('api/routeComponents', function () {
  var filePath = './tmp/IndexPage.jsx';
  var absFilePath = (0, _path.join)(__dirname, filePath);

  afterEach(function () {
    (0, _fsExtra.removeSync)((0, _path.dirname)(absFilePath));
  });

  it('routeComponents.create', function () {
    var result = (0, _index2.default)('routeComponents.create', {
      filePath: filePath,
      sourcePath: __dirname,
      componentName: 'IndexPage'
    });
    (0, _expect2.default)(result).toEqual({
      "models": {
        "data": [],
        "reducerByIds": {},
        "effectByIds": {},
        "subscriptionByIds": {}
      },
      "router": null,
      "routeComponents": [{
        "dispatches": [],
        "filePath": "./tmp/IndexPage.jsx",
        "id": "RouteComponent^^./tmp/IndexPage.jsx^^IndexPage",
        "name": "IndexPage",
        "source": "import React from 'react';\nimport { connect } from 'dva';\n\nfunction IndexPage() {\n  return (\n    <div>\n      Route Component: IndexPage\n    </div>\n  );\n}\n\nfunction mapStateToProps() {\n  return {};\n}\n\nexport default connect(mapStateToProps)(IndexPage);\n",
        "stateMappings": []
      }],
      "dispatches": {}
    });
  });

  /*
  it('routeComponents.remove', () => {
    outputFileSync(absFilePath, '', 'utf-8');
      const result = api('routeComponents.remove', {
      filePath: filePath,
      sourcePath: __dirname,
    });
      expect({}).toEqual({});
  });
  */

  it('routeComponents.update', function () {
    var result = (0, _index2.default)('routeComponents.update', {
      filePath: filePath,
      sourcePath: __dirname,
      "source": "import React, { Component } from 'react';\n\nexport default class IndexPage extends Component {\n  render() {\n    return (\n      <div><h1>Hello World!</h1></div>\n    );\n  }\n}\n"
    });
    (0, _expect2.default)(result).toEqual({
      "models": {
        "data": [],
        "reducerByIds": {},
        "effectByIds": {},
        "subscriptionByIds": {}
      },
      "router": null,
      "routeComponents": [{
        "dispatches": [],
        "filePath": "./tmp/IndexPage.jsx",
        "id": "RouteComponent^^./tmp/IndexPage.jsx^^IndexPage",
        "name": "IndexPage",
        "source": "import React, { Component } from 'react';\n\nexport default class IndexPage extends Component {\n  render() {\n    return (\n      <div><h1>Hello World!</h1></div>\n    );\n  }\n}\n",
        "stateMappings": []
      }],
      "dispatches": {}
    });
  });

  it('routeComponents.addDispatch for Class Component', function () {
    (0, _index2.default)('routeComponents.create', {
      filePath: filePath,
      sourcePath: __dirname,
      componentName: 'IndexPage'
    });

    var result = (0, _index2.default)('routeComponents.addDispatch', {
      filePath: filePath,
      sourcePath: __dirname,
      actionType: 'app/initilize'
    });

    (0, _expect2.default)(result).toEqual({ dispatches: { 'app/initilize': { input: ['RouteComponent^^./tmp/IndexPage.jsx^^IndexPage'], output: [] } }, models: { data: [], effectByIds: {}, reducerByIds: {}, subscriptionByIds: {} }, routeComponents: [{ dispatches: ['app/initilize'], filePath: './tmp/IndexPage.jsx', id: 'RouteComponent^^./tmp/IndexPage.jsx^^IndexPage', name: 'IndexPage', source: "import React from 'react';\nimport { connect } from 'dva';\n\nfunction IndexPage() {\n  return <div><button onClick={() => { props.dispatch({ type: 'app/initilize', payload: {} }); }}>click to dispatch app/initilize</button>Route Component: IndexPage</div>;\n}\n\nfunction mapStateToProps() {\n  return {};\n}\n\nexport default connect(mapStateToProps)(IndexPage);\n", stateMappings: [] }], router: null });
  });

  it('routeComponents.addDispatch for Pure Function', function () {
    (0, _index2.default)('routeComponents.update', {
      filePath: filePath,
      sourcePath: __dirname,
      "source": '\nimport React, { PropTypes } from \'react\'\n\nfunction Hello(props) {\n  return (\n    <div>Helloxxxx</div>\n  )\n}\n\nexport default Hello;\n'
    });

    var result = (0, _index2.default)('routeComponents.addDispatch', {
      filePath: filePath,
      sourcePath: __dirname,
      actionType: 'app/initilize'
    });

    (0, _expect2.default)(result).toEqual({ dispatches: { 'app/initilize': { input: ['RouteComponent^^./tmp/IndexPage.jsx^^Hello'], output: [] } }, models: { data: [], effectByIds: {}, reducerByIds: {}, subscriptionByIds: {} }, routeComponents: [{ dispatches: ['app/initilize'], filePath: './tmp/IndexPage.jsx', id: 'RouteComponent^^./tmp/IndexPage.jsx^^Hello', name: 'Hello', source: "\nimport React, { PropTypes } from 'react'\n\nfunction Hello(props) {\n  return <div><button onClick={() => { props.dispatch({ type: 'app/initilize', payload: {} }); }}>click to dispatch app/initilize</button>Helloxxxx</div>;\n}\n\nexport default Hello;\n", stateMappings: [] }], router: null });
  });
});