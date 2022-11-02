import { base_encode } from "near-api-js/lib/utils/serialize";

export const mediaURL = (ipfsHash) => {
  return `https://ipfs.io/ipfs/${ipfsHash}`;
}

export const convertToTera = (amount) => {
  return `${amount}000000000000`;
};

export const transformOneMessage = (message, accountId, isFirst, isLast, isTemporary) => {
  message.isEncryptStart = message.text.indexOf("(secret-start:") !== -1;
  message.isEncryptAccept = message.text.indexOf("(secret-accept:") !== -1;
  message.isEncryptEnd = message.text.indexOf("(secret-end)") !== -1;
  message.isMy = message.from_address === accountId;
  message.isTemporary = isTemporary;
  message.isFirst = isFirst;
  message.isLast = isLast;
  message.opponentAddress = message.isMy ? message.to_address : message.from_address;

  if (message.reply_message) {
    message.reply_message = transformOneMessage(message.reply_message, accountId, false, false, false)
  }

  return message;
}

export const transformProfile = (address, socialProfile) => {
  let resultProfile = { id: address };
  if (socialProfile && Object.keys(socialProfile).length > 0) {
    const profile = socialProfile.profile;
    if (profile.name) {
      resultProfile['name'] = profile.name;
    }
    if (profile.image) {
      resultProfile['image'] = profile.image.ipfs_cid;
    }
  }
  return resultProfile;
}

export const transformMessages = (messages, accountId, lastMessageUser) => {
  return messages.map((message, index) => {
    const isLast = !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
    const isFirst = lastMessageUser !== message.from_address;
    const result = transformOneMessage(message, accountId, isFirst, isLast, false);

    lastMessageUser = message.from_address;
    return result;
  });
}

export const decodeMessageText = (message) => {
  let result = message.text;

  // Replace message text for secret chat events
  if (message.isEncryptAccept) {
    result = "Private chat request accepted";
  } else if (message.isEncryptEnd) {
    result = "Private chat disabled";
  } else if (message.isEncryptStart) {
    result = "Private chat request";
  }

  return result;
}

export const getInnerId = (text, image, toAddress) => {
  const inner_id = base_encode(`${text}:${image}:${toAddress}`);
  if (inner_id.length > 10) {
    return inner_id.slice(0, 10);
  }
  return inner_id;
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const generateTemporaryMessage = (text, image, accountId, opponentAddress, encryptKey) => {
  const inner_id = getInnerId(text, image, opponentAddress);
  const message = {
    id: inner_id,
    from_address: accountId,
    to_address: opponentAddress,
    text,
    inner_id,
    image,
    encrypt_key: encryptKey || ""
  }
  return transformOneMessage(message, accountId, true, true, true);
}