'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * CascadeSelectField Component for tingle
                                                                                                                                                                                                                                                                               * @author caoke.ck
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                               * All rights reserved.
                                                                                                                                                                                                                                                                               */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _cloneDeep = require('lodash/fp/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Slot = require('../Slot');

var _Slot2 = _interopRequireDefault(_Slot);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _CascadeTab = require('./CascadeTab');

var _CascadeTab2 = _interopRequireDefault(_CascadeTab);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function parseProps(p) {
  var props = (0, _cloneDeep2.default)(p);
  var options = props.options,
      value = props.value;

  var cursor = options;
  options = [];
  value = value || [];
  var confirmedValue = value.length ? value : [];

  var _loop = function _loop(deep) {
    var index = 0;
    options[deep] = cursor.map(function (o, i) {
      var option = {
        value: o.value,
        text: o.label
      };
      var val = value[deep];
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && 'value' in value[deep]) {
        val = value[deep].value;
      }
      if (o.value === val) {
        index = i;
        value[deep] = option;
      }
      return option;
    });
    cursor = cursor[index] ? cursor[index].children : null;
  };

  for (var deep = 0; cursor; deep += 1) {
    _loop(deep);
  }
  // when its readOnly mode show whatever passed in values
  if (props.readOnly && props.options && props.options.length <= 0) {
    var values = value.map(function (v) {
      return { text: v, value: v };
    });
    return {
      options: [],
      value: values,
      confirmedValue: values,
      originOptions: p.options
    };
  }
  return {
    options: options,
    value: value,
    confirmedValue: confirmedValue,
    originOptions: p.options
  };
}
/* eslint-disable no-param-reassign */
function parseState(value, options) {
  var cursor = options;
  options = [];

  var _loop2 = function _loop2(deep) {
    var index = 0;
    var valueIsFound = false;
    options[deep] = cursor.map(function (o, i) {
      var option = {
        value: o.value,
        text: o.label
      };
      if (deep in value && o.value === value[deep].value) {
        index = i;
        value[deep] = option;
        valueIsFound = true;
      }
      return option;
    });
    if (!valueIsFound) {
      var _options$deep = _slicedToArray(options[deep], 1);

      value[deep] = _options$deep[0];
    }
    cursor = cursor[index] ? cursor[index].children : null;
  };

  for (var deep = 0; cursor; deep += 1) {
    _loop2(deep);
  }
  return {
    options: options,
    value: value
  };
}
/* eslint-enable no-param-reassign */

var CascadeSelectField = function (_React$Component) {
  _inherits(CascadeSelectField, _React$Component);

  function CascadeSelectField(props) {
    _classCallCheck(this, CascadeSelectField);

    var _this = _possibleConstructorReturn(this, (CascadeSelectField.__proto__ || Object.getPrototypeOf(CascadeSelectField)).call(this, props));

    var t = _this;

    // 数据格式化
    t.state = parseProps(props);
    t.state.confirmedValue = props.value ? t.state.value : [];
    t.handleClick = t.handleClick.bind(t);
    t.handleCancel = t.handleCancel.bind(t);
    t.handleChange = t.handleChange.bind(t);
    t.handleConfirm = t.handleConfirm.bind(t);
    return _this;
  }

  // 外部变更选中值


  _createClass(CascadeSelectField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      t.setState(parseProps(nextProps));
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var t = this;
      if (!t.props.readOnly) {
        if (t.props.mode === 'normal') {
          t.slot.show();
        } else if (t.props.mode === 'complex') {
          this.showCascadeTab();
        }
      }
    }
  }, {
    key: 'showCascadeTab',
    value: function showCascadeTab() {
      var t = this;
      _Popup2.default.show(_react2.default.createElement(_CascadeTab2.default, {
        visible: true,
        title: t.props.label,
        confirmText: t.props.confirmText,
        cancelText: t.props.cancelText,
        options: t.state.originOptions,
        value: t.state.value,
        onChange: t.handleChange,
        onCancel: t.handleCancel,
        onConfirm: t.handleConfirm
      }), { maskClosable: false });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      var t = this;
      t.setState(parseState(value, t.props.options));
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm(value) {
      var t = this;
      // 确认选中项目
      t.props.onSelect(value);
      _Popup2.default.hide();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var t = this;
      if (t.state.confirmedValue.length) {
        t.setState(parseState(t.state.confirmedValue, t.props.options));
      }
      _Popup2.default.hide();
      t.props.onCancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          layout: 'h',
          icon: t.props.readOnly ? null : {
            className: _Context2.default.prefixClass('cascade-select-field-icon'),
            name: 'angle-right',
            width: 26,
            height: 26,
            onClick: t.handleClick
          },
          className: (0, _classnames4.default)(_Context2.default.prefixClass('cascade-select-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        _react2.default.createElement(
          'div',
          { onClick: t.handleClick },
          !t.state.confirmedValue.length ? _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('omit cascade-select-field-placeholder') },
            t.props.placeholder
          ) : '',
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('cascade-select-field-value FBH FBAC') },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames4.default)(_Context2.default.prefixClass('FB1 omit'), _defineProperty({}, _Context2.default.prefixClass('cascade-select-field-readonly'), !!t.props.readOnly))
              },
              t.props.formatter(t.state.confirmedValue)
            )
          )
        ),
        this.props.mode === 'normal' ? _react2.default.createElement(_Slot2.default, {
          ref: function ref(c) {
            _this2.slot = c;
          },
          title: t.props.label,
          data: t.state.options,
          value: t.state.value,
          confirmText: _i18n2.default['zh-cn'].confirmText,
          cancelText: _i18n2.default['zh-cn'].cancelText,
          onChange: t.handleChange,
          onCancel: t.handleCancel,
          onConfirm: t.handleConfirm,
          columns: t.props.columns
        }) : null
      );
    }
  }]);

  return CascadeSelectField;
}(_react2.default.Component);

CascadeSelectField.defaultProps = {
  options: [],
  value: [],
  formatter: function formatter(value) {
    return value.map(function (v) {
      return v.text;
    }).join('/');
  },
  onChange: function onChange() {},
  onSelect: function onSelect() {},
  onCancel: function onCancel() {},
  readOnly: false,
  placeholder: '',
  columns: [],
  mode: 'normal',
  className: '',
  confirmText: undefined,
  cancelText: undefined
};

// http://facebook.github.io/react/docs/reusable-components.html
CascadeSelectField.propTypes = {
  className: _propTypes2.default.string,
  label: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.array,
  value: _propTypes2.default.array,
  formatter: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  readOnly: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  confirmText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  columns: _propTypes2.default.array,
  mode: _propTypes2.default.oneOf(['normal', 'complex'])
};

CascadeSelectField.displayName = 'CascadeSelectField';

exports.default = CascadeSelectField;
module.exports = exports['default'];