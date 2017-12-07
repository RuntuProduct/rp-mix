'use strict';

require('./index.html');

require('./index.less');

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1. Initialize
var app = (0, _dva2.default)({
  onError: function onError(error) {
    console.error(error.stack);
  }
});

// 2. Model
app.model(require('./models/users'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');