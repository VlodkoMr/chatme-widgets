"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timestampToTime = exports.timestampToDate = void 0;
var timestampToDate = function timestampToDate(timestamp) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'short';
  if (timestamp) {
    var date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: format
    }).format(date);
  }
};
exports.timestampToDate = timestampToDate;
var timestampToTime = function timestampToTime(timestamp) {
  if (timestamp) {
    var date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(date);
  }
};
exports.timestampToTime = timestampToTime;