'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var locale = {
  'zh-cn': {
    ok: '确定',
    corpIdRequired: 'corpId 不能为空',
    getTotalText: function getTotalText(total) {
      return '\u5171' + total + '\u4EBA';
    },

    onlyForDd: '非钉钉内仅支持查看。 '
  },
  'en-us': {
    ok: 'OK',
    corpIdRequired: 'corpId is required',
    getTotalText: function getTotalText(total) {
      return 'Total ' + total;
    },

    onlyForDd: 'Read only when not in Dingtalk. '
  }
};

exports.default = locale;
module.exports = exports['default'];