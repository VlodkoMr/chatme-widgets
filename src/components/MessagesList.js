import { OneMessage } from "./OneMessage";

export const MessagesList = ({
  messages,
  historyMessages,
  tmpMessages,
  messagesPerPage,
  setReplyToMessage,
  opponent,
  opponentAddress,
  userProfiles,
  wallet
}) => {

  const isLastMessage = (message, index) => {
    return !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
  }

  return (
    <>
      {messages.length >= messagesPerPage && (
        <div className={"w-40 mx-auto text-center"}>
          <button type="button" className={"w-full"}>
            load previous
          </button>
        </div>
      )}

      {historyMessages.map(message => (
          <OneMessage message={message}
                      key={message.id}
                      wallet={wallet}
                      opponent={opponent ? opponent : userProfiles[message.from_address] || null}
                      setReplyToMessage={setReplyToMessage}
                      isLast={false}
          />
        )
      )}

      {messages.map((message, index) => (
          <OneMessage message={message}
                      key={message.id}
                      wallet={wallet}
                      opponent={opponent ? opponent : userProfiles[message.from_address] || null}
                      setReplyToMessage={setReplyToMessage}
                      isLast={isLastMessage(message, index)}
          />
        )
      )}

      {tmpMessages.length > 0 && tmpMessages.filter(tmp => tmp.to_address === opponentAddress).map(tmpMessage => (
          <OneMessage message={tmpMessage}
                      key={tmpMessage.id}
                      wallet={wallet}
                      opponent={opponent}
                      isLast={true}
          />
        )
      )}
    </>
  )
}

