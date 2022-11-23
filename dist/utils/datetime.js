"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timestampToTime = exports.timestampToDate = void 0;
var timestampToDate = function timestampToDate(timestamp) {
  var date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};
exports.timestampToDate = timestampToDate;
var timestampToTime = function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }).format(date);
};
exports.timestampToTime = timestampToTime;