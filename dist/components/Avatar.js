"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;
var _transform = require("../utils/transform");
var Avatar = function Avatar(_ref) {
  var media = _ref.media,
    title = _ref.title,
    textSize = _ref.textSize;
  return /*#__PURE__*/React.createElement("div", {
    className: "shadow-md rounded-full w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 text-center flex items-center\n    justify-center border border-indigo-300/60 rounded-full text-white overflow-hidden"
  }, media ? /*#__PURE__*/React.createElement("img", {
    src: (0, _transform.mediaURL)(media),
    alt: "",
    className: "object-cover w-full h-full"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "font-semibold inline-block opacity-60 ".concat(textSize ? textSize : "text-xl")
  }, title[0].toUpperCase() || ""));
};
exports.Avatar = Avatar;