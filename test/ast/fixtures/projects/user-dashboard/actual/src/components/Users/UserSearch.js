'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _UserSearch = require('./UserSearch.less');

var _UserSearch2 = _interopRequireDefault(_UserSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserSearch(_ref) {
  var form = _ref.form,
      field = _ref.field,
      keyword = _ref.keyword,
      onSearch = _ref.onSearch,
      onAdd = _ref.onAdd;
  var getFieldProps = form.getFieldProps,
      validateFields = form.validateFields,
      getFieldsValue = form.getFieldsValue;


  function handleSubmit(e) {
    e.preventDefault();
    validateFields(function (errors) {
      if (!!errors) {
        return;
      }

      onSearch(getFieldsValue());
    });
  }

  return _react2.default.createElement(
    'div',
    { className: _UserSearch2.default.normal },
    _react2.default.createElement(
      'div',
      { className: _UserSearch2.default.search },
      _react2.default.createElement(
        _antd.Form,
        { inline: true, onSubmit: handleSubmit },
        _react2.default.createElement(
          _antd.Form.Item,
          null,
          _react2.default.createElement(
            _antd.Select,
            getFieldProps('field', { initialValue: field || 'name' }),
            _react2.default.createElement(
              _antd.Select.Option,
              { value: 'name' },
              '\u540D\u5B57'
            ),
            _react2.default.createElement(
              _antd.Select.Option,
              { value: 'address' },
              '\u5730\u5740'
            )
          )
        ),
        _react2.default.createElement(
          _antd.Form.Item,
          {
            hasFeedback: true
          },
          _react2.default.createElement(_antd.Input, getFieldProps('keyword', {
            initialValue: keyword || ''
          }))
        ),
        _react2.default.createElement(
          _antd.Button,
          { style: { marginRight: '10px' }, type: 'primary', htmlType: 'submit' },
          '\u641C\u7D22'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _UserSearch2.default.create },
      _react2.default.createElement(
        _antd.Button,
        { type: 'ghost', onClick: onAdd },
        '\u6DFB\u52A0'
      )
    )
  );
}

UserSearch.propTypes = {
  form: _react.PropTypes.object.isRequired,
  onSearch: _react.PropTypes.func,
  onAdd: _react.PropTypes.func,
  field: _react.PropTypes.string,
  keyword: _react.PropTypes.string
};

exports.default = _antd.Form.create()(UserSearch);
module.exports = exports['default'];