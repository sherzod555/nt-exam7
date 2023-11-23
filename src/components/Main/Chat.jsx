import { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import send_icon from "../../assets/PaperPlaneRight.svg";
import micro from "../../assets/Microphone.svg";
import img_icon from "../../assets/Image.svg";
import gpt from "../../assets/gpt-logo-green.svg";
import user from "../../assets/person.svg";
import "./chat.css";
import ChatContext from "../../context/chatContext";
import BlackLogo from "../../assets/gpt_black_logo.svg";

import Chats_icon from "../../assets/Chats.svg";
import stars_icon from "../../assets/Star.svg";
import shield_icon from "../../assets/ShieldWarning.svg";

const mockData = [
  {
    image: Chats_icon,
    image_title: "Examples",
    button_one: `"Explain quantum computing insimple terms"`,
    button_two: `"Got any creative ideas for a 10year old's birthday?"`,
    button_three: `"How do I make an HTTP requestin Javascript?"`,
  },
  {
    image: stars_icon,
    image_title: "Capabilities",
    button_one: "Remembers what user saidearlier in the conversation.",
    button_two: "Allows user to provide follow-up corrections.",
    button_three: "Trained to decline inappropriate requests.",
  },
  {
    image: shield_icon,
    image_title: "Limitations",
    button_one: "May occasionally generate incorrect information.",
    button_two:
      "May occasionally produce harmful instructions or biased content.",
    button_three: "Limited knowledge of world andevents after 2021.",
  },
];

export const Chat = () => {
  const [question, setQuestion] = useState("");
  const { isDarkMode } = useContext(AuthContext);
  const { chats, currentChat, setCurrentChat, addNewChat, newMessage } =
    useContext(ChatContext);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const sendRequest = async (question) => {
    const url = "https://open-ai-chatgpt.p.rapidapi.com/ask";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "c43d66f097msh31949b46f979033p1e342bjsn5fa70df41e60",
        "X-RapidAPI-Host": "open-ai-chatgpt.p.rapidapi.com",
      },
      body: JSON.stringify({
        query: question,
      }),
    };

    const response = await fetch(url, options);
    return response.json();
  };

  const handleSendQuestion = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRequest(question);

      if (currentChat === "new") {
        const newChat = {
          title:
            question.length > 18 ? question.substring(0, 18) + "..." : question,
          messages: [
            {
              id: 1,
              text: question,
              type: "user",
            },
            {
              id: 2,
              text: response.response,
              type: "gpt",
            },
          ],
        };
        const newId = addNewChat(newChat);
        setCurrentChat(newId);
      } else {
        newMessage(currentChat, [
          {
            id: chats[currentChat].messages.length + 1,
            text: question,
            type: "user",
          },
          {
            id: chats[currentChat].messages.length + 2,
            text: response.response,
            type: "gpt",
          },
        ]);
      }

      setQuestion("");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto w-[950px] max-h-screen">
      <div
        className={`pt-5 flex flex-col justify-between w-full h-screen md:h-full ${
          isDarkMode ? "filter invert" : ""
        }`}
      >
        <div className="h-full px-5 custom_scroll overflow-y-scroll">
          {chats[currentChat] ? (
            chats[currentChat].messages.map((message) => (
              <div
                key={message.id}
                className={` mb-3 w-[90%] ${
                  message.type === "user"
                    ? "text-left bg-[#F7F9FB] rounded-xl  p-3 mr-[10%]"
                    : "ml-[10%] text-left  bg-[#cecece] rounded-xl  p-3"
                }`}
              >
                {message.type === "user" ? (
                  <div className="flex items-start justify-start gap-x-5">
                    <img
                      className="rounded-full w-8 h-auto"
                      src={user}
                      alt="user"
                    />{" "}
                    {message.text}
                  </div>
                ) : (
                  <div className="flex items-start justify-end gap-x-5">
                    {message.text}{" "}
                    <img
                      className="rounded-full w-8 h-auto"
                      src={gpt}
                      alt="gpt"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-y-8 md:gap-y-16 items-center justify-center h-full">
              <div className="flex items-center gap-x-4">
                <img className="w-10 h-10 md:w-16 md:h-16" src={BlackLogo} alt="logo" />
                <div>
                  <h2 className="text-xl md:text-5xl font-semibold">ChatGPT</h2>
                  <p className="text-[10px] text-right font-semibold">
                    by{" "}
                    <a
                      target="_blank"
                      href="https://www.youtube.com/@sherzodyodgorov"
                    >
                      sher_555
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-x-3 md:gap-x-10">
                {mockData.map((item) => (
                  <div className=" lg:w-64 grid gap-y-2 md:gap-y-4">
                    <div className="flex flex-col items-center justify-center gap-y-1 md:gap-y-2" key={item.id}>
                      <img className="w-5 h-5 md:w-8 md:h-8" src={item.image} alt={item.image_title} />
                      <p className="sm:text-sm text-xs lg:text-lg font-medium md:font-semibold">{item.image_title}</p>
                    </div>
                    <button className="text-left w-full bg-[#F7F9FB] py-1 px-2 text-[9px] lg:text-sm rounded-lg hover:shadow-md">{item.button_one}</button>
                    <button className="text-left w-full bg-[#F7F9FB] py-1 px-2 text-[9px] lg:text-sm rounded-lg hover:shadow-md">{item.button_two}</button>
                    <button className="text-left w-full bg-[#F7F9FB] py-1 px-2 text-[9px] lg:text-sm rounded-lg hover:shadow-md">{item.button_three}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-5">
          <form
            onSubmit={handleSendQuestion}
            className=" w-full mb-20 md:mb-10 mt-1 p-5 bg-[#F7F9FB] rounded-2xl flex items-center justify-between gap-x-3 "
          >
            <div className="flex items-center gap-x-4 w-full">
              <img className="w-5 h-5 cursor-pointer" src={micro} alt="micro" />
              <img
                className="w-5 h-5 cursor-pointer"
                src={img_icon}
                alt="img"
              />
              <input
                className="outline-none w-full bg-inherit"
                type="text"
                value={question}
                onChange={handleInputChange}
                placeholder="Type message"
              />
            </div>
            <button type="submit">
              <img src={send_icon} alt="send" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
