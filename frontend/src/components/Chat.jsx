import React, { useState, useEffect } from "react";

const Chat = () => {
    const [userInput, setUserinput] = useState([]);
    const [userResponse, setUserResponse] = useState([]);
    const [searchInput, setSearchInput] = useState("");

     const fetchData = async () => {
       try {
         const response = await fetch("http://localhost:3000/getinput");
         const data = await response.json();
         setUserinput(data); // Set entire array
         console.log(data);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
    };
     const fetchResponse = async () => {
       try {
         const response = await fetch(
           "http://192.168.200.155:3000/getresponse"
         );
         const data = await response.json();
         setUserResponse(data); // Set entire array
         console.log(data);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

     const handleSubmit = (e) => {
       e.preventDefault();
     };
  useEffect(() => {
    fetchResponse();
    fetchData();
  }, []);

  useEffect(() => {
    if (searchInput) {
      fetchData();
      fetchResponse();
    }
  }, [searchInput]);

    return (
      <>
        <div className="flex flex-col h-[70%] border-red p-[50px] ">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {userInput.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-end">
                    <div className="bg-blue-100 p-3 rounded max-w-[50%]">
                      <h1 className="text-right">{item.input}</h1>
                    </div>
                  </div>
                  {userResponse[index] && (
                    <div className="flex justify-start mt-2">
                      <div className="bg-gray-100 p-3 rounded max-w-[50%]">
                        <h1 className="text-left">
                          {userResponse[index].response}
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t">
       
          </div>
        </div>
      </>
    );
};

export default Chat;
