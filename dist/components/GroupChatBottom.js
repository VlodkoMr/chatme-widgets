"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupChatBottom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _WriteMessage = require("./WriteMessage");
var _Loader = require("./Loader");
var _requests = require("../utils/requests");
var _Avatar = require("./Avatar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var GroupChatBottom = function GroupChatBottom(_ref) {
  var wallet = _ref.wallet,
    group = _ref.group,
    replyToMessage = _ref.replyToMessage,
    setReplyToMessage = _ref.setReplyToMessage,
    onMessageSent = _ref.onMessageSent,
    network = _ref.network,
    connectButtonClass = _ref.connectButtonClass,
    bottomBlockClass = _ref.bottomBlockClass;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isJoined = _useState2[0],
    setIsJoined = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var chatmeURL = network === "testnet" ? "https://test.chatme.page" : "https://chatme.page";
  (0, _react.useEffect)(function () {
    if (!isChannel()) {
      setIsJoined(group.members.indexOf(wallet.accountId) !== -1);
    } else {
      (0, _requests.loadGroupsIdList)(wallet).then(function (myGroups) {
        var idList = myGroups.map(function (group) {
          return group.id;
        });
        setIsJoined(idList.indexOf(group.id) !== -1);
      });
    }
  }, [group.id]);
  var isChannel = function isChannel() {
    return group.group_type === "Channel";
  };
  var joinChannel = function joinChannel() {
    setIsLoading(true);
    var methodName = isChannel() ? "joinPublicChannel" : "joinPublicGroup";
    wallet.chatmeContract[methodName](group.id).then(function (result) {
      console.log("join");
      setIsJoined(true);
      setIsLoading(false);
    });
  };
  var leaveChannel = function leaveChannel() {
    setIsLoading(true);
    var methodName = isChannel() ? "leaveChannel" : "leaveGroup";
    wallet.chatmeContract[methodName](group.id).then(function (result) {
      console.log("leave");
      setIsJoined(false);
      setIsLoading(false);
    });
  };
  var canWriteMessages = function canWriteMessages() {
    console.log("wallet.accountId", wallet.accountId);
    if (group.owner === wallet.accountId) {
      return true;
    }
    if (!isChannel()) {
      return isJoined;
    }
    return false;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: bottomBlockClass ? bottomBlockClass : "border-t-2 border-gray-700/40 bg-gray-800 py-3"
  }, wallet.isSigned ? /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-48 text-left pl-5 flex flex-row gap-3 pt-2"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "block w-10 h-10",
    href: chatmeURL,
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
    title: wallet.accountId
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-sm w-32 overflow-hidden leading-4 pt-1"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: chatmeURL,
    className: "block font-semibold w-32 mb-0.5 overflow-hidden overflow-ellipsis whitespace-nowrap hover:opacity-90 transition"
  }, wallet.accountId, wallet.accountId), /*#__PURE__*/_react.default.createElement("small", {
    onClick: function onClick() {
      return wallet.interface.signOut();
    },
    className: "cursor-pointer text-red-400 hover:text-red-300 transition"
  }, "Disconnect"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-1"
  }, canWriteMessages() ? /*#__PURE__*/_react.default.createElement(_WriteMessage.WriteMessage, {
    wallet: wallet,
    toGroup: group,
    replyToMessage: replyToMessage,
    setReplyToMessage: setReplyToMessage,
    onMessageSent: onMessageSent
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, group.edit_members && group.group_type !== "Private" && /*#__PURE__*/_react.default.createElement("div", {
    className: "px-6 py-4 border-t-2 border-gray-700/30 flex flex-row justify-between"
  }, isJoined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm w-2/3 opacity-60"
  }, group.text), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return leaveChannel();
    }
  }, "Leave ", isChannel() ? "Channel" : "Group", isLoading && /*#__PURE__*/_react.default.createElement("span", {
    className: "ml-2"
  }, /*#__PURE__*/_react.default.createElement(_Loader.Loader, {
    size: "sm"
  })))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm w-2/3 opacity-60"
  }, group.text), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return joinChannel();
    }
  }, "Join ", isChannel() ? "Channel" : "Group", isLoading && /*#__PURE__*/_react.default.createElement("span", {
    className: "ml-2"
  }, /*#__PURE__*/_react.default.createElement(_Loader.Loader, {
    size: "sm"
  })))))))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: connectButtonClass ? connectButtonClass : "bg-gray-700 hover:bg-gray-600/80 px-6 py-2.5 rounded-lg",
    onClick: function onClick() {
      return wallet.interface.signIn();
    }
  }, "Connect Account")));
};
exports.GroupChatBottom = GroupChatBottom;