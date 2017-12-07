'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _router = require('dva/router');

var _antd = require('antd');

var _users = require('../services/users');

var _qs = require('qs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  namespace: 'users',

  state: {
    list: [],
    loading: false,
    total: null,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },

  subscriptions: {
    setup: function setup(_ref) {
      var dispatch = _ref.dispatch,
          history = _ref.history;

      history.listen(function (location) {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    }
  },

  effects: {
    query: /*#__PURE__*/_regenerator2.default.mark(function query(_ref2, _ref3) {
      var payload = _ref2.payload;
      var select = _ref3.select,
          call = _ref3.call,
          put = _ref3.put;

      var _ref4, data;

      return _regenerator2.default.wrap(function query$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return put({ type: 'showLoading' });

            case 2:
              _context.next = 4;
              return call(_users.query, (0, _qs.parse)(payload));

            case 4:
              _ref4 = _context.sent;
              data = _ref4.data;

              if (!data) {
                _context.next = 9;
                break;
              }

              _context.next = 9;
              return put({
                type: 'querySuccess',
                payload: {
                  list: data.data,
                  total: data.page.total,
                  current: data.page.current
                }
              });

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, query, this);
    }),
    'delete': /*#__PURE__*/_regenerator2.default.mark(function _delete(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;

      var _ref7, data;

      return _regenerator2.default.wrap(function _delete$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return put({ type: 'showLoading' });

            case 2:
              _context2.next = 4;
              return call(_users.remove, { id: payload });

            case 4:
              _ref7 = _context2.sent;
              data = _ref7.data;

              if (!(data && data.success)) {
                _context2.next = 9;
                break;
              }

              _context2.next = 9;
              return put({
                type: 'deleteSuccess',
                payload: payload
              });

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _delete, this);
    }),
    create: /*#__PURE__*/_regenerator2.default.mark(function create(_ref8, _ref9) {
      var payload = _ref8.payload;
      var call = _ref9.call,
          put = _ref9.put;

      var _ref10, data;

      return _regenerator2.default.wrap(function create$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return put({ type: 'hideModal' });

            case 2:
              _context3.next = 4;
              return put({ type: 'showLoading' });

            case 4:
              _context3.next = 6;
              return call(_users.create, payload);

            case 6:
              _ref10 = _context3.sent;
              data = _ref10.data;

              if (!(data && data.success)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return put({
                type: 'createSuccess',
                payload: payload
              });

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, create, this);
    }),
    update: /*#__PURE__*/_regenerator2.default.mark(function update(_ref11, _ref12) {
      var payload = _ref11.payload;
      var select = _ref12.select,
          call = _ref12.call,
          put = _ref12.put;

      var id, newUser, _ref14, data;

      return _regenerator2.default.wrap(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return put({ type: 'hideModal' });

            case 2:
              _context4.next = 4;
              return put({ type: 'showLoading' });

            case 4:
              _context4.next = 6;
              return select(function (_ref13) {
                var users = _ref13.users;
                return users.currentItem.id;
              });

            case 6:
              id = _context4.sent;
              newUser = (0, _extends3.default)({}, payload, { id: id });
              _context4.next = 10;
              return call(_users.update, newUser);

            case 10:
              _ref14 = _context4.sent;
              data = _ref14.data;

              if (!(data && data.success)) {
                _context4.next = 15;
                break;
              }

              _context4.next = 15;
              return put({
                type: 'updateSuccess',
                payload: newUser
              });

            case 15:
            case 'end':
              return _context4.stop();
          }
        }
      }, update, this);
    })
  },

  reducers: {
    showLoading: function showLoading(state) {
      return (0, _extends3.default)({}, state, { loading: true });
    },
    createSuccess: function createSuccess(state, action) {
      var newUser = action.payload;
      return (0, _extends3.default)({}, state, { list: [newUser].concat((0, _toConsumableArray3.default)(state.list)), loading: false });
    },
    deleteSuccess: function deleteSuccess(state, action) {
      var id = action.payload;
      var newList = state.list.filter(function (user) {
        return user.id !== id;
      });
      return (0, _extends3.default)({}, state, { list: newList, loading: false });
    },
    updateSuccess: function updateSuccess(state, action) {
      var updateUser = action.payload;
      var newList = state.list.map(function (user) {
        if (user.id === updateUser.id) {
          return (0, _extends3.default)({}, user, updateUser);
        }
        return user;
      });
      return (0, _extends3.default)({}, state, { list: newList, loading: false });
    },
    querySuccess: function querySuccess(state, action) {
      return (0, _extends3.default)({}, state, action.payload, { loading: false });
    },
    showModal: function showModal(state, action) {
      return (0, _extends3.default)({}, state, action.payload, { modalVisible: true });
    },
    hideModal: function hideModal(state) {
      return (0, _extends3.default)({}, state, { modalVisible: false });
    }
  }

};
module.exports = exports['default'];