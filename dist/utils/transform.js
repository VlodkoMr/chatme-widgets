"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformProfile = exports.transformOneMessage = exports.transformMessages = exports.onlyUnique = exports.mediaURL = exports.getInnerId = exports.generateTemporaryMessage = exports.decodeMessageText = exports.convertToTera = void 0;
var _serialize = require("near-api-js/lib/utils/serialize");
var _datetime = require("./datetime");
var mediaURL = function mediaURL(ipfsHash) {
  return "https://ipfs.io/ipfs/".concat(ipfsHash);
};
exports.mediaURL = mediaURL;
var convertToTera = function convertToTera(amount) {
  return "".concat(amount, "000000000000");
};
exports.convertToTera = convertToTera;
var transformOneMessage = function transformOneMessage(message, accountId, isUserFirst, isDateFirst, isLast, isTemporary) {
  message.isEncryptStart = message.text.indexOf("(secret-start:") !== -1;
  message.isEncryptAccept = message.text.indexOf("(secret-accept:") !== -1;
  message.isEncryptEnd = message.text.indexOf("(secret-end)") !== -1;
  message.isMy = message.from_address === accountId;
  message.isTemporary = isTemporary;
  message.isUserFirst = isUserFirst;
  message.isDateFirst = isDateFirst;
  message.isLast = isLast;
  message.opponentAddress = message.isMy ? message.to_address : message.from_address;
  if (message.reply_message) {
    message.reply_message = transformOneMessage(message.reply_message, accountId, false, false, false, false);
  }
  return message;
};
exports.transformOneMessage = transformOneMessage;
var transformProfile = function transformProfile(address, socialProfile) {
  var resultProfile = {
    id: address
  };
  if (socialProfile && Object.keys(socialProfile).length > 0) {
    var profile = socialProfile.profile;
    if (profile.name) {
      resultProfile['name'] = profile.name;
    }
    if (profile.image) {
      resultProfile['image'] = profile.image.ipfs_cid;
    }
  }
  return resultProfile;
};
exports.transformProfile = transformProfile;
var transformMessages = function transformMessages(messages, accountId, lastMessageDate, lastMessageUser) {
  return messages.map(function (message, index) {
    var date = (0, _datetime.timestampToDate)(message.created_at);
    var isLast = !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
    var isDateFirst = date !== lastMessageDate;
    var isUserFirst = message.from_address !== lastMessageUser;
    var result = transformOneMessage(message, accountId, isUserFirst, isDateFirst, isLast, false);
    lastMessageDate = date;
    lastMessageUser = message.from_address;
    return result;
  });
};
exports.transformMessages = transformMessages;
var decodeMessageText = function decodeMessageText(message) {
  var result = message.text;

  // Replace message text for secret chat events
  if (message.isEncryptAccept) {
    result = "Private chat request accepted";
  } else if (message.isEncryptEnd) {
    result = "Private chat disabled";
  } else if (message.isEncryptStart) {
    result = "Private chat request";
  }
  return result;
};
exports.decodeMessageText = decodeMessageText;
var getInnerId = function getInnerId(text, image, toAddress) {
  var inner_id = (0, _serialize.base_encode)("".concat(text, ":").concat(image, ":").concat(toAddress));
  if (inner_id.length > 10) {
    return inner_id.slice(0, 10);
  }
  return inner_id;
};
exports.getInnerId = getInnerId;
var onlyUnique = function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
};
exports.onlyUnique = onlyUnique;
var generateTemporaryMessage = function generateTemporaryMessage(text, image, accountId, opponentAddress, encryptKey) {
  var inner_id = getInnerId(text, image, opponentAddress);
  var message = {
    id: inner_id,
    from_address: accountId,
    to_address: opponentAddress,
    text: text,
    inner_id: inner_id,
    image: image,
    encrypt_key: encryptKey || ""
  };
  return transformOneMessage(message, accountId, true, true, true, true);
};
exports.generateTemporaryMessage = generateTemporaryMessage;