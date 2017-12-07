'use strict';

var _index = require('../../src/api/index');

var _index2 = _interopRequireDefault(_index);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fsExtra = require('fs-extra');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('api/entry', function () {

  var filePath = './tmp/a.js';
  var absFilePath = (0, _path.join)(__dirname, filePath);

  afterEach(function () {
    (0, _fsExtra.removeSync)((0, _path.dirname)(absFilePath));
  });

  it('entry.addModel', function () {
    var source = '\n      import dva from \'dva\';\n      const app = dva();\n      app.model(require(\'./model/app\'));\n      app.router(() => <App />);\n      app.start(\'#root\');\n    ';
    (0, _fsExtra.outputFileSync)(absFilePath, source, 'utf-8');
    (0, _index2.default)('entry.addModel', {
      filePath: filePath,
      sourcePath: __dirname,
      modelPath: './model/count'
    });
    (0, _expect2.default)((0, _fsExtra.readFileSync)(absFilePath, 'utf-8')).toEqual('\n      import dva from \'dva\';\n      const app = dva();\n      app.model(require(\'./model/app\'));\n      app.model(require("./model/count"));\n      app.router(() => <App />);\n      app.start(\'#root\');\n    ');
  });
});