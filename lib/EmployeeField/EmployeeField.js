'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _remove = require('lodash/remove');

var _remove2 = _interopRequireDefault(_remove);

var _PlusCircle = require('salt-icon/lib/PlusCircle');

var _PlusCircle2 = _interopRequireDefault(_PlusCircle);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _EmployeeList = require('./EmployeeList');

var _EmployeeList2 = _interopRequireDefault(_EmployeeList);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * EmployeeField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isDd = function isDd() {
  if (typeof window !== 'undefined') {
    return window.dd;
  }
  return false;
};

var EmployeeField = function (_React$Component) {
  _inherits(EmployeeField, _React$Component);

  function EmployeeField() {
    _classCallCheck(this, EmployeeField);

    return _possibleConstructorReturn(this, (EmployeeField.__proto__ || Object.getPrototypeOf(EmployeeField)).apply(this, arguments));
  }

  _createClass(EmployeeField, [{
    key: 'onPickHandler',
    value: function onPickHandler() {
      var _this2 = this;

      if (this.getReadOnly()) {
        return;
      }
      var i18n = _locale2.default[this.props.locale];
      var option = {
        responseUserOnly:true,
        multiple: this.props.multiple,
        max: this.props.max,
        isNeedSearch: this.props.isNeedSearch,
        startWithDepartmentId: this.props.startWithDepartmentId, //  SELF TOP
        users: this.props.value.map(function (v) {
          return v.key;
        }),
        disabledUsers: this.props.disabledUsers,
        pickedUsers: this.props.value.map(function (v) {
            return v.key;
        }),
      };
      var Ali = window.Ali || {};
      if (Ali.contacts) {
        if (Ali.isDingDing) {
          if (!this.props.corpId) {
            Ali.alert({
              message: i18n.corpIdRequired,
              okButton: i18n.ok
            });
            return;
          }
          option.corpId = this.props.corpId;
          Ali.contacts.get(option, function (result) {
            if (result && !result.errorCode) {
              _this2.props.onChange((0, _utils.transToValue)(result.results));
            } else {
              Ali.alert({
                message: result.errorMessage,
                okButton: i18n.ok
              });
            }
          });
        }
      } else if (window.dd) {
        // fall back to dd api
        var t = this;
        window.dd.biz.contact.complexPicker(_extends({}, option, {
          onSuccess: function onSuccess(results) {
            /* eslint-disable no-param-reassign */
            for (var i = 0; i < results.users.length; i++) {
              results.users[i].phoneNumber = results.users[i].mobilePhone;
              var result = {
                results: results
              };
              t.props.onChange((0, _utils.transToValue)(result.results.users));

            }
            /* eslint-enable no-param-reassign */
          },
          onFail: function onFail(err) {
            window.dd.device.notification.alert({
              message: err.message,
              buttonName: i18n.ok
            });
          }
        }));
      }
    }
  }, {
    key: 'onItemDel',
    value: function onItemDel(key) {
      var list = (0, _cloneDeep2.default)(this.props.value);
      (0, _remove2.default)(list, function (item) {
        return item.key === key;
      });
      this.props.onChange(list);
    }
  }, {
    key: 'getTotalText',
    value: function getTotalText() {
      var i18n = _locale2.default[this.props.locale];
      return i18n.getTotalText(this.props.value.length);
    }
  }, {
    key: 'getReadOnly',
    value: function getReadOnly() {
      if (typeof window !== 'undefined') {
        if (!window.Ali && !window.dd) {
          return true;
        } else if (window.Ali && !window.Ali.isDingDing) {
          return true;
        }
      }
      return this.props.readOnly;
    }
  }, {
    key: 'renderEmployeeList',
    value: function renderEmployeeList() {
      var _this3 = this;

      return _react2.default.createElement(_EmployeeList2.default, {
        readOnly: this.getReadOnly(),
        list: this.props.value,
        onDel: function onDel(id) {
          _this3.onItemDel(id);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var iconProps = {
        className: (0, _classnames3.default)(_Context2.default.prefixClass('employee-field-icon'), {
          active: !t.getReadOnly()
        }),
        // name: 'plus-circle',
        width: 20,
        height: 20,
        onClick: function onClick(e) {
          t.onPickHandler(e);
        }
      };

      var icon = !t.getReadOnly() ? _react2.default.createElement(_PlusCircle2.default, iconProps) : null;

      var _t$props = t.props,
          className = _t$props.className,
          tip = _t$props.tip,
          otherProps = _objectWithoutProperties(_t$props, ['className', 'tip']);

      delete otherProps.layout;
      var i18n = _locale2.default[this.props.locale];

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('employee-field'), _defineProperty({}, className, !!className))
        },
        _react2.default.createElement(
          _Field2.default,
          _extends({}, otherProps, { icon: icon, tip: _react2.default.createElement(
              'div',
              null,
              isDd() ? '' : i18n.onlyForDd,
              tip
            ) }),
          _react2.default.createElement(
            'div',
            { onClick: function onClick(e) {
                t.onPickHandler(e);
              } },
            !t.props.value.length ? _react2.default.createElement(
              'div',
              { className: _Context2.default.prefixClass('omit employee-field-placeholder') },
              t.props.placeholder
            ) : _react2.default.createElement(
              'div',
              { className: _Context2.default.prefixClass('omit employee-field-num') },
              t.getTotalText()
            )
          )
        ),
        t.renderEmployeeList()
      );
    }
  }]);

  return EmployeeField;
}(_react2.default.Component);

EmployeeField.propTypes = {
  className: _propTypes2.default.string,
  corpId: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  multiple: _propTypes2.default.bool,
  max: _propTypes2.default.number,
  isNeedSearch: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  startWithDepartmentId: _propTypes2.default.number,
  readOnly: _propTypes2.default.bool,
  value: _propTypes2.default.array,
  disabledUsers: _propTypes2.default.array,
  onChange: _propTypes2.default.func
};
EmployeeField.defaultProps = {
  placeholder: '',
  multiple: true,
  max: 100,
  isNeedSearch: true,
  locale: 'zh-cn',
  startWithDepartmentId: -1,
  readOnly: false,
  value: [],
  disabledUsers: [],
  onChange: function onChange() {},
  className: undefined,
  corpId: undefined
};
EmployeeField.displayName = 'EmployeeField';
exports.default = EmployeeField;
module.exports = exports['default'];