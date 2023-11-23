import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import './chat.css';

import del_icon from '../../assets/delete.svg';
import sun_icon from '../../assets/sun.svg';
import moon_icon from '../../assets/moon.svg';

import profile_icon from '../../assets/person.svg';
import logout_icon from '../../assets/logout.svg';
import chat_icon from '../../assets/ChatText.svg';
import ChatContext from '../../context/chatContext';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, isDarkMode, toggleMode } = useContext(AuthContext);
  const { chats, setCurrentChat, clearChats } = useContext(ChatContext);

  const handleNewChat = () => {
    setCurrentChat('new');
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClearConversation = () => {
    clearChats();
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <>
      <div className={`hidden md:block border-e border-[#C6C7F8] w-[282px] h-screen`}>
        <div className="py-5 flex flex-col justify-between w-full h-full">
          <div className="px-5 w-full custom_scroll overflow-y-scroll">
            <button
              onClick={handleNewChat}
              className={`${
                isDarkMode
                  ? 'bg-[#c6c7f8] hover:bg-[#e3e3e3] text-[#1c1c1c]'
                  : ' bg-[#1c1c1c] hover:bg-[#565656] text-white'
              }   py-2 px-4 text-center w-full rounded-xl`}>
              + New Chat
            </button>
            <div className="w-full grid gap-y-1 pt-1">
              {Object.keys(chats).map((chatId) => (
                <div
                  onClick={() => setCurrentChat(chatId)}
                  key={chatId}
                  className={`p-3 flex gap-x-3 items-center cursor-pointer ${
                    isDarkMode ? 'filter invert' : ''
                  }`}>
                  <img className="w-6" src={chat_icon} alt="chats" />
                  <p>{chats[chatId].title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`border-t border-[#C6C7F8] pt-5 px-5`}>
            <div
              className={`flex flex-col items-start gap-y-6 ${isDarkMode ? 'filter invert' : ''}`}>
              <button
                className="flex items-center text-left text-sm gap-x-3"
                onClick={handleClearConversation}>
                <img className="w-6" src={del_icon} alt="delete" /> Clear Conversations
              </button>
              <button onClick={toggleMode} className="flex items-center text-left text-sm gap-x-3">
                <img
                  className="w-6"
                  src={isDarkMode ? sun_icon : moon_icon}
                  alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                />
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button onClick={()=>setIsOpen(!isOpen)} className="flex items-center text-left text-sm gap-x-3">
                <img className="w-6" src={profile_icon} alt="profile" />
                My account
              </button>
              <button
                className="flex items-center text-left text-sm gap-x-3"
                onClick={handleLogout}>
                <img className="w-6" src={logout_icon} alt="logout" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
        <div className={`w-full h-full ${isDarkMode ? 'filter invert bg-white/70' : 'bg-black/70'} absolute z-20 top-0 ${isOpen? 'block' : 'hidden'} `}>
               <div className='w-[80%] md:w-[50%]  lg:w-[30%] mx-auto mt-10 md:mt-20 bg-[#e3e3e3] rounded-2xl p-4  md:p-5 flex flex-col items-center gap-y-4 md:gap-y-5'>
                <p className='py-2 px-3 bg-gray-400 rounded-xl'>
                  username: Username
                </p>
                <p className='py-2 px-3 bg-gray-400 rounded-xl'>
                  password: user password
                </p>

                <button onClick={()=>setIsOpen(false)} className='py-2 w-full bg-black rounded-xl text-white z-40'>
                  Close
                </button>
                </div>   
        </div>

      <div className={`md:hidden block z-10 fixed bottom-0 w-screen my-5 ${isDarkMode ? 'filter invert' : ''}`}>
        <ul className="flex items-center justify-around gap-x-2">
          <li>
            <button onClick={()=>setIsOpen(!isOpen)}>
              <img className="sm:w-6 w-5 h-auto" src={profile_icon} alt="profile" />
            </button>
          </li>

          <li>
            <button onClick={toggleMode}>
              <img
                className="sm:w-6 w-5 h-auto"
                src={isDarkMode ? sun_icon : moon_icon}
                alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              />
            </button>
          </li>

          <li>
            <button
              onClick={handleNewChat}
              className={`bg-[#1c1c1c] hover:bg-gray-600 text-white rounded-full px-4 pb-1  `}>
              <p className="text-3xl text-center">+</p>
            </button>
          </li>

          <li>
            <button onClick={handleClearConversation}>
              <img className="sm:w-6 w-5 h-auto" src={del_icon} alt="delete" />
            </button>
          </li>

          <li>
            <button onClick={handleLogout}>
              <img className="sm:w-6 w-5 h-auto" src={logout_icon} alt="logout" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
