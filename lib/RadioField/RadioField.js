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

var _classnames7 = require('classnames');

var _classnames8 = _interopRequireDefault(_classnames7);

var _OptionChecked = require('salt-icon/lib/OptionChecked');

var _OptionChecked2 = _interopRequireDefault(_OptionChecked);

var _FieldRequired = require('salt-icon/lib/FieldRequired');

var _FieldRequired2 = _interopRequireDefault(_FieldRequired);

var _AngleRight = require('salt-icon/lib/AngleRight');

var _AngleRight2 = _interopRequireDefault(_AngleRight);

var _Context = require('../Context');

var _Group = require('../Group');

var _Group2 = _interopRequireDefault(_Group);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * RadioField Component for tingle
                                                                                                                                                                                                                   * @author shanchao
                                                                                                                                                                                                                   * update by ruiyang.dry
                                                                                                                                                                                                                   * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                   */


var renderIcon = function renderIcon(checked, position) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames8.default)((0, _Context.prefixClass)('radio-field-icon-wrapper FBAC FBH'), _defineProperty({}, position, !!position))
    },
    _react2.default.createElement(_OptionChecked2.default, {
      width: 16,
      height: 16,
      className: (0, _classnames8.default)((0, _Context.prefixClass)('radio-field-icon'), {
        'un-checked': !checked
      })
    })
  );
};

var RadioField = function (_React$Component) {
  _inherits(RadioField, _React$Component);

  function RadioField(props) {
    _classCallCheck(this, RadioField);

    var _this = _possibleConstructorReturn(this, (RadioField.__proto__ || Object.getPrototypeOf(RadioField)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  /* eslint-disable no-param-reassign */


  _createClass(RadioField, [{
    key: 'clickAction',
    value: function clickAction(value, item, index, data) {
      var t = this;
      var _t$props = t.props,
          radioArray = _t$props.data,
          onChange = _t$props.onChange;
      var disable = item.disable;

      if (disable) {
        return;
      }
      radioArray.map(function (radioItem) {
        radioItem.checked = false;
        return radioItem;
      });
      item.checked = !item.checked;
      this.hidePopup();
      t.forceUpdate(function () {
        if (onChange) {
          onChange(value, index, data);
        }
      });
    }
  }, {
    key: 'showPopup',
    value: function showPopup() {
      if (this.props.readOnly) {
        return;
      }
      this.setState({ visible: true });
    }
  }, {
    key: 'hidePopup',
    value: function hidePopup() {
      this.setState({ visible: false });
    }
  }, {
    key: 'renderField',
    value: function renderField() {
      var t = this;
      var icon = !t.props.readOnly ? _react2.default.createElement(_AngleRight2.default, {
        className: (0, _Context.prefixClass)('radio-field-arrow-icon'),
        width: 26,
        height: 26,
        onClick: t.showPopup.bind(t)
      }) : null;
      var currentValue = '';
      t.props.data.some(function (item) {
        if (item.checked) {
          currentValue = item;
          return true;
        }
        return false;
      });
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          layout: 'h',
          icon: icon,
          className: (0, _classnames8.default)((0, _Context.prefixClass)('radio-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        _react2.default.createElement(
          'div',
          { onClick: t.showPopup.bind(t) },
          !currentValue ? _react2.default.createElement(
            'div',
            { className: (0, _Context.prefixClass)('omit radio-field-placeholder') },
            t.props.placeholder
          ) : '',
          _react2.default.createElement(
            'div',
            { className: (0, _Context.prefixClass)('radio-field-value FBH FBAC') },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames8.default)((0, _Context.prefixClass)('FB1 omit'), _defineProperty({}, (0, _Context.prefixClass)('radio-field-readonly'), !!t.props.readOnly))
              },
              t.props.formatter(currentValue)
            )
          )
        ),
        _react2.default.createElement(_Popup2.default, {
          content: t.finalJSX,
          visible: t.state.visible,
          animationType: 'slide-up',
          maskClosable: true,
          onMaskClick: t.hidePopup.bind(t)
        })
      );
    }

    /* eslint-enable no-param-reassign */

  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var _t$props2 = t.props,
          rootClassName = _t$props2.rootClassName,
          className = _t$props2.className,
          radioArray = _t$props2.data,
          groupListArgument = _t$props2.groupListArgument,
          groupListFlag = _t$props2.groupListFlag,
          label = _t$props2.label,
          mode = _t$props2.mode;


      var radioArrayComponent = radioArray.map(function (item, index, data) {
        var checked = item.checked,
            disable = item.disable,
            value = item.value;
        /* eslint-disable react/no-array-index-key */

        return _react2.default.createElement(
          'div',
          {
            key: index,
            className: (0, _classnames8.default)((0, _Context.prefixClass)('radio-field-row FBAC FBH'), {
              disable: disable
            }),
            onClick: t.clickAction.bind(t, value, item, index, data)
          },
          t.props.iconPosition === 'left' && renderIcon(checked),
          _react2.default.createElement(
            'div',
            {
              ref: 'content' + index,
              className: (0, _Context.prefixClass)('radio-field-content FB1')
            },
            item.content || item.text
          ),
          t.props.iconPosition === 'right' && renderIcon(checked, 'right'),
          disable && _react2.default.createElement('div', { className: (0, _Context.prefixClass)('radio-field-disable-mask') })
        );
      });

      var requiredTag = _react2.default.createElement(_FieldRequired2.default, {
        className: (0, _Context.prefixClass)('radio-field-label-required'),
        width: 6,
        height: 6,
        fill: 'red'
      });

      this.finalJSX = _react2.default.createElement(
        _Group2.default,
        { className: (0, _classnames8.default)((0, _Context.prefixClass)('radio-field'), _defineProperty({}, rootClassName, !!rootClassName), _defineProperty({}, className, !!className))
        },
        label === '' ? null : _react2.default.createElement(
          _Group2.default.Head,
          { className: (0, _classnames8.default)((0, _Context.prefixClass)('radio-field-label')) },
          label,
          this.props.required && requiredTag
        ),
        _react2.default.createElement(
          _Group2.default.List,
          groupListArgument,
          radioArrayComponent
        )
      );

      if (!groupListFlag) {
        var _classnames6;

        this.finalJSX = _react2.default.createElement(
          'div',
          {
            className: (0, _classnames8.default)((0, _Context.prefixClass)('radio-field'), (_classnames6 = {}, _defineProperty(_classnames6, rootClassName, !!rootClassName), _defineProperty(_classnames6, className, !!className), _classnames6))
          },
          radioArrayComponent
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        mode === 'popup' ? this.renderField() : this.finalJSX
      );
    }
  }]);

  return RadioField;
}(_react2.default.Component);

RadioField.defaultProps = {
  data: [],
  onChange: function onChange() {},

  groupListFlag: true,
  groupListArgument: {
    lineIndent: 0,
    itemIndent: 16
  },
  label: '',
  iconPosition: 'right',
  required: false,
  readOnly: false,
  className: undefined,
  mode: 'default',
  maskClosable: true,
  formatter: function formatter(item) {
    return item.label || item.content.toString();
  },
  onMaskClose: function onMaskClose() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
RadioField.propTypes = {
  className: _propTypes2.default.string,
  data: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  onMaskClose: _propTypes2.default.func,
  readOnly: _propTypes2.default.bool,
  groupListFlag: _propTypes2.default.bool,
  groupListArgument: _propTypes2.default.object,
  iconPosition: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  label: _propTypes2.default.node,
  mode: _propTypes2.default.string,
  maskClosable: _propTypes2.default.bool,
  formatter: _propTypes2.default.func
};

RadioField.displayName = 'RadioField';

exports.default = RadioField;
module.exports = exports['default'];