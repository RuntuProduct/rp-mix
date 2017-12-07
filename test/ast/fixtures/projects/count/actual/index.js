'use strict';

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _dva2.default)();
app.model(require('./models/count'));
app.model(require('./models/app'));
app.router(require('./router'));
app.start('#root');