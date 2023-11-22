import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context";
import { useState } from "react";
import "./chat.css"

import del_icon from "../../assets/delete.svg";
import sun_icon from "../../assets/sun.svg";
import profile_icon from "../../assets/person.svg";
import logout_icon from "../../assets/logout.svg";
import chat_icon from "../../assets/ChatText.svg";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [chats, setChats] = useState([]);

  const handleNewChat = () => {
    // Implement logic to create a new chat
    const newChat = { id: chats.length + 1, title: `Chat ${chats.length + 1}` };
    setChats([...chats, newChat]);
  };

  const handleClearConversation = () => {
    console.log("Clearing conversation...");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="border-e border-[#C6C7F8] w-[282px]  h-screen">
      <div className="py-5 flex flex-col justify-between w-full h-full">
        <div className="px-5 w-full custom_scroll overflow-y-scroll">
          <button
            onClick={handleNewChat}
            className="bg-black hover:bg-[#565656] text-white py-2 px-4 text-center w-full rounded-xl"
          >
            + New Chat
          </button>
          <div className="w-full grid gap-y-1 pt-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="p-3 flex gap-x-3 items-center cursor-pointer"
              >
                <img className="w-6" src={chat_icon} alt="chats" />
                <p>{chat.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-y-6 border-t border-[#C6C7F8] pt-5 px-5">
          <button
            className="flex items-center text-sm gap-x-3"
            onClick={handleClearConversation}
          >
            <img className="w-6" src={del_icon} alt="delete" /> Clear
            Conversation
          </button>
          <button className="flex items-center text-sm gap-x-3">
            <img className="w-6" src={sun_icon} alt="sun" />
            Light Mode
          </button>
          <button className="flex items-center text-sm gap-x-3">
            <img className="w-6" src={profile_icon} alt="profile" />
            My account
          </button>
          <button
            className="flex items-center text-sm gap-x-3"
            onClick={handleLogout}
          >
            <img className="w-6" src={logout_icon} alt="logout" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
