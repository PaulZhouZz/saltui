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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _CascadeSelectField = require('../CascadeSelectField');

var _CascadeSelectField2 = _interopRequireDefault(_CascadeSelectField);

var _PickerField = require('../PickerField');

var _PickerField2 = _interopRequireDefault(_PickerField);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CitySelectField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingnan.yqn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CitySelectField = function (_Component) {
  _inherits(CitySelectField, _Component);

  function CitySelectField(props) {
    _classCallCheck(this, CitySelectField);

    var _this = _possibleConstructorReturn(this, (CitySelectField.__proto__ || Object.getPrototypeOf(CitySelectField)).call(this, props));

    _this.state = _this.initData(props);
    return _this;
  }

  _createClass(CitySelectField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.initData(nextProps));
    }
  }, {
    key: 'initData',
    value: function initData(props) {
      var data = (0, _utils.clearChildren)(props.districtData, props.selectorType);
      if (props.mode === 'picker') {
        switch (props.selectorType) {
          case 'province':
            break;
          case 'city':
            data = (0, _utils.joinArray)(data.map(function (province) {
              return province.children;
            }));
            break;
          default:
            data = (0, _utils.joinArray)((0, _utils.joinArray)(data.map(function (province) {
              return province.children;
            })).map(function (city) {
              return city.children;
            }));
        }
      }
      return {
        value: props.value || [],
        options: data
      };
    }
  }, {
    key: 'defaultSearchText',
    value: function defaultSearchText() {
      return '\u8BF7\u8F93\u5165' + ({ 'province': '省份', 'city': '城市' }[this.props.selectorType] || '区县') + '\u540D\u79F0\u8FDB\u884C\u641C\u7D22';
    }
  }, {
    key: 'getPickerValue',
    value: function getPickerValue() {
      var arr = this.props.value;
      var len = arr.length;
      if (len) {
        var parent = { children: this.props.districtData || [] };
        var found = !arr.some(function (childValue) {
          if (parent.children) {
            parent = (0, _utils.find)(parent.children, childValue);
            return !parent;
          } else {
            return true;
          }
        });
        if (found) {
          var _parent = parent,
              label = _parent.label,
              value = _parent.value;

          return {
            text: label,
            label: label, value: value
          };
        }
      } else {
        return undefined;
      }
    }
  }, {
    key: 'pickerSelect',
    value: function pickerSelect(item) {
      var tree = (0, _utils.findTree)(this.props.districtData || [], item.value);
      this.props.onSelect.call(null, tree.map(function (node) {
        return node.value;
      }));
    }
  }, {
    key: 'cascadeSelect',
    value: function cascadeSelect(tree) {
      this.props.onSelect.call(null, tree.map(function (node) {
        return node.value;
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = this.props.className;
      var options = this.state.options;

      var fieldClassName = (0, _classnames3.default)((0, _Context.prefixClass)('city-select-field'), _defineProperty({}, className, !!className));
      if (this.props.mode === 'picker') {
        return _react2.default.createElement(_PickerField2.default, _extends({
          grouping: true,
          groupingIndicator: true,
          searchText: this.defaultSearchText()
        }, this.props, {
          className: fieldClassName,
          options: options,
          value: this.getPickerValue(),
          onSelect: this.pickerSelect.bind(this),
          formatter: function formatter(t) {
            return t && t.label;
          } }));
      } else {
        var levels = { 'province': 1, 'city': 2 }[this.props.selectorType] || 3;
        var labels = ['provinceText', 'cityText', 'districtText'].map(function (k) {
          return _this2.props[k];
        }).slice(0, levels);
        return _react2.default.createElement(_CascadeSelectField2.default, _extends({}, this.props, {
          className: fieldClassName,
          options: options,
          mode: this.props.mode === 'slot' ? 'normal' : 'complex',
          onSelect: this.cascadeSelect.bind(this),
          columns: labels }));
      }
    }
  }]);

  return CitySelectField;
}(_react.Component);

CitySelectField.displayName = 'CitySelectField';
CitySelectField.propTypes = {
  className: _propTypes2.default.string,
  label: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  selectorType: _propTypes2.default.string,
  layout: _propTypes2.default.string,
  tip: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  provinceText: _propTypes2.default.string,
  cityText: _propTypes2.default.string,
  districtText: _propTypes2.default.string,
  value: _propTypes2.default.array,
  districtData: _propTypes2.default.array,
  required: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func,
  onCancel: _propTypes2.default.func
};
CitySelectField.defaultProps = {
  className: '',
  label: '省市区',
  placeholder: '请选择',
  tip: '',
  selectorType: 'default', // default | city | province
  provinceText: "省",
  cityText: "市",
  districtText: "区",
  value: [],
  districtData: [],
  required: false,
  readOnly: false,
  onSelect: function onSelect() {},
  onCancel: function onCancel() {}
};
exports.default = CitySelectField;
module.exports = exports['default'];