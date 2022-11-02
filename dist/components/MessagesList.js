"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessagesList = void 0;
var _OneMessage = require("./OneMessage");
var MessagesList = function MessagesList(_ref) {
  var messages = _ref.messages,
    historyMessages = _ref.historyMessages,
    tmpMessages = _ref.tmpMessages,
    messagesPerPage = _ref.messagesPerPage,
    setReplyToMessage = _ref.setReplyToMessage,
    opponent = _ref.opponent,
    opponentAddress = _ref.opponentAddress,
    userProfiles = _ref.userProfiles,
    wallet = _ref.wallet;
  var isLastMessage = function isLastMessage(message, index) {
    return !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, messages.length >= messagesPerPage && /*#__PURE__*/React.createElement("div", {
    className: "w-40 mx-auto text-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "w-full"
  }, "load previous")), historyMessages.map(function (message) {
    return /*#__PURE__*/React.createElement(_OneMessage.OneMessage, {
      message: message,
      key: message.id,
      wallet: wallet,
      opponent: opponent ? opponent : userProfiles[message.from_address] || null,
      setReplyToMessage: setReplyToMessage,
      isLast: false
    });
  }), messages.map(function (message, index) {
    return /*#__PURE__*/React.createElement(_OneMessage.OneMessage, {
      message: message,
      key: message.id,
      wallet: wallet,
      opponent: opponent ? opponent : userProfiles[message.from_address] || null,
      setReplyToMessage: setReplyToMessage,
      isLast: isLastMessage(message, index)
    });
  }), tmpMessages.length > 0 && tmpMessages.filter(function (tmp) {
    return tmp.to_address === opponentAddress;
  }).map(function (tmpMessage) {
    return /*#__PURE__*/React.createElement(_OneMessage.OneMessage, {
      message: tmpMessage,
      key: tmpMessage.id,
      wallet: wallet,
      opponent: opponent,
      isLast: true
    });
  }));
};
exports.MessagesList = MessagesList;