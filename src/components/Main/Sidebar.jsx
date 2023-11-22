import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context";
import { useState } from "react";
import "./chat.css";

import del_icon from "../../assets/delete.svg";
import sun_icon from "../../assets/sun.svg";
import moon_icon from "../../assets/moon.svg";

import profile_icon from "../../assets/person.svg";
import logout_icon from "../../assets/logout.svg";
import chat_icon from "../../assets/ChatText.svg";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [chats, setChats] = useState([]);

  const handleNewChat = () => {
    // ishlatish kere
    const newChat = { id: chats.length + 1, title: `Chat ${chats.length + 1}` };
    setChats([...chats, newChat]);
  };

  const handleClearConversation = () => {
    //ishlatish kere
    console.log("Clearing conversation...");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div
        className={`hidden md:block border-e border-[#C6C7F8] w-[282px] h-screen ${
          isDarkMode ? "bg-[#1c1c1c]" : "bg-inherit"
        }`}
      >
        <div className="py-5 flex flex-col justify-between w-full h-full">
          <div className="px-5 w-full custom_scroll overflow-y-scroll">
            <button
              onClick={handleNewChat}
              className={`${
                isDarkMode
                  ? "bg-[#c6c7f8] hover:bg-[#e3e3e3] text-[#1c1c1c]"
                  : " bg-[#1c1c1c] hover:bg-[#565656] text-white"
              }   py-2 px-4 text-center w-full rounded-xl`}
            >
              + New Chat
            </button>
            <div className="w-full grid gap-y-1 pt-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 flex gap-x-3 items-center cursor-pointer ${
                    isDarkMode ? "filter invert" : ""
                  }`}
                >
                  <img className="w-6" src={chat_icon} alt="chats" />
                  <p>{chat.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`border-t border-[#C6C7F8] pt-5 px-5`}>
            <div
              className={`flex flex-col items-start gap-y-6 ${
                isDarkMode ? "filter invert" : ""
              }`}
            >
              <button
                className="flex items-center text-left text-sm gap-x-3"
                onClick={handleClearConversation}
              >
                <img className="w-6" src={del_icon} alt="delete" /> Clear
                Conversations
              </button>
              <button
                onClick={toggleMode}
                className="flex items-center text-left text-sm gap-x-3"
              >
                <img
                  className="w-6"
                  src={isDarkMode ? sun_icon : moon_icon}
                  alt={isDarkMode ? "Light Mode" : "Dark Mode"}
                />
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button className="flex items-center text-left text-sm gap-x-3">
                <img className="w-6" src={profile_icon} alt="profile" />
                My account
              </button>
              <button
                className="flex items-center text-left text-sm gap-x-3"
                onClick={handleLogout}
              >
                <img className="w-6" src={logout_icon} alt="logout" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden block fixed bottom-0 w-screen my-5">
        <ul className="flex items-center justify-around gap-x-2">
          <li>
            <button>
              <img className="sm:w-6 w-5 h-auto" src={profile_icon} alt="profile" />
            </button>
          </li>

          <li>
            <button onClick={toggleMode}>
              <img
                className="sm:w-6 w-5 h-auto"
                src={isDarkMode ? sun_icon : moon_icon}
                alt={isDarkMode ? "Light Mode" : "Dark Mode"}
              />
            </button>
          </li>

          <li>
            <button
              onClick={handleNewChat}
              className={`${
                isDarkMode
                  ? "bg-[#c6c7f8] hover:bg-[#e3e3e3] text-[#1c1c1c]"
                  : " bg-[#1c1c1c] hover:bg-[#565656] text-white"
              }   rounded-full px-4 pb-1  `}
            >
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
