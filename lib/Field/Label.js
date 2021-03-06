'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FieldRequired = require('salt-icon/lib/FieldRequired');

var _FieldRequired2 = _interopRequireDefault(_FieldRequired);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixClass = _Context2.default.prefixClass;


var requiredTag = _react2.default.createElement(_FieldRequired2.default, {
  className: prefixClass('field-layout-label-required'),
  width: 6,
  height: 6,
  fill: 'red'
});

var Label = function Label(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames3.default)(prefixClass('field-layout-' + props.layout + '-label'), _defineProperty({}, props.className, !!props.className))
    },
    props.label,
    props.required && requiredTag
  );
};
Label.defaultProps = {
  label: undefined,
  className: undefined,
  layout: undefined,
  required: undefined
};

Label.propTypes = {
  label: _propTypes2.default.string,
  className: _propTypes2.default.string,
  layout: _propTypes2.default.oneOf(['h', 'v']),
  required: _propTypes2.default.bool
};

exports.default = Label;
module.exports = exports['default'];