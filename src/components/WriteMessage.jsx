import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const WriteMessage = ({
  wallet, toAddress, toGroup, onMessageSent, replyToMessage, setReplyToMessage
}) => {
  const inputRef = useRef(null);
  const [messageText, setMessageText] = useState("");

  const sendMessage = (messageText) => {
    let sendFunction;
    const replyId = replyToMessage ? replyToMessage.id : "";
    messageText = messageText.trim();

    if (!messageText.length) {
      alert("Please provide message text or upload media");
      return false;
    }

    sendFunction = toAddress ? "sendPrivateMessage" : "sendGroupMessage"
    wallet.chatmeContract[sendFunction](messageText, "", toAddress || toGroup.id, replyId).catch(e => {
      console.log(e);
      // add retry...
      alert('Error: Message not sent');
    });

    onMessageSent?.(messageText, "");
    setMessageText("");
    setReplyToMessage(null);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [replyToMessage, toAddress, toGroup?.id]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(value);
      return false;
    }
  }

  return (
    <div className={`chat-footer flex-non relative text-blue-500`}>

      <div className="flex flex-row items-end p-2 relative">
        <div className="relative flex-grow md:ml-4">
          <label>
            {replyToMessage && (
              <div onClick={() => setReplyToMessage(null)}
                   className={`absolute left-1 top-1 w-32 rounded-full p-[6px] flex flex-row text-sm text-gray-200 bg-gray-700/80`}>
                <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current opacity-50 ml-1 mt-0.5">
                  <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                </svg>
                <span className={"whitespace-nowrap overflow-ellipsis w-20 overflow-hidden ml-1.5 pt-0.5"}>
                  {replyToMessage.from_address}
                </span>
              </div>
            )}

            <TextareaAutosize placeholder="Aa"
                              autoFocus
                              ref={inputRef}
                              maxRows={10}
                              className={`rounded-3xl py-2 pl-4 pr-10 w-full border text-base focus:outline-none text-sm
                              ${replyToMessage ? "pl-36" : ""}
                              text-gray-100 focus:shadow-md transition duration-300 ease-in border-gray-700/60 bg-gray-900/30 focus:bg-gray-900/60`}
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              onKeyDown={handleTextChange}
            />
          </label>
        </div>

        <button type="button"
                className={`flex flex-shrink-0 focus:outline-none mx-2 ml-4 block md:w-7 md:h-7 mb-3.5 hover:text-blue-600`}>
          {messageText.length > 0 ? (
            <svg onClick={() => sendMessage(messageText)}
                 viewBox="0 0 24 24"
                 className={"fill-current"}
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="m21.5 11.1-17.9-9c-.9-.4-1.9.4-1.5 1.3l2.5 6.7L16 12 4.6 13.9l-2.5 6.7c-.3.9.6 1.7 1.5 1.2l17.9-9c.7-.3.7-1.3 0-1.7z"/>
            </svg>
          ) : (
            <svg onClick={() => sendMessage("(like)")}
                 className={"fill-current"}
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <path
                d="M2 10h3v10H2zm17-1h-5V4a1 1 0 0 0-1-1h-1L7.66473 8.37579A3.00021 3.00021 0 0 0 7 10.259V18a2 2 0 0 0 2 2h6.43481a2.99991 2.99991 0 0 0 2.69037-1.67273L21 12.5V11a2 2 0 0 0-2-2Z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
