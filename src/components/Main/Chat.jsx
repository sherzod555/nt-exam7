import React, { useState } from "react";
import send_icon from "../../assets/PaperPlaneRight.svg";
import micro from "../../assets/Microphone.svg";
import img_icon from "../../assets/Image.svg";
import gpt from "../../assets/gpt-logo-green.svg";
import user from "../../assets/person.svg";


export const Chat = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSendQuestion = async () => {
    const url = "https://open-ai-chatgpt.p.rapidapi.com/ask";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "b40207ed57msh5b1111125dadd92p169be0jsn29e821f237fb",
        "X-RapidAPI-Host": "open-ai-chatgpt.p.rapidapi.com",
      },
      body: JSON.stringify({
        query: question,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const newChat = [
        ...chatHistory,
        { type: "user", message: question },
        { type: "gpt", message: result },
      ];
      setChatHistory(newChat);
      setQuestion("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto w-[950px]">
      <div className="p-10 flex flex-col justify-between w-full h-full">
        <div>
          {/* {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={
                chat.type === "user" ? "text-left mb-2 bg-[#F7F9FB] rounded-xl  p-3" : "text-right mb-2 bg-[#cecece] rounded-xl  p-3"
              }
            >
              {chat.message}
            </div>
          ))} */}
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-2 w-[90%] ${
                chat.type === "user" ? "text-left bg-[#F7F9FB] rounded-xl  p-3 mr-[10%]" : "ml-[10%] text-right  bg-[#cecece] rounded-xl  p-3"
              }`}
            >
              {chat.type === "user" ? (
                <div className="flex items-start gap-x-5"><img className="rounded-full w-8 h-auto" src={user} alt="user" /> {chat.message}</div>
              ) : (
                <div className="flex items-start gap-x-5">{chat.message} <img className="rounded-full w-8 h-auto" src={gpt} alt="gpt" /></div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full p-5 bg-[#F7F9FB] rounded-2xl flex items-center justify-between gap-x-3 ">
          <div className="flex items-center gap-x-4 w-full">
            <img className="w-5 h-5 cursor-pointer" src={micro} alt="micro" />
            <img className="w-5 h-5 cursor-pointer" src={img_icon} alt="img" />
            <input
              className="outline-none w-full bg-inherit"
              type="text"
              value={question}
              onChange={handleInputChange}
              placeholder="Type message"
            />
          </div>
          <button onClick={handleSendQuestion}>
            <img src={send_icon} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
