'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _index = require('./util/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Datetime Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author caoke.ck & shumi.lg
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @modify quanyun.mqy 于 2017.9.8 从 tingle-datetime-field 中分拆出来
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2017, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var columnsFlexMap = {
  YMD: [1.24, 1.1, 1.1],
  YMDT: [0.98, 0.83, 0.83, 0.79],
  YMDHm: [1.64, 0.89, 0.89],
  YMDWHm: [1.64, 0.89, 0.89]
};

var Datetime = function (_React$Component) {
  _inherits(Datetime, _React$Component);

  function Datetime(props) {
    _classCallCheck(this, Datetime);

    // 如果二者同时存在，是提示出错
    var _this = _possibleConstructorReturn(this, (Datetime.__proto__ || Object.getPrototypeOf(Datetime)).call(this, props));

    _initialiseProps.call(_this);

    if (props.columns.indexOf('T') !== -1 && props.columns.indexOf('H') !== -1) {
      throw new Error('Please refer to the component document.');
    }
    _this.state = _this.getState(props);
    return _this;
  }

  _createClass(Datetime, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.getState(nextProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;
      var data = state.data,
          value = state.value;

      return _react2.default.createElement(_index.Slot, {
        className: _Context2.default.prefixClass('datetime-field-border-none'),
        ref: props.slotRef,
        columnsFlex: columnsFlexMap[props.columns.join('')],
        title: props.title,
        data: data,
        value: value,
        confirmText: props.confirmText || _index.locale[props.locale].confirmText,
        onChange: this.handleChange,
        onCancel: this.handleCancel,
        onConfirm: this.handleConfirm
      });
    }
  }]);

  return Datetime;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getState = function (props) {
    var columns = props.columns,
        minDate = props.minDate,
        maxDate = props.maxDate;

    var currentValue = (0, _index.parseValue)(props.value);
    var options = (0, _index.getOptions)(props.value, props);
    var ret = _index.Slot.formatDataValue([].concat(options), [].concat(currentValue));
    var data = (0, _index.formatFromProps)((0, _index.formatText)(ret.data, undefined, props), props);
    var value = (0, _index.formatFromProps)((0, _index.formatText)(ret.value, undefined, props), props);
    var columnsStyle = columns[0];
    // disabledDate 仅支持 YMD
    if (props.disabledDate && columnsStyle === 'Y') {
      var disabledArr = props.disabledDate();
      if ((0, _index.isArray)(disabledArr) && disabledArr.length) {
        data = (0, _index.filterDate)({
          data: data,
          disabledArr: disabledArr,
          value: value,
          columns: columns,
          minDate: minDate,
          maxDate: maxDate,
          props: props
        });
        value = _index.Slot.formatDataValue(data, value);
      }
    }
    return {
      data: data,
      value: value
    };
  };

  this.getPlainDate = function (value) {
    var date = [];
    var columns = _this2.props.columns;

    var timeType = 0;
    for (var i = 0; i < columns.length; i += 1) {
      if (columns[i] === 'Y') {
        date[0] = value[i].value;
      } else if (columns[i] === 'M') {
        date[1] = value[i].value;
      } else if (columns[i] === 'D') {
        date[2] = value[i].value;
      } else if (columns[i] === 'H') {
        date[3] = value[i].value;
      } else if (columns[i] === 'm') {
        date[4] = value[i].value;
      } else if (columns[i] === 's') {
        date[5] = value[i].value;
      } else if (columns[i] === 'T') {
        timeType = value[i].value;
      } else if (columns[i] === 'YMD' || columns[i] === 'YMDW') {
        if (value[1].value >= 12) {
          timeType = 1;
        }
        date[0] = ('' + value[i].value).substring(0, 4);
        date[1] = ('' + value[i].value).substring(4, 6) - 1;
        date[2] = ('' + value[i].value).substring(6, 8);
      }
    }
    // 如果需要显示上下午
    if (columns.indexOf('T') !== -1) {
      date[3] = timeType ? 18 : 9;
      date[4] = 0;
      date[5] = 0;
    }
    var passedDate = date.length === 1 ? date.concat([0]) : date;
    return {
      value: new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(passedDate))))().getTime(),
      timeType: timeType ? 'PM' : 'AM'
    };
  };

  this.handleConfirm = function (value) {
    var outputDate = _this2.getPlainDate(value);
    _this2.props.onConfirm(outputDate);
  };

  this.handleCancel = function () {
    _this2.props.onCancel();
  };

  this.handleChange = function (value, columnIndex) {
    var _props = _this2.props,
        columns = _props.columns,
        minDate = _props.minDate,
        maxDate = _props.maxDate,
        disabledDate = _props.disabledDate,
        onChange = _props.onChange;

    var columnsStyle = columns[columnIndex];
    var outputDate = _this2.getPlainDate(value);
    // YMD,YMDT 等模式 更改最后一列时不做处理, Y,YM,YMDHM, YMDWHM 更任意一列都不做处理
    if (columns.length <= 2 || columns[0] !== 'Y' || columns.length === columnIndex + 1) {
      _this2.setState({ value: value });
      onChange(outputDate);
      return;
    }
    var disabledArr = disabledDate ? disabledDate() : [];
    var data = [].concat(_this2.state.data);
    var yearData = data[0];
    var monthData = data[1];
    var yearValue = value[0].value;
    var monthValue = value[1].value;
    // disabledDate 仅支持 YMD、YMDT
    var updateObj = { value: value };
    if ((0, _index.isArray)(disabledArr) && disabledArr.length && columns.length >= 3 && columns[0] === 'Y') {
      var newValue = (0, _index.parseValue)(outputDate.value);
      var options = (0, _index.getOptions)(outputDate.value, _this2.props);
      var ret = _index.Slot.formatDataValue([].concat(options), [].concat(newValue));
      var newData = (0, _index.formatFromProps)((0, _index.formatText)(ret.data, undefined, _this2.props), _this2.props);
      var oldData = {};
      if (columnsStyle === 'Y') {
        oldData.yearData = yearData;
      }
      if (columnsStyle === 'M') {
        oldData.yearData = yearData;
        oldData.monthData = monthData;
      }
      var AllData = (0, _index.filterDate)({
        data: newData,
        disabledArr: disabledArr,
        value: value,
        columns: columns,
        minDate: minDate,
        maxDate: maxDate,
        oldData: oldData,
        props: _this2.props
      });
      updateObj.data = AllData;
    } else if (columnsStyle === 'Y' && monthValue === 1 || columnsStyle === 'M') {
      // 修改年根据年份，当月份是 2 月 动态计算日  或者 修改月份根据年份动态计算日
      var dayArr = (0, _index.getDaysByMonth)({
        minDate: minDate, maxDate: maxDate, year: yearValue, month: monthValue
      });
      // dayArr = formatText(dayArr, undefined, this.props);
      var unit = _index.locale[_this2.props.locale].surfix.D;
      dayArr = dayArr.map(function (item) {
        item.text = (0, _index.addZero)(item.text) + (unit || '');
        return item;
      });
      data[2] = dayArr;
      updateObj.data = data;
    }
    _this2.setState(updateObj);
  };
};

Datetime.defaultProps = {
  className: '',
  locale: 'zh-cn',
  columns: _index.YMD,
  onConfirm: function onConfirm(_) {
    return _;
  },
  onCancel: function onCancel(_) {
    return _;
  },
  onChange: function onChange(_) {
    return _;
  },
  slotRef: function slotRef(_) {
    return _;
  },
  minuteStep: 1,
  minDate: 946656000000,
  maxDate: 1924876800000,
  disabledDate: function disabledDate() {
    return [];
  },
  title: undefined,
  value: undefined,
  confirmText: undefined,
  cancelText: undefined
};

Datetime.propTypes = {
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
  locale: _propTypes2.default.string,
  columns: _propTypes2.default.array,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.object]),
  confirmText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  onConfirm: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  slotRef: _propTypes2.default.func,
  minuteStep: _propTypes2.default.number,
  maxDate: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  minDate: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  disabledDate: _propTypes2.default.func
};

Datetime.Y = _index.Y;
Datetime.YM = _index.YM;
Datetime.YMD = _index.YMD;
Datetime.YMDT = _index.YMDT;
Datetime.YMDHM = _index.YMDHM;
Datetime.YMDWHM = _index.YMDWHM;
Datetime.getSlotFormattedValue = _index.getSlotFormattedValue;
Datetime.displayName = 'Datetime';

exports.default = Datetime;
module.exports = exports['default'];