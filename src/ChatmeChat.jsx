import React, { useEffect, useRef, useState } from "react";
import { Wallet } from "./near/wallet";
import { chatmeContractAddress, MainContract } from "./near/mainContract";
import { socialContractAddress, SocialDBContract } from "./near/socialContract";
import { loadGroupInfo, loadGroupMessages, loadNewGroupMessages, loadSocialProfiles } from "./utils/requests";
import { generateTemporaryMessage, getInnerId, onlyUnique, transformMessages } from "./utils/transform";
import { MessagesList } from "./components/MessagesList";
import { GroupChatBottom } from "./components/GroupChatBottom";

import "./assets/css/styles.css";
import { Loader } from "./components/Loader";
import { timestampToDate } from "./utils/datetime";

const fetchSecondsInterval = 5;
const messagesPerPage = 100;

const ChatmeChat = ({ chatId, network, chatBodyClass, connectButtonClass, bottomBlockClass }) => {
  const bottomRef = useRef(null);
  const walletInterface = new Wallet({ createAccessKeyFor: chatmeContractAddress(network) });
  const [wallet, setWallet] = useState({
    interface: null,
    isSigned: false,
    accountId: "",
    chatmeContract: {},
    socialContract: {},
  });

  const [isReady, setIsReady] = useState(false);
  const [group, setGroup] = useState();
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [historyPage, setHistoryPage] = useState(0);
  const [hideHistoryButton, setHideHistoryButton] = useState(false);
  const [tmpMessages, setTmpMessages] = useState([]);
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
  const [reloadCounter, setReloadCounter] = useState(0);

  const initWallet = async () => {
    const chatmeInterface = new MainContract({
      contractId: chatmeContractAddress(network),
      walletToUse: walletInterface
    });
    const socialInterface = new SocialDBContract({
      contractId: socialContractAddress(network),
      walletToUse: walletInterface
    });
    const walletConnect = await walletInterface.startUp();

    setWallet({
      interface: walletInterface,
      isSigned: walletConnect,
      accountId: walletInterface.accountId,
      chatmeContract: chatmeInterface,
      socialContract: socialInterface,
    });
  }

  useEffect(() => {
    initWallet().then(() => {
      setReplyToMessage(null);
      setTmpMessages([]);
    });
  }, [chatId]);

  // useEffect(() => {
  //   const subscription = wallet.walletSelector.store.observable.subscribe(async (nextAccounts) => {
  //     if (nextAccounts.accounts.length) {
  //       await wallet.onAccountChange(nextAccounts.accounts[0].accountId);
  //       setIsSigned(true);
  //
  //       loadAccount().then(account => {
  //         setAccount(account);
  //       });
  //     } else {
  //       setIsSigned(false);
  //       setAccount(null);
  //     }
  //   });
  //
  //   return () => subscription.unsubscribe();
  // }, []);

  useEffect(() => {
    if (wallet.interface) {
      Promise.all([
        loadGroupInfo(wallet, chatId),
        loadGroupMessages(network, chatId, messagesPerPage)
      ]).then(result => {
        const group = result[0];
        const messages = result[1];

        setGroup(group);
        setMessages(transformMessages(messages, wallet?.accountId));

        const profiles = messages.map(message => message.from_address).filter(onlyUnique);
        loadSocialProfiles(wallet, profiles).then(result => {
          if (result) {
            setUserProfiles(result);
          }
        });

        setIsReady(true);
      })

      // Get new messages each few seconds
      const updateInterval = setInterval(() => {
        setReloadCounter(prev => prev + 1);
      }, 1000 * fetchSecondsInterval);

      return () => {
        clearInterval(updateInterval);
      }
    }
  }, [wallet.interface]);

  useEffect(() => {
    if (reloadCounter) {
      appendNewChatMessages();
    }
  }, [reloadCounter]);

  useEffect(() => {
    setTimeout(() => {
      let behavior = { behavior: 'auto' };
      if (reloadCounter > 0) {
        behavior = { behavior: 'smooth' };
      }
      bottomRef.current?.scrollIntoView(behavior);
    }, 100);
  }, [messages, tmpMessages]);

  const appendNewChatMessages = () => {
    const lastMessage = messages[messages.length - 1] || null;
    const lastMessageId = lastMessage?.id || 0;

    loadNewGroupMessages(network, chatId, lastMessageId).then(messages => {
      if (messages && messages.length) {
        // load new user profiles
        const profiles = messages.filter(message => !userProfiles[message.from_address])
          .map(message => message.from_address)
          .filter(onlyUnique);

        loadSocialProfiles(wallet, profiles).then(result => {
          if (result) {
            setUserProfiles(prev => {
              return { ...prev, ...result };
            });
          }
        });

        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.inner_id);
        setTmpMessages(prev => prev.filter(msg => {
          const innerId = getInnerId(msg.text, msg.image, chatId);
          return newMessageIds.indexOf(innerId) === -1;
        }));

        // append new messages
        const newMessages = transformMessages(messages, wallet.accountId, timestampToDate(lastMessage?.created_at));
        setMessages(prev => prev.concat(newMessages));
      }
    });
  }

  // Add temporary message
  const appendTemporaryMessage = (text, image) => {
    const tmpMessage = generateTemporaryMessage(text, image, wallet.accountId, chatId);
    setTmpMessages(prev => prev.concat(tmpMessage));
  }

  // load previous messages
  const loadHistoryMessages = () => {
    setHideHistoryButton(true);
    setHistoryPage(prev => prev + 1);

    const skipMessages = messagesPerPage * (historyPage + 1);
    loadGroupMessages(id, messagesPerPage, skipMessages).then(messages => {
      const newMessages = transformMessages(messages, wallet.accountId);
      if (newMessages.length === messagesPerPage) {
        setHideHistoryButton(false);
      }

      setHistoryMessages(prev => {
        prev.unshift(...newMessages);
        return prev;
      });
    });
  }

  return (
    <>
      <div className={`flex-1 flex flex-col overflow-y-scroll ${chatBodyClass ? chatBodyClass : "chat-body p-4"}`}>
        {isReady ? (
          <div className={"min-h-[400px]"}>
            {(messages.length || tmpMessages.length) ? (
              <MessagesList wallet={wallet}
                            messages={messages}
                            historyMessages={historyMessages}
                            tmpMessages={tmpMessages}
                            messagesPerPage={messagesPerPage}
                            setReplyToMessage={setReplyToMessage}
                            userProfiles={userProfiles}
                            opponentAddress={chatId}
                            loadHistoryMessages={loadHistoryMessages}
                            hideHistoryButton={hideHistoryButton}
              />
            ) : (
              <div className={"text-center text-sm opacity-60 pt-2"}>
                *No Messages
              </div>
            )}
          </div>
        ) : (
          <div className={"mx-auto w-8 pt-2"}>
            <Loader/>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {isReady && (
        <GroupChatBottom wallet={wallet}
                         group={group}
                         network={network}
                         replyToMessage={replyToMessage}
                         setReplyToMessage={setReplyToMessage}
                         connectButtonClass={connectButtonClass}
                         bottomBlockClass={bottomBlockClass}
                         onMessageSent={appendTemporaryMessage}
        />
      )}
    </>
  );
};

export default ChatmeChat;