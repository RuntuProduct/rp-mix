'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _Entry = require('../../src/collections/Entry');

var _Entry2 = _interopRequireDefault(_Entry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register methods.
_Entry2.default.register();

describe('collections/Entry', function () {

  it('findModelInjectPoints', function () {
    (0, _expect2.default)((0, _jscodeshift2.default)('\n      import dva from "dva";const app = dva();app.model("");\n    ').findModelInjectPoints().size()).toEqual(1);
    (0, _expect2.default)((0, _jscodeshift2.default)('\n      import dva from "dva";const a = dva();a.model("");\n    ').findModelInjectPoints().size()).toEqual(1);
    (0, _expect2.default)((0, _jscodeshift2.default)('\n      import dva from "dvax";const a = dva();a.model("");\n    ').findModelInjectPoints().size()).toEqual(0);
    (0, _expect2.default)((0, _jscodeshift2.default)('\n      app.model("");\n    ').findModelInjectPoints().size()).toEqual(0);
  });

  it('addModel', function () {
    var root = (0, _jscodeshift2.default)('\nimport dva from "dva";\nconst app = dva();\napp.model(require("./models/app"));\napp.router();\n    ');
    root.addModel('./models/count');
    (0, _expect2.default)(root.toSource()).toEqual('\nimport dva from "dva";\nconst app = dva();\napp.model(require("./models/app"));\napp.model(require("./models/count"));\napp.router();\n    ');
  });

  it('addModel throw if exists', function () {
    var root = (0, _jscodeshift2.default)('\nimport dva from "dva";\nconst app = dva();\napp.model(require("./models/app"));\napp.router();\n    ');
    (0, _expect2.default)(function () {
      root.addModel('./models/app');
    }).toThrow(/addModel: model .\/models\/app exists/);
  });
});