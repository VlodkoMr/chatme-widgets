# ChatMe

Chats & Messages service for NEAR Blockchain

## Install

1. Setup required packages:

```bash
npm install --save urql@3 react-linkify-it graphql@16 react-textarea-autosize@8 @near-wallet-selector/core @near-wallet-selector/ledger @near-wallet-selector/modal-ui @near-wallet-selector/near-wallet @near-wallet-selector/sender @near-wallet-selector/meteor-wallet 
```

2. Copy all files from "src" directory into your project.

3. Import ChatMe component and add into template:

```tsx
import {ChatmeChat} from "./__DIR__/ChatmeChat";
```

```html

<ChatmeChat chatId="{__CHAT_ID__}"
            network="testnet"
            chatBodyClass=""
            connectButtonClass=""
            bottomBlockClass=""
/>
```

NOTE: Replace ```__DIR__``` to you directory destination and ```__CHAT_ID__``` to specific chat id that you receive when create new chat.

## Component Options

chatId: *(required)* - Group or Channel Id. You receive this ID when create new group.

network: *(required)* - "testnet" or "mainnet".

chatBodyClass: *(optional)* - list of classes for chat root element.

connectButtonClass: *(optional)* - list of classes for connect/disconnect buttons.

bottomBlockClass: *(optional)* - list of classes for bottom root block.

## Links

Website: [https://chatme.page](https://chatme.page/)

Testnet Website: [https://test.chatme.page](https://test.chatme.page/)

Documentation: [https://chatme.gitbook.io/chatme](https://chatme.gitbook.io/chatme/)

## License

MIT © [vlodkow](https://github.com/vlodkow)