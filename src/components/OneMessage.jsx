import { timestampToDate, timestampToTime } from "../utils/datetime";
import { Avatar } from "./Avatar";
import { decodeMessageText, mediaURL } from "../utils/transform";
import { LinkItUrl } from "react-linkify-it";

export const OneMessage = ({ message, opponent, isLast, setReplyToMessage, wallet }) => {

  const handleSpamReport = () => {
    if (confirm("Do you want to Report Spam in this message?")) {
      wallet.chatmeContract.spamReport(message.id, message.from_address).then(() => {
        message.text = "*Spam report sent"
      });
    }
  }

  const MessageAction = ({ children }) => (
    <button type="button" className={"hidden group-hover:block flex flex-shrink-0 focus:outline-none mr-2 block rounded-full " +
      "text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"}>{children}</button>
  );

  return (
    <>
      {message.isFirst && !message.isTemporary && (
        <p className="p-4 text-center text-sm font-medium text-gray-500">
          {timestampToDate(message.created_at, 'long')}
        </p>
      )}

      <div className={`flex flex-row mb-2 justify-start ${message.isMy ? "justify-end" : "justify-start"}`}>
        <div className="hidden md:block md:w-10 md:h-10 relative flex flex-shrink-0 mr-4">
          {!message.isMy && message.isFirst && (
            <Avatar media={opponent?.image || ""} title={message.from_address}/>
          )}
        </div>

        <div className="messages text-sm text-white grid grid-flow-row gap-2">
          {message.isFirst && !message.isMy && (
            <div className={"text-gray-400 font-medium leading-3"}>
              {opponent?.name ? (
                <>{opponent?.name} <small className={"opacity-60"}>({message.from_address})</small></>
              ) : (
                <>{opponent?.id || message.from_address}</>
              )}
            </div>
          )}

          <div className={`flex items-center group relative ${message.isMy ? "" : "flex-row-reverse justify-end"}`}>
            {message.isTemporary && (
              <div className={"mr-1 text-gray-400 opacity-60 w-4 h-4"}>
                <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path
                    d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </div>
            )}

            {wallet.isSigned && !message.isMy && !message.isEncryptStart && !message.isEncryptAccept && !message.isEncryptEnd && (
              <>
                <MessageAction onClick={() => handleSpamReport()} title={"Spam Report"}>
                  <div className={"text-xl leading-4 font-semibold transition w-full h-full"}>!</div>
                </MessageAction>

                <MessageAction onClick={() => setReplyToMessage(message)} title={"Reply"}>
                  <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                  </svg>
                </MessageAction>
              </>
            )}

            <div className={`max-w-[260px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl whitespace-pre-wrap px-5 
              overflow-ellipsis text-base relative min-h-[46px] text-gray-100
              ${message.text === '(like)' ? "py-2.5" : "py-3"}
              ${message.isFirst && message.isMy ? "rounded-t-3xl" : ""}
              ${isLast ? "rounded-b-3xl" : ""}
              ${message.isTemporary ? "opacity-70" : ""}
              ${message.isMy ? "bg-sky-500/50 rounded-l-3xl ml-2" : "bg-gray-700/60 rounded-r-3xl mr-2"}
              ${message.isEncryptStart || message.isEncryptAccept || message.isEncryptEnd ? "bg-red-600/30" : ""}
            `}>

              {message.reply_message && (
                <p className={"border-b border-gray-200/20 mb-2 pb-1 text-sm opacity-50"}>
                  <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current inline mr-1">
                    <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                  </svg>
                  <b className={"mr-2"}>{message.reply_message.from_address}</b>
                  <span className={"whitespace-nowrap overflow-hidden max-w-[260px] overflow-ellipsis inline-block align-bottom"}>
                    {decodeMessageText(message.reply_message, accountId)}
                  </span>
                </p>
              )}

              <div className={"flex justify-between"}>
                <p>
                  {decodeMessageText(message, accountId) === '(like)' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current inline">
                      <path
                        d="M2 10h3v10H2zm17-1h-5V4a1 1 0 0 0-1-1h-1L7.66473 8.37579A3.00021 3.00021 0 0 0 7 10.259V18a2 2 0 0 0 2 2h6.43481a2.99991 2.99991 0 0 0 2.69037-1.67273L21 12.5V11a2 2 0 0 0-2-2Z"/>
                    </svg>
                  ) : (
                    <LinkItUrl className={`text-blue-300 hover:underline`}>
                      {decodeMessageText(message, accountId)}
                    </LinkItUrl>
                  )}
                </p>

                <span className={"ml-2.5 leading-6 text-xs opacity-40"}>
                  {timestampToTime(message?.created_at)}
                </span>
              </div>

              {message.image && (
                <img alt=""
                     src={mediaURL(message.image)}
                     className={"h-[220px] min-w-[100px] rounded-lg mt-2 mb-3 object-contain"}
                />
              )}

              {message.encrypt_key && (
                <img src={require("../assets/images/lock.svg")}
                     alt=""
                     className={`absolute fill-current w-4 h-4 top-0 ${message.isMy ? "-left-1" : "-right-1"}`}/>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}