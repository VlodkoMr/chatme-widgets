"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteMessage = void 0;
var _react = require("react");
var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var WriteMessage = function WriteMessage(_ref) {
  var wallet = _ref.wallet,
    toAddress = _ref.toAddress,
    toGroup = _ref.toGroup,
    onMessageSent = _ref.onMessageSent,
    replyToMessage = _ref.replyToMessage,
    setReplyToMessage = _ref.setReplyToMessage;
  var inputRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    messageText = _useState2[0],
    setMessageText = _useState2[1];
  var sendMessage = function sendMessage(messageText) {
    var sendFunction;
    var replyId = replyToMessage ? replyToMessage.id : "";
    messageText = messageText.trim();
    if (!messageText.length) {
      alert("Please provide message text or upload media");
      return false;
    }
    sendFunction = toAddress ? "sendPrivateMessage" : "sendGroupMessage";
    wallet.chatmeContract[sendFunction](messageText, "", toAddress || toGroup.id, replyId).catch(function (e) {
      console.log(e);
      // add retry...
      alert('Error: Message not sent');
    });
    onMessageSent === null || onMessageSent === void 0 ? void 0 : onMessageSent(messageText, "");
    setMessageText("");
    setReplyToMessage(null);
  };
  (0, _react.useEffect)(function () {
    inputRef.current.focus();
  }, [replyToMessage, toAddress, toGroup === null || toGroup === void 0 ? void 0 : toGroup.id]);
  var handleTextChange = function handleTextChange(e) {
    var value = e.target.value;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(value);
      return false;
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "chat-footer flex-non relative text-blue-500"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-end p-2 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-grow md:ml-4"
  }, /*#__PURE__*/React.createElement("label", null, replyToMessage && /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setReplyToMessage(null);
    },
    className: "absolute left-1 top-1 w-32 rounded-full p-[6px] flex flex-row text-sm text-gray-200 bg-gray-700/80"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    className: "w-5 h-5 fill-current opacity-50 ml-1 mt-0.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"
  })), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap overflow-ellipsis w-20 overflow-hidden ml-1.5 pt-0.5"
  }, replyToMessage.from_address)), /*#__PURE__*/React.createElement(_reactTextareaAutosize.default, {
    placeholder: "Aa",
    autoFocus: true,
    ref: inputRef,
    maxRows: 10,
    className: "rounded-3xl py-2 pl-4 pr-10 w-full border text-base focus:outline-none text-sm\n                              ".concat(replyToMessage ? "pl-36" : "", "\n                              text-gray-100 focus:shadow-md transition duration-300 ease-in border-gray-700/60 bg-gray-900/30 focus:bg-gray-900/60"),
    value: messageText,
    onChange: function onChange(e) {
      return setMessageText(e.target.value);
    },
    onKeyDown: handleTextChange
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "flex flex-shrink-0 focus:outline-none mx-2 ml-4 block md:w-7 md:h-7 mb-3.5 hover:text-blue-600"
  }, messageText.length > 0 ? /*#__PURE__*/React.createElement("svg", {
    onClick: function onClick() {
      return sendMessage(messageText);
    },
    viewBox: "0 0 24 24",
    className: "fill-current",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m21.5 11.1-17.9-9c-.9-.4-1.9.4-1.5 1.3l2.5 6.7L16 12 4.6 13.9l-2.5 6.7c-.3.9.6 1.7 1.5 1.2l17.9-9c.7-.3.7-1.3 0-1.7z"
  })) : /*#__PURE__*/React.createElement("svg", {
    onClick: function onClick() {
      return sendMessage("(like)");
    },
    className: "fill-current",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 10h3v10H2zm17-1h-5V4a1 1 0 0 0-1-1h-1L7.66473 8.37579A3.00021 3.00021 0 0 0 7 10.259V18a2 2 0 0 0 2 2h6.43481a2.99991 2.99991 0 0 0 2.69037-1.67273L21 12.5V11a2 2 0 0 0-2-2Z"
  })))));
};
exports.WriteMessage = WriteMessage;