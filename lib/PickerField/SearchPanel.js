'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Check = require('salt-icon/lib/Check');

var _Check2 = _interopRequireDefault(_Check);

var _CheckRound = require('salt-icon/lib/CheckRound');

var _CheckRound2 = _interopRequireDefault(_CheckRound);

var _lie = require('lie');

var _lie2 = _interopRequireDefault(_lie);

var _nattyFetch = require('natty-fetch/dist/natty-fetch');

var _nattyFetch2 = _interopRequireDefault(_nattyFetch);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _ScrollView = require('../ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _SearchBar = require('../SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _SearchResult = require('./SearchResult');

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _GroupingBar = require('./GroupingBar');

var _GroupingBar2 = _interopRequireDefault(_GroupingBar);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PickerField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author longyan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SearchPanel = function (_React$Component) {
  _inherits(SearchPanel, _React$Component);

  _createClass(SearchPanel, null, [{
    key: 'renderSearchTips',
    value: function renderSearchTips() {
      return _react2.default.createElement('div', null);
    }
  }]);

  function SearchPanel(props) {
    _classCallCheck(this, SearchPanel);

    var _this = _possibleConstructorReturn(this, (SearchPanel.__proto__ || Object.getPrototypeOf(SearchPanel)).call(this, props));

    var t = _this;
    var value = props.value;

    t.state = {
      value: value || [],
      results: [],
      openResults: [],
      searchMode: false,
      searchEmpty: false,
      isOpenSearch: false,
      hasKeyword: false,
      popupVisible: false
    };
    t.delaySearch = _utils2.default.debounce(t.search.bind(t), t.props.searchDelay);
    t.handleLeaveResultView = t.handleLeaveResultView.bind(t);
    t.groupEl = {};
    return _this;
  }

  _createClass(SearchPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var t = this;
      if (t.props.fetchDataOnOpen) {
        t.delaySearch('');
        t.setState({
          isOpenSearch: true
        });
      }
    }
  }, {
    key: 'setData',
    value: function setData(fetchData) {
      var t = this;
      var state = {};
      if (fetchData && fetchData.length) {
        state.searchEmpty = false;
      } else {
        state.searchEmpty = true;
      }
      if (t.props.grouping) {
        var groups = {};
        fetchData.sort(function (a, b) {
          var phoneticA = t.props.phonetic(a);
          var phoneticB = t.props.phonetic(b);
          var compare = 0;
          phoneticA.some(function (string, i) {
            if (!phoneticB[i] || string > phoneticB[i]) {
              compare = 1;
              return true;
            } else if (string < phoneticB[i]) {
              compare = -1;
              return true;
            }
          });
          return compare;
        });
        fetchData.forEach(function (item) {
          var group = (t.props.phonetic(item)[0] || '#')[0].toUpperCase();
          if (group < 'A' || group > 'Z') {
            group = '#';
          }
          groups[group] = groups[group] || [];
          groups[group].push(item);
        });
        fetchData = Object.keys(groups).sort(function (a, b) {
          return _utils2.default.alphabet.indexOf(a) - _utils2.default.alphabet.indexOf(b);
        }).map(function (key) {
          return {
            title: key,
            items: groups[key]
          };
        });
      }
      if (t.state.isOpenSearch) {
        state.openResults = fetchData;
        state.isOpenSearch = false;
      } else {
        state.results = state.searchEmpty ? [] : fetchData;
      }
      t.setState(state);
    }
  }, {
    key: 'search',
    value: function search(term) {
      var t = this;
      if (t.fetch) {
        t.fetch.abort();
        if (t.state.isOpenSearch) {
          t.setState({
            isOpenSearch: false
          });
        }
      }
      if (t.props.fetchUrl) {
        t.fetch = _nattyFetch2.default.create({
          url: t.props.fetchUrl,
          jsonp: t.props.dataType ? t.props.dataType === 'jsonp' : /\.jsonp/.test(t.props.fetchUrl),
          data: t.props.beforeFetch({ q: term }),
          fit: t.props.fitResponse,
          Promise: _lie2.default
        });
        t.fetch().then(function (data) {
          var fetchData = t.props.afterFetch(data);
          t.setData(fetchData);
        }).catch(function (e) {
          console.error(e); // eslint-disable-line no-console
        });
      } else {
        var options = t.props.options || [];
        if (!t.searchIndex) {
          var processFunc = function processFunc(value) {
            var phonetic = t.props.phonetic(value);
            return [t.props.formatter(value).toString().toLowerCase(), phonetic.join('').toLowerCase(), phonetic.map(function (str) {
              return str[0] || '';
            }).join('').toLowerCase()];
          };
          t.searchIndex = options.map(function (item) {
            return {
              indexes: processFunc(item),
              item: item
            };
          });
        }
        var filteredData = term ? t.searchIndex.filter(function (entity) {
          return entity.indexes.some(function (indexText) {
            return indexText.indexOf(term.toLowerCase()) > -1;
          });
        }).map(function (entity) {
          return entity.item;
        }) : options;
        t.setData(filteredData);
      }
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(item) {
      var t = this;

      if (t.props.multiple) {
        var value = this.state.value;


        var found = -1;
        value.some(function (v, i) {
          if (v.value === item.value) {
            found = i;
            return true;
          }
          return false;
        });

        if (found > -1) {
          value.splice(found, 1);
          t.setState({
            value: value
          });
        } else {
          t.setState({
            value: [].concat(_toConsumableArray(value), [item])
          });
        }
      } else {
        t.setState({
          value: [item]
        }, function () {
          t.handleConfirm();
        });
      }
    }
  }, {
    key: 'handleSearchChange',
    value: function handleSearchChange(term) {
      var t = this;

      if (term) {
        t.delaySearch(term);
        t.setState({
          hasKeyword: true,
          results: []
        });
      } else {
        // abort exists fetch request
        if (t.fetch) {
          t.fetch.abort();
        }
        t.setState({
          hasKeyword: false,
          results: []
        });
      }
    }
  }, {
    key: 'handleSearchEnter',
    value: function handleSearchEnter() {
      var t = this;
      t.setState({
        searchMode: true
      });
    }
  }, {
    key: 'handleSearchLeave',
    value: function handleSearchLeave() {
      var t = this;
      t.setState({
        searchMode: false
      });
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      this.props.onConfirm(this.state.value);
    }
  }, {
    key: 'handleEnterResultView',
    value: function handleEnterResultView() {
      var _this2 = this;

      this.setState({
        popupVisible: true
      }, function () {
        window.history.pushState({
          PickerField: 'SearchPanel.result'
        }, '', _utils2.default.addUrlParam('PICKER', Date.now()));

        window.addEventListener('popstate', _this2.handleLeaveResultView, false);
      });
    }
  }, {
    key: 'handleLeaveResultView',
    value: function handleLeaveResultView(e) {
      var state = e.state;

      if (state && state.PickerField === 'SearchPanel.index') {
        window.removeEventListener('popstate', this.handleLeaveResultView, false);
        this.setState({
          popupVisible: false
        });
      }
    }
  }, {
    key: 'isItemChecked',
    value: function isItemChecked(item) {
      var t = this;
      var found = -1;
      t.state.value.forEach(function (v, i) {
        if (v.value === item.value) {
          found = i;
        }
      });
      return found > -1;
    }
  }, {
    key: 'selectGrouping',
    value: function selectGrouping(key) {
      var t = this;
      var element = t.groupEl[key];
      if (element) {
        element.scrollIntoView();
      }
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.state.value.length === 0;
    }
  }, {
    key: 'renderEmpty',
    value: function renderEmpty() {
      var t = this;
      return _react2.default.createElement(
        'div',
        { className: _Context2.default.prefixClass('picker-field-search-empty') },
        _react2.default.createElement(
          'div',
          { className: _Context2.default.prefixClass('picker-field-search-empty-inner') },
          t.props.searchNotFoundContent
        )
      );
    }
  }, {
    key: 'renderResults',
    value: function renderResults(results) {
      var t = this;
      return _react2.default.createElement(
        'div',
        { className: _Context2.default.prefixClass('picker-field-search-results') },
        t.props.grouping ? t.renderGroups(results) : results.map(function (item, index) {
          return t.renderResultItem(item, index);
        })
      );
    }
  }, {
    key: 'renderGroups',
    value: function renderGroups(groups) {
      var t = this;
      return groups.map(function (group) {
        return _react2.default.createElement(
          'div',
          {
            className: _Context2.default.prefixClass('picker-field-grouping'),
            key: group.title,
            ref: function ref(_ref) {
              t.groupEl[group.title] = _ref;
            }
          },
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-grouping-title') },
            _react2.default.createElement(
              'p',
              { className: _Context2.default.prefixClass('picker-field-grouping-title-inner') },
              group.title
            )
          ),
          group.items.map(function (item, index) {
            return t.renderResultItem(item, index);
          })
        );
      });
    }
  }, {
    key: 'renderResultItem',
    value: function renderResultItem(item, index) {
      var t = this;

      var checked = t.isItemChecked(item);
      var iconHTML = void 0;
      if (t.props.multiple) {
        iconHTML = _react2.default.createElement(_CheckRound2.default, {
          className: (0, _classnames2.default)({
            'un-checked': !checked
          }),
          width: 20,
          height: 20
        });
      } else if (checked) {
        iconHTML = _react2.default.createElement(_Check2.default, {
          width: 14,
          height: 14
        });
      }

      return _react2.default.createElement(
        'div',
        {
          key: index,
          className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-search-result-item'), _Context2.default.prefixClass('clear')),
          onClick: function onClick() {
            t.handleItemClick(item);
          }
        },
        _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-search-result-item-icon'), t.props.grouping ? null : _Context2.default.prefixClass('picker-field-right-icon'))
          },
          iconHTML
        ),
        _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-search-result-item-entry'), t.props.grouping ? null : _Context2.default.prefixClass('picker-field-right-icon')) },
          t.props.formatter(item)
        )
      );
    }
  }, {
    key: 'renderResultCondition',
    value: function renderResultCondition() {
      var t = this;
      if (t.state.hasKeyword) {
        if (t.state.searchEmpty) {
          return t.renderEmpty();
        }
        return t.renderResults(t.state.results);
      } else if (t.props.fetchDataOnOpen && t.state.openResults.length) {
        return t.renderResults(t.state.openResults);
      }
      return SearchPanel.renderSearchTips();
    }
  }, {
    key: 'renderGroupingBar',
    value: function renderGroupingBar() {
      var t = this;
      var groups = [];
      if (t.state.hasKeyword) {
        groups = t.state.results;
      } else if (t.props.fetchDataOnOpen && t.state.openResults.length) {
        groups = t.state.openResults;
      }
      var keys = groups.map(function (group) {
        return group.title;
      });
      return _react2.default.createElement(_GroupingBar2.default, {
        keys: keys,
        indicator: t.props.groupingIndicator,
        onSelect: t.selectGrouping.bind(t)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var t = this;
      var _t$props = t.props,
          showSearch = _t$props.showSearch,
          multiple = _t$props.multiple;

      var pageSize = _utils2.default.getPageSize();
      var length = this.state.value.length;

      var resultProps = {
        value: [].concat(_toConsumableArray(this.state.value)),
        confirmText: this.props.confirmText,
        onConfirm: function onConfirm(value) {
          _this3.setState({
            value: value
          }, function () {
            window.history.go(-1);
          });
        },
        formatter: this.props.formatter,
        selectText: this.props.selectText
      };
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-searchpanel'), {
            multiple: multiple
          }),
          style: {
            width: pageSize.width + 'px',
            height: pageSize.height + 'px'
          }
        },
        _react2.default.createElement(
          'div',
          { className: _Context2.default.prefixClass('picker-field-searchpanel-inner') },
          showSearch ? _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-header') },
            _react2.default.createElement(_SearchBar2.default, {
              ref: function ref(c) {
                t.searchBar = c;
              },
              placeholder: t.props.searchText,
              cancelText: t.props.cancelText,
              className: _Context2.default.prefixClass('picker-field-searchpanel-search'),
              onChange: function onChange(val) {
                t.handleSearchChange(val);
              },
              onEnterSearchMode: function onEnterSearchMode() {
                t.handleSearchEnter();
              },
              onLeaveSearchMode: function onLeaveSearchMode() {
                t.handleSearchLeave();
              }
            })
          ) : null,
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-content') },
            _react2.default.createElement(
              _ScrollView2.default,
              { bounce: false, disablePointer: true },
              t.renderResultCondition()
            ),
            t.props.grouping ? t.renderGroupingBar() : null
          ),
          multiple ? _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-footer') },
            _react2.default.createElement(
              _Button2.default,
              {
                className: _Context2.default.prefixClass('picker-field-searchpanel-btn-ok'),
                size: 'small',
                display: 'inline',
                disabled: t.isEmpty(),
                onClick: function onClick(e) {
                  t.handleConfirm(e);
                }
              },
              t.props.confirmText
            ),
            _react2.default.createElement(
              'div',
              {
                className: _Context2.default.prefixClass('picker-field-searchpanel-result-summary'),
                onClick: function onClick(e) {
                  t.handleEnterResultView(e);
                }
              },
              _react2.default.createElement(
                'a',
                { href: 'javacript:;' },
                t.props.selectText,
                length
              )
            )
          ) : null
        ),
        _react2.default.createElement(_Popup2.default, { content: _react2.default.createElement(_SearchResult2.default, resultProps), animationType: 'slide-left', visible: this.state.popupVisible })
      );
    }
  }]);

  return SearchPanel;
}(_react2.default.Component);

SearchPanel.defaultProps = {
  onConfirm: function onConfirm() {},

  showSearch: true,
  multiple: false,
  value: undefined,
  searchText: undefined,
  confirmText: undefined,
  cancelText: undefined,
  fetchDataOnOpen: undefined,
  dataType: undefined,
  beforeFetch: undefined,
  fitResponse: undefined,
  afterFetch: undefined,
  searchTitle: undefined,
  searchDelay: undefined,
  searchPlaceholder: undefined,
  searchNotFoundContent: undefined,
  formatter: undefined,
  phonetic: undefined,
  selectText: undefined,
  options: undefined,
  fetchUrl: undefined,
  grouping: undefined
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchPanel.propTypes = {
  value: _propTypes2.default.array,
  searchText: _propTypes2.default.string,
  confirmText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  onConfirm: _propTypes2.default.func,
  options: _propTypes2.default.array,
  fetchUrl: _propTypes2.default.string,
  fetchDataOnOpen: _propTypes2.default.bool,
  dataType: _propTypes2.default.string,
  beforeFetch: _propTypes2.default.func,
  fitResponse: _propTypes2.default.func,
  afterFetch: _propTypes2.default.func,
  showSearch: _propTypes2.default.bool,
  searchTitle: _propTypes2.default.string,
  searchDelay: _propTypes2.default.number,
  searchPlaceholder: _propTypes2.default.string,
  searchNotFoundContent: _propTypes2.default.string,
  formatter: _propTypes2.default.func,
  phonetic: _propTypes2.default.func,
  multiple: _propTypes2.default.bool,
  grouping: _propTypes2.default.bool,
  selectText: _propTypes2.default.string
};

SearchPanel.displayName = 'SearchPanel';

exports.default = SearchPanel;
module.exports = exports['default'];