'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('dva/router');

var _dva = require('dva');

var _MainLayout = require('../components/MainLayout/MainLayout');

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _Users = require('./Users.less');

var _Users2 = _interopRequireDefault(_Users);

var _UserList = require('../components/Users/UserList');

var _UserList2 = _interopRequireDefault(_UserList);

var _UserSearch = require('../components/Users/UserSearch');

var _UserSearch2 = _interopRequireDefault(_UserSearch);

var _UserModal = require('../components/Users/UserModal');

var _UserModal2 = _interopRequireDefault(_UserModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Users(_ref) {
  var location = _ref.location,
      dispatch = _ref.dispatch,
      users = _ref.users;
  var loading = users.loading,
      list = users.list,
      total = users.total,
      current = users.current,
      currentItem = users.currentItem,
      modalVisible = users.modalVisible,
      modalType = users.modalType;
  var _location$query = location.query,
      field = _location$query.field,
      keyword = _location$query.keyword;


  var userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk: function onOk(data) {
      dispatch({
        type: 'users/' + modalType,
        payload: data
      });
    },
    onCancel: function onCancel() {
      dispatch({
        type: 'users/hideModal'
      });
    }
  };

  var userListProps = {
    dataSource: list,
    loading: loading,
    total: total,
    current: current,
    onPageChange: function onPageChange(page) {
      dispatch(_router.routerRedux.push({
        pathname: '/users',
        query: { page: page }
      }));
    },
    onDeleteItem: function onDeleteItem(id) {
      dispatch({
        type: 'users/delete',
        payload: id
      });
    },
    onEditItem: function onEditItem(item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      });
    }
  };

  var userSearchProps = {
    field: field,
    keyword: keyword,
    onSearch: function onSearch(fieldsValue) {
      dispatch({
        type: 'users/query',
        payload: fieldsValue
      });
    },
    onAdd: function onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create'
        }
      });
    }
  };

  // 解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
  var UserModalGen = function UserModalGen() {
    return _react2.default.createElement(_UserModal2.default, userModalProps);
  };

  return _react2.default.createElement(
    _MainLayout2.default,
    { location: location },
    _react2.default.createElement(
      'div',
      { className: _Users2.default.normal },
      _react2.default.createElement(_UserSearch2.default, userSearchProps),
      _react2.default.createElement(_UserList2.default, userListProps),
      _react2.default.createElement(UserModalGen, null)
    )
  );
}

Users.propTypes = {
  users: _react.PropTypes.object,
  location: _react.PropTypes.object,
  dispatch: _react.PropTypes.func
};

function mapStateToProps(_ref2) {
  var users = _ref2.users;

  return { users: users };
}

exports.default = (0, _dva.connect)(mapStateToProps)(Users);
module.exports = exports['default'];