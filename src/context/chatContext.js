import { createContext, useState } from 'react';

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [currentChat, setCurrentChat] = useState('new');
  const [chats, setChats] = useState(() => {
    const fromLocalStorage = localStorage.getItem('chats');
    return fromLocalStorage ? JSON.parse(fromLocalStorage) : {};
  });

  const addNewChat = (chat) => {
    const id = crypto.randomUUID();
    const newChats = { ...chats, [id]: chat };
    setChats(newChats);
    localStorage.setItem('chats', JSON.stringify(newChats));
    return id;
  };

  const newMessage = (chatId, messages) => {
    const newChats = {
      ...chats,
      [chatId]: {
        ...chats[chatId],
        messages: [...chats[chatId].messages, ...messages],
      },
    };
    setChats(newChats);
    localStorage.setItem('chats', JSON.stringify(newChats));
  };

  const clearChats = () => {
    localStorage.removeItem('chats');
    setCurrentChat('new');
    setChats({});
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        clearChats,
        currentChat,
        setCurrentChat,
        addNewChat,
        newMessage,
      }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
export { ChatProvider };
