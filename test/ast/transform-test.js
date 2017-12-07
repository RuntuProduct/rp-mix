'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _transform = require('../src/transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('transform', function () {

  xit('normal', function () {
    var source = '\n      import React from \'react\';\n      import dva from \'dva\';\n      import { Router } from \'dva/router\';\n\n      const app = dva();\n      app.model({\n        namespace: \'count\',\n        state: 0,\n        reducers: {\n          add(state) { return state + 1; },\n          minus(state) { return state - 1; },\n        },\n        effects: {\n          *addRemote() { yield put({ type: \'add\' }); },\n        },\n        subscriptions: {\n          setup() {\n            dispatch({ type:\'app/showLoading\' });\n            dispatch({ type:\'addRemote\' });\n          },\n        },\n      });\n\n      function Component() {\n        function handleClick() {\n          props.dispatch({ type: \'count/minus\' });\n        }\n        return (<div></div>);\n      }\n\n      const AppPage = connect(state => ({\n        count: state.count,\n      }))(App);\n\n      app.router(({ history }) => {\n        return (\n          <Router history={history}>\n            <Route path="/" component={AppPage} />\n          </Router>\n        );\n      });\n\n      app.start(\'#root\');\n    ';
    var file = { source: source, path: './a/c.js' };
    var api = { jscodeshift: _jscodeshift2.default };

    var result = (0, _transform2.default)(file, api);
    console.log((0, _stringify2.default)(result, null, 2));
  });
});