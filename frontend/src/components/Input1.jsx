import React from "react";
import SendIcon from "@mui/icons-material/Send";import axios from "axios"
import { useState, useEffect } from "react";
import Footer from "./Footer";

const Input1 = () => {

    const [input, setInput] = useState("")
    const [hasStartedChat, setHasStartedChat] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const inputs = await axios.get(
                  "http://192.168.200.155:3000/getinput"
                );
                const responses = await axios.get("http://192.168.200.155:3000/getresponse");
                
                if (inputs.data.length > 0) {
                    setHasStartedChat(true);
                    const chat = [];
                    inputs.data.forEach((item, i) => {
                        chat.push({ type: 'user', text: item.input });
                        if (responses.data[i]) {
                            chat.push({ type: 'bot', text: responses.data[i].response });
                        }
                    });
                    setConversations(chat);
                }
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, [])
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const newConversations = [...conversations, { type: 'user', text: input }];
            setConversations(newConversations);
            setHasStartedChat(true);
            
            try {
                await axios.post("http://192.168.200.155:3000/input", {
                  input,
                  history: conversations,
                });
                const response = await axios.get("http://192.168.200.155:3000/getresponse");
                const latestResponse = response.data[response.data.length - 1]?.response || 'No response';
                setConversations(prev => [...prev, { type: 'bot', text: latestResponse }]);
            } catch (error) {
                setConversations(prev => [...prev, { type: 'bot', text: 'Error' }]);
            }
            
            setInput("");
        }
    }




  if (!hasStartedChat) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={handlesubmit}
          className="w-full max-w-4xl h-[200px] flex flex-col justify-center items-center bg-white text-black border rounded px-3 py-2"
        >
          <h2 className="text-xl mb-4">Hello Welcome</h2>
          <div className="flex w-full max-w-2xl">
            <input
              type="text"
              value={input}
              className="flex-1 h-[70px] bg-white text-black border rounded px-3 py-2"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-white font-bold px-4">
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    );
  }

    return (
      <>
        <div className="flex flex-col h-screen overflow-hidden ">
          <div className="overflow-y-auto px-4 md:px-[100px] lg:px-[200px] xl:px-[358px] pb-20 custom-scrollbar h-[90%]">
            <div className="flex flex-col gap-4">
              {conversations.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user" ? "justify-end " : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 border-none max-w-[85%] md:max-w-[70%] ${
                      msg.type === "user"
                        ? "text-white bg-gradient-to-r from-[#c36e74] to-[#b02dc4] rounded-t-[10px] rounded-l-[10px]"
                        : "bg-[#222021] text-white rounded-t-[10px] rounded-r-[10px]"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" bg-black  fixed bottom-0 left-0 right-0 h-[10%] pb-2">
            <div className="relative max-w-4xl mx-auto px-4 md:px-[40px]">
              <form onSubmit={handlesubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  className="flex-1 p-3 text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Send message"
                />
                <button
                  type="submit"
                  className="absolute right-8 px-4 py-3   text-white rounded-lg "
                >
                  <SendIcon />
                </button>
              </form>
            </div>
            <Footer />
          </div>
        </div>
      </>
    );
};

export default Input1;
