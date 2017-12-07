'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserList(_ref) {
  var total = _ref.total,
      current = _ref.current,
      loading = _ref.loading,
      dataSource = _ref.dataSource,
      onPageChange = _ref.onPageChange,
      onDeleteItem = _ref.onDeleteItem,
      onEditItem = _ref.onEditItem;

  var columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: function render(text) {
      return _react2.default.createElement(
        'a',
        { href: '#' },
        text
      );
    }
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }, {
    title: '操作',
    key: 'operation',
    render: function render(text, record) {
      return _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          'a',
          { onClick: function onClick() {
              return onEditItem(record);
            } },
          '\u7F16\u8F91'
        ),
        '\xA0',
        _react2.default.createElement(
          _antd.Popconfirm,
          { title: '\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F', onConfirm: function onConfirm() {
              return onDeleteItem(record.id);
            } },
          _react2.default.createElement(
            'a',
            null,
            '\u5220\u9664'
          )
        )
      );
    }
  }];

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_antd.Table, {
      columns: columns,
      dataSource: dataSource,
      loading: loading,
      rowKey: function rowKey(record) {
        return record.id;
      },
      pagination: false
    }),
    _react2.default.createElement(_antd.Pagination, {
      className: 'ant-table-pagination',
      total: total,
      current: current,
      pageSize: 10,
      onChange: onPageChange
    })
  );
}

UserList.propTypes = {
  onPageChange: _react.PropTypes.func,
  onDeleteItem: _react.PropTypes.func,
  onEditItem: _react.PropTypes.func,
  dataSource: _react.PropTypes.array,
  loading: _react.PropTypes.any,
  total: _react.PropTypes.any,
  current: _react.PropTypes.any
};

exports.default = UserList;
module.exports = exports['default'];