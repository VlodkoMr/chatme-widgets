import React, { useEffect, useState } from "react";
import { WriteMessage } from "./WriteMessage";
import { Loader } from "./Loader";
import { loadGroupsIdList } from "../utils/requests";
import { Avatar } from "./Avatar";

export const GroupChatBottom = ({
  wallet, group, replyToMessage, setReplyToMessage, onMessageSent, network,
  connectButtonClass, bottomBlockClass
}) => {

  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatmeURL = network === "testnet" ? "https://test.chatme.page" : "https://chatme.page";

  useEffect(() => {
    if (!isChannel()) {
      setIsJoined(group.members.indexOf(wallet.accountId) !== -1);
    } else {
      loadGroupsIdList(wallet).then(myGroups => {
        let idList = myGroups.map(group => group.id);
        setIsJoined(idList.indexOf(group.id) !== -1);
      })
    }
  }, [group.id]);

  const isChannel = () => {
    return group.group_type === "Channel";
  }

  const joinChannel = () => {
    setIsLoading(true);
    const methodName = isChannel() ? "joinPublicChannel" : "joinPublicGroup";

    wallet.chatmeContract[methodName](group.id).then(result => {
      console.log(`join`);
      setIsJoined(true);
      setIsLoading(false);
    });
  }

  const leaveChannel = () => {
    setIsLoading(true);
    const methodName = isChannel() ? "leaveChannel" : "leaveGroup";

    wallet.chatmeContract[methodName](group.id).then(result => {
      console.log(`leave`);
      setIsJoined(false);
      setIsLoading(false);
    });
  }

  const canWriteMessages = () => {
    console.log(`wallet.accountId`, wallet.accountId);
    if (group.owner === wallet.accountId) {
      return true;
    }
    if (!isChannel()) {
      return isJoined;
    }
    return false;
  }

  return (
    <div className={bottomBlockClass ? bottomBlockClass : `border-t-2 border-gray-700/40 bg-gray-800 py-3`}>
      {wallet.isSigned ? (
        <div className={"flex flex-row"}>
          <div className={"w-48 text-left pl-5 flex flex-row gap-3 pt-2"}>
            <a className={"block w-10 h-10"} href={chatmeURL} target={"_blank"}>
              <Avatar title={wallet.accountId}/>
            </a>
            <div className={"text-sm w-32 overflow-hidden leading-4 pt-1"}>
              <a href={chatmeURL}
                 className={"block font-semibold w-32 mb-0.5 overflow-hidden overflow-ellipsis whitespace-nowrap hover:opacity-90 transition"}>
                {wallet.accountId}{wallet.accountId}
              </a>
              <small onClick={() => wallet.interface.signOut()}
                     className={"cursor-pointer text-red-400 hover:text-red-300 transition"}>
                Disconnect
              </small>
            </div>
          </div>
          <div className={"flex-1"}>
            {canWriteMessages() ? (
              <WriteMessage wallet={wallet}
                            toGroup={group}
                            replyToMessage={replyToMessage}
                            setReplyToMessage={setReplyToMessage}
                            onMessageSent={onMessageSent}
              />
            ) : (
              <>
                {(group.edit_members && group.group_type !== "Private") && (
                  <div className={"px-6 py-4 border-t-2 border-gray-700/30 flex flex-row justify-between"}>
                    {isJoined ? (
                      <>
                        <p className={"text-sm w-2/3 opacity-60"}>{group.text}</p>
                        <button onClick={() => leaveChannel()}>
                          Leave {isChannel() ? "Channel" : "Group"}
                          {isLoading && (<span className={"ml-2"}><Loader size={"sm"}/></span>)}
                        </button>
                      </>
                    ) : (
                      <>
                        <p className={"text-sm w-2/3 opacity-60"}>{group.text}</p>
                        <button onClick={() => joinChannel()}>
                          Join {isChannel() ? "Channel" : "Group"}
                          {isLoading && (<span className={"ml-2"}><Loader size={"sm"}/></span>)}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={"text-center"}>
          <button
            className={connectButtonClass ? connectButtonClass : `bg-gray-700 hover:bg-gray-600/80 px-6 py-2.5 rounded-lg`}
            onClick={() => wallet.interface.signIn()}>
            Connect Account
          </button>
        </div>
      )}
    </div>
  );
}

