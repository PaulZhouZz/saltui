'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _Context = require('../../Context');

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

var _formatter = require('../formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Calendar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function renderEmptyDay(idx) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)((0, _Context.prefixClass)('FB1 FBH FBAC FBJC tap'), 'day-cell'),
      key: idx
    },
    _react2.default.createElement('span', { className: 'day-cell-inner' })
  );
}

var MonthBody = function (_React$Component) {
  _inherits(MonthBody, _React$Component);

  function MonthBody() {
    _classCallCheck(this, MonthBody);

    return _possibleConstructorReturn(this, (MonthBody.__proto__ || Object.getPrototypeOf(MonthBody)).apply(this, arguments));
  }

  _createClass(MonthBody, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.locale = _locale2.default[this.props.locale];
    }
  }, {
    key: 'isDisabledDate',
    value: function isDisabledDate(day) {
      var t = this;
      if (day && typeof t.props.disabledDate === 'function') {
        return t.props.disabledDate(day, t.props.value);
      }
      return false;
    }
  }, {
    key: 'renderTodayLabel',
    value: function renderTodayLabel() {
      return _react2.default.createElement(
        'span',
        { className: 'day-label today-label' },
        this.locale.today
      );
    }

    // 渲染右上角的徽标text

  }, {
    key: 'renderDayBadge',
    value: function renderDayBadge(day) {
      var t = this;
      var func = t.props.renderDayBadge;
      if (typeof func === 'function') {
        var badge = func(day, t.props.value);
        if (badge) {
          return _react2.default.createElement(
            'span',
            { className: 'badge-label' },
            badge
          );
        }
        return null;
      }
      return null;
    }

    // 渲染用户定制的日期文案，比如端午节、日程等

  }, {
    key: 'renderCustomDayLabel',
    value: function renderCustomDayLabel(day) {
      var t = this;
      var func = t.props.renderCustomDayLabel;
      if (typeof func === 'function') {
        var custom = func(day, t.props.value);
        if (custom) {
          return _react2.default.createElement(
            'span',
            { className: 'day-label custom-label' },
            custom
          );
        }
        return null;
      }
      return null;
    }
  }, {
    key: 'renderSingModeDay',
    value: function renderSingModeDay(day, idx) {
      var t = this;
      var today = _util2.default.isSameDay(day, Date.now());
      var value = t.props.value;

      if (!_util2.default.isNil(t.props.value) && _typeof(t.props.value) === 'object') {
        value = t.props.value.startDate || t.props.value.endDate;
        if (t.props.value.value) {
          value = t.props.value.value;
        }
      }
      var selected = _util2.default.isSameDay(day, value);
      var disabled = t.isDisabledDate(day);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)((0, _Context.prefixClass)('FB1 FBH FBAC FBJC tap'), 'day-cell'),
          key: idx,
          onClick: function onClick(e) {
            if (!disabled) {
              t.props.onSelected(day, e);
            }
          }
        },
        _react2.default.createElement(
          'span',
          {
            className: (0, _classnames2.default)('day-cell-inner', {
              today: today,
              selected: selected,
              disabled: disabled
            })
          },
          (0, _formatter2.default)(day, 'DD')
        ),
        today && t.renderTodayLabel(),
        t.renderDayBadge(day),
        t.renderCustomDayLabel(day)
      );
    }
  }, {
    key: 'renderCascadeModeDay',
    value: function renderCascadeModeDay(day, idx) {
      var t = this;
      var today = _util2.default.isSameDay(day, Date.now());
      var selected = false;
      var value = t.props.value;

      selected = _util2.default.isInRange(value.startDate, value.endDate, day);
      var disabled = t.isDisabledDate(day);
      if (!selected) {
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)((0, _Context.prefixClass)('FB1 FBH FBAC FBJC tap'), 'day-cell'),
            key: idx,
            onClick: function onClick(e) {
              if (!disabled) {
                t.props.onSelected(day, e);
              }
            }
          },
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('day-cell-inner', {
                today: today,
                selected: selected,
                disabled: disabled
              })
            },
            (0, _formatter2.default)(day, 'DD')
          ),
          today && t.renderTodayLabel(),
          t.renderDayBadge(day),
          t.renderCustomDayLabel(day)
        );
      }
      var isStartDate = _util2.default.isSameDay(value.startDate, day);
      var isEndDate = _util2.default.isSameDay(value.endDate, day);
      var isPM = false;
      if (isStartDate && value.startDateType === _const.halfDayType.PM) {
        isPM = true;
      } else if (isEndDate && value.endDateType === _const.halfDayType.PM) {
        isPM = true;
      }
      var isAM = false;
      if (isStartDate && value.startDateType === _const.halfDayType.AM) {
        isAM = true;
      } else if (isEndDate && value.endDateType === _const.halfDayType.AM) {
        isAM = true;
      }
      var isFull = !(isAM || isPM);
      var isWeekFirstDay = idx === 0;
      var isWeekLastDay = idx === 6;
      var isMonthFirstDay = _util2.default.isSameDay(t.props.days[0], day);
      var isMonthLastDay = _util2.default.isSameDay(t.props.days[t.props.days.length - 1], day);
      // 非起、止，非周始、周尾
      var isInRange = selected && !(isStartDate || isEndDate || isWeekFirstDay || isWeekLastDay || isMonthFirstDay || isMonthLastDay);
      // 是否应该出现"色块垫子"
      var shouldHaveBackBlock = selected && !(isStartDate && isEndDate) && ( // 非同时是起、止
      // 有起、有止
      isStartDate && !_util2.default.isNil(value.endDate) || isEndDate && !_util2.default.isNil(value.startDate) || !(isStartDate || isEndDate)) && !(isWeekFirstDay && (isMonthFirstDay && isEndDate || isMonthLastDay || !isMonthFirstDay && !isMonthFirstDay && isEndDate) || isWeekLastDay && (isMonthFirstDay || isMonthLastDay && isStartDate || !isMonthFirstDay && !isMonthLastDay && isStartDate) || !isWeekFirstDay && !isWeekLastDay && (isMonthFirstDay && isEndDate || isMonthLastDay && isStartDate || !isMonthFirstDay && !isMonthLastDay && !isStartDate && !isEndDate));
      var placeLeft = isEndDate || !isEndDate && (isWeekLastDay || isMonthLastDay);
      var placeRight = isStartDate || !isEndDate && (isWeekFirstDay || isMonthFirstDay);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)((0, _Context.prefixClass)('FB1 FBH FBAC FBJC tap'), 'day-cell'),
          key: idx,
          onClick: function onClick(e) {
            if (!disabled) {
              t.props.onSelected(day, e);
            }
          }
        },
        shouldHaveBackBlock && _react2.default.createElement('div', {
          className: (0, _classnames2.default)('back-block', {
            left: placeLeft,
            right: placeRight
          })
        }),
        _react2.default.createElement(
          'span',
          {
            className: (0, _classnames2.default)('day-cell-inner', {
              today: today,
              selected: selected,
              disabled: disabled,
              'in-range': isInRange,
              'start-date': isStartDate,
              'end-date': isEndDate,
              'week-first-day': isWeekFirstDay,
              'week-last-day': isWeekLastDay,
              'month-first-day': isMonthFirstDay,
              'month-last-day': isMonthLastDay,
              'half-day': t.props.showHalfDay && (isAM || isPM)
            })
          },
          (0, _formatter2.default)(day, 'DD')
        ),
        today && !(isStartDate || isEndDate) && t.renderTodayLabel(),
        isStartDate && !isEndDate && _react2.default.createElement(
          'span',
          { className: 'day-label start-label' },
          t.locale.duration.start
        ),
        isEndDate && !isStartDate && _react2.default.createElement(
          'span',
          { className: 'day-label end-label' },
          t.locale.duration.end
        ),
        t.props.showHalfDay && isAM && _react2.default.createElement(
          'span',
          { className: 'day-label am-label' },
          t.locale.dayTipMap.AM
        ),
        t.props.showHalfDay && isPM && _react2.default.createElement(
          'span',
          { className: 'day-label pm-label' },
          t.locale.dayTipMap.PM
        ),
        t.props.showHalfDay && isFull && (isStartDate || isEndDate) && _react2.default.createElement(
          'span',
          { className: 'day-label full-label' },
          t.locale.dayTipMap.FULL
        ),
        t.renderDayBadge(day),
        t.renderCustomDayLabel(day)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var weeks = (0, _util.makeWeeks)(t.props.days);
      /* eslint-disable react/no-array-index-key */
      return _react2.default.createElement(
        'div',
        { className: (0, _Context.prefixClass)('day-calendar-month-body FBV') },
        weeks.map(function (week, index) {
          return _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)((0, _Context.prefixClass)('FBH FBAC'), 'week-block'), key: index },
            week.map(function (day, idx) {
              if (!day) {
                return renderEmptyDay(idx);
              }
              if (t.props.singleMode) {
                return t.renderSingModeDay(day, idx);
              }
              return t.renderCascadeModeDay(day, idx);
            })
          );
        })
      );
    }
  }]);

  return MonthBody;
}(_react2.default.Component);

MonthBody.propTypes = {
  className: _propTypes2.default.string,
  // days：[timestamp1, timestamp1, ...]
  days: _propTypes2.default.array,
  singleMode: _propTypes2.default.bool, // 是否是单选模式
  locale: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number,
  // PropTypes.array, // 传递过来的，不能存在array类型的value
  _propTypes2.default.object]),
  disabledDate: _propTypes2.default.func,
  renderDayBadge: _propTypes2.default.func,
  renderCustomDayLabel: _propTypes2.default.func
};
MonthBody.defaultProps = {
  className: undefined,
  days: undefined,
  singleMode: undefined,
  locale: undefined,
  value: undefined,
  disabledDate: undefined,
  renderDayBadge: undefined,
  renderCustomDayLabel: undefined
};
exports.default = MonthBody;
module.exports = exports['default'];