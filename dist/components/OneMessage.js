"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OneMessage = void 0;
var _datetime = require("../utils/datetime");
var _Avatar = require("./Avatar");
var _transform = require("../utils/transform");
var _reactLinkifyIt = require("react-linkify-it");
var OneMessage = function OneMessage(_ref) {
  var message = _ref.message,
    opponent = _ref.opponent,
    isLast = _ref.isLast,
    setReplyToMessage = _ref.setReplyToMessage,
    wallet = _ref.wallet;
  var handleSpamReport = function handleSpamReport() {
    if (confirm("Do you want to Report Spam in this message?")) {
      wallet.chatmeContract.spamReport(message.id, message.from_address).then(function () {
        message.text = "*Spam report sent";
      });
    }
  };
  var MessageAction = function MessageAction(_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "hidden group-hover:block flex flex-shrink-0 focus:outline-none mr-2 block rounded-full " + "text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
    }, children);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, message.isDateFirst && !message.isTemporary && /*#__PURE__*/React.createElement("p", {
    className: "p-4 text-center text-sm font-medium text-gray-500"
  }, (0, _datetime.timestampToDate)(message.created_at, 'long')), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row mb-2 justify-start ".concat(message.isMy ? "justify-end" : "justify-start")
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block md:w-10 md:h-10 relative flex flex-shrink-0 mr-4"
  }, !message.isMy && (message.isUserFirst || message.isDateFirst) && /*#__PURE__*/React.createElement(_Avatar.Avatar, {
    media: (opponent === null || opponent === void 0 ? void 0 : opponent.image) || "",
    title: message.from_address
  })), /*#__PURE__*/React.createElement("div", {
    className: "messages text-sm text-white grid grid-flow-row gap-2"
  }, !message.isMy && (message.isUserFirst || message.isDateFirst) && /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400 font-medium leading-3"
  }, opponent !== null && opponent !== void 0 && opponent.name ? /*#__PURE__*/React.createElement(React.Fragment, null, opponent === null || opponent === void 0 ? void 0 : opponent.name, " ", /*#__PURE__*/React.createElement("small", {
    className: "opacity-60"
  }, "(", message.from_address, ")")) : /*#__PURE__*/React.createElement(React.Fragment, null, (opponent === null || opponent === void 0 ? void 0 : opponent.id) || message.from_address)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group relative ".concat(message.isMy ? "" : "flex-row-reverse justify-end")
  }, message.isTemporary && /*#__PURE__*/React.createElement("div", {
    className: "mr-1 text-gray-400 opacity-60 w-4 h-4"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-full h-full fill-current",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
  }))), wallet.isSigned && !message.isMy && !message.isEncryptStart && !message.isEncryptAccept && !message.isEncryptEnd && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MessageAction, {
    onClick: function onClick() {
      return handleSpamReport();
    },
    title: "Spam Report"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xl leading-4 font-semibold transition w-full h-full"
  }, "!")), /*#__PURE__*/React.createElement(MessageAction, {
    onClick: function onClick() {
      return setReplyToMessage(message);
    },
    title: "Reply"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    className: "w-full h-full fill-current"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-[260px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl whitespace-pre-wrap px-5 \n              overflow-ellipsis text-base relative min-h-[46px] text-gray-100\n              ".concat(message.text === '(like)' ? "py-2.5" : "py-3", "\n              ").concat(message.isUserFirst || message.isDateFirst ? "rounded-t-3xl" : "", "\n              ").concat(isLast ? "rounded-b-3xl" : "", "\n              ").concat(message.isTemporary ? "opacity-70" : "", "\n              ").concat(message.isMy ? "bg-sky-500/50 rounded-l-3xl ml-2" : "bg-gray-700/60 rounded-r-3xl mr-2", "\n              ").concat(message.isEncryptStart || message.isEncryptAccept || message.isEncryptEnd ? "bg-red-600/30" : "", "\n            ")
  }, message.reply_message && /*#__PURE__*/React.createElement("p", {
    className: "border-b border-gray-200/20 mb-2 pb-1 text-sm opacity-50"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    className: "w-4 h-4 fill-current inline mr-1"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"
  })), /*#__PURE__*/React.createElement("b", {
    className: "mr-2"
  }, message.reply_message.from_address), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap overflow-hidden max-w-[260px] overflow-ellipsis inline-block align-bottom"
  }, (0, _transform.decodeMessageText)(message.reply_message, accountId))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("p", null, (0, _transform.decodeMessageText)(message, accountId) === '(like)' ? /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    className: "w-6 h-6 fill-current inline"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 10h3v10H2zm17-1h-5V4a1 1 0 0 0-1-1h-1L7.66473 8.37579A3.00021 3.00021 0 0 0 7 10.259V18a2 2 0 0 0 2 2h6.43481a2.99991 2.99991 0 0 0 2.69037-1.67273L21 12.5V11a2 2 0 0 0-2-2Z"
  })) : /*#__PURE__*/React.createElement(_reactLinkifyIt.LinkItUrl, {
    className: "text-blue-300 hover:underline"
  }, (0, _transform.decodeMessageText)(message, accountId))), /*#__PURE__*/React.createElement("span", {
    className: "ml-2.5 leading-6 text-xs opacity-40"
  }, (0, _datetime.timestampToTime)(message === null || message === void 0 ? void 0 : message.created_at))), message.image && /*#__PURE__*/React.createElement("img", {
    alt: "",
    src: (0, _transform.mediaURL)(message.image),
    className: "h-[220px] min-w-[100px] rounded-lg mt-2 mb-3 object-contain"
  }), message.encrypt_key && /*#__PURE__*/React.createElement("img", {
    src: require("../assets/images/lock.svg"),
    alt: "",
    className: "absolute fill-current w-4 h-4 top-0 ".concat(message.isMy ? "-left-1" : "-right-1")
  }))))));
};
exports.OneMessage = OneMessage;