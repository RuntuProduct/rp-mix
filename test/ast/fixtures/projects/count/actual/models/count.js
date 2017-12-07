'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'count',
  state: 0,
  subscriptions: {
    setup: function setup(_ref) {
      var dispatch = _ref.dispatch;

      dispatch({ type: 'app/showLoading' });
      dispatch({ type: 'addAsync' });
    }
  },
  reducers: {
    add: function add(state) {
      return state + 1;
    }
  },
  effects: {
    addAsync: /*#__PURE__*/_regenerator2.default.mark(function addAsync(_, _ref2) {
      var put = _ref2.put,
          call = _ref2.call,
          select = _ref2.select;
      return _regenerator2.default.wrap(function addAsync$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return put({ type: 'add' });

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, addAsync, this);
    })
  }
};
module.exports = exports['default'];