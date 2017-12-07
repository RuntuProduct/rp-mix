'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _antd.Form.Item;

var formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

function UserModal(_ref) {
  var visible = _ref.visible,
      form = _ref.form,
      _ref$item = _ref.item,
      item = _ref$item === undefined ? {} : _ref$item,
      onOk = _ref.onOk,
      onCancel = _ref.onCancel;
  var getFieldProps = form.getFieldProps;


  function handleOk() {
    form.validateFields(function (errors) {
      if (errors) {
        return;
      }

      var data = (0, _extends3.default)({}, form.getFieldsValue(), { key: item.key });

      onOk(data);
    });
  }

  function checkNumber(rule, value, callback) {
    if (!/^[\d]{1,2}$/.test(value)) {
      callback(new Error('年龄不合法'));
    } else {
      callback();
    }
  }

  function getFieldPropsBy(key, message, validator) {
    var rules = [{
      required: true,
      message: message,
      validator: validator
    }];
    return getFieldProps(key, { rules: rules, initialValue: item[key] || '' });
  }

  var modalOpts = {
    title: '修改用户',
    visible: visible,
    onOk: handleOk,
    onCancel: onCancel
  };

  return _react2.default.createElement(
    _antd.Modal,
    modalOpts,
    _react2.default.createElement(
      _antd.Form,
      { horizontal: true },
      _react2.default.createElement(
        FormItem,
        (0, _extends3.default)({
          label: '\u59D3\u540D\uFF1A',
          hasFeedback: true
        }, formItemLayout),
        _react2.default.createElement(_antd.Input, getFieldPropsBy('name', '不能为空'))
      ),
      _react2.default.createElement(
        FormItem,
        (0, _extends3.default)({
          label: '\u5E74\u9F84\uFF1A',
          hasFeedback: true
        }, formItemLayout),
        _react2.default.createElement(_antd.Input, (0, _extends3.default)({ type: 'age' }, getFieldPropsBy('age', '年龄不合法', checkNumber)))
      ),
      _react2.default.createElement(
        FormItem,
        (0, _extends3.default)({
          label: '\u4F4F\u5740\uFF1A',
          hasFeedback: true
        }, formItemLayout),
        _react2.default.createElement(_antd.Input, (0, _extends3.default)({ type: 'address' }, getFieldPropsBy('address', '不能为空')))
      )
    )
  );
}

UserModal.propTypes = {
  visible: _react.PropTypes.any,
  form: _react.PropTypes.object,
  item: _react.PropTypes.object,
  onOk: _react.PropTypes.func,
  onCancel: _react.PropTypes.func
};

exports.default = _antd.Form.create()(UserModal);
module.exports = exports['default'];