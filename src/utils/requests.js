import { createClient } from "urql";
import { transformProfile } from "./transform";

export const loadGroupInfo = (wallet, chatId) => new Promise(async resolve => {
  const group = await wallet.chatmeContract.getGroupById(parseInt(chatId))
  resolve(group);
})

export const loadGroupsIdList = (wallet) => new Promise(async resolve => {
  if (wallet.isSigned) {
    const groups = await wallet.chatmeContract.getUserGroups(wallet.accountId);
    resolve(groups);
  } else {
    resolve([]);
  }
})

export const chatmeContractAddress = (network) => {

  return "chatme.near";
}

const getTheGraphApiUrl = (network) => {
  let contract = "chatme-main";
  switch (network) {
    case "local":
      contract = "near-message"
      break;
    case "testnet":
      contract = "chatme";
      break;
  }
  return `https://api.thegraph.com/subgraphs/name/vlodkomr/${contract}`;
}

export const loadGroupMessages = (network, groupId, messagesCount, skip = 0) => {
  return new Promise(async (resolve) => {

    const client = new createClient({ url: getTheGraphApiUrl(network) });
    const messagesQuery = `{
        groupMessages(
          last: ${messagesCount},
          skip: ${skip},
          orderBy: created_at,
          orderDirection: desc,
          where: {
            group_id: "${groupId}",
          }) {
            id
            inner_id
            text
            image
            from_address
            created_at
            reply_message {id, from_address, text, image}
          }
        }`;
    const result = await client.query(messagesQuery).toPromise();
    if (result.data) {
      resolve(result.data?.groupMessages.reverse());
    } else {
      resolve([]);
    }
  });
}

export const loadNewGroupMessages = (network, groupId, lastMessageId) => {
  return new Promise(async (resolve) => {

    const client = new createClient({ url: getTheGraphApiUrl(network) });
    const messagesQuery = `{
        groupMessages(
          orderBy: created_at,
          orderDirection: desc,
          where: {
            group_id: "${groupId}",
            id_num_gt: ${lastMessageId}
          }) {
            id
            inner_id
            text
            image
            from_address
            created_at
            reply_message {id, from_address, text, image}
          }
        }`;
    const result = await client.query(messagesQuery).toPromise();
    if (result.data) {
      resolve(result.data?.groupMessages.reverse());
    } else {
      resolve([]);
    }
  });
}

export const loadSocialProfiles = async (wallet, addressList) => {
  let userList = [];
  let result = {};
  addressList.map(address => {
    userList.push(`${address}/profile/**`);
  });

  const profiles = await wallet.socialContract.get(userList);
  if (profiles) {
    addressList.map(address => {
      result[address] = transformProfile(address, profiles[address] || {});
    });
    return result;
  }
}