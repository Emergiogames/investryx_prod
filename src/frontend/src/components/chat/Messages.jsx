import React, { useRef, useEffect, useState } from "react";

function Messages({ messages, user,
   sendedByImg
   }) {
  console.log('7777777', sendedByImg);
  
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to the last message on messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <>
            <div className="flex flex-col h-full overflow-y-auto mb-4">
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                        {messages?.length !== 0 &&
                            [...messages].reverse().map((message, index) => {
                                const isUserMessage = message?.sended_by?.id === user.id || message?.sendedBy === user.id;

                                return isUserMessage ? (
                                    <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                                        <ReceiveMessage message={message} user={user} />
                                    </div>
                                ) : (
                                    <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                                        <SendMessage message={message} 
                                        sendedByImg={sendedByImg}
                                        />
                                    </div>
                                );
                            })}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messages;

export const SendMessage = ({ message, 
  sendedByImg
 }) => {
    return (
        <>
            <div key={message?.id} className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                        <img src={sendedByImg ? sendedByImg : "Nil"} className="rounded-full w-10 h-10" alt="" />
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>{message?.message}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const ReceiveMessage = ({ message, user }) => {
    return (
        <>
            <div key={message?.id} className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                        <img src={user?.image} className="rounded-full w-10 h-10" alt="" />
                    </div>
                    <div className="relative mr-3 text-sm bg-amber-100 py-2 px-4 shadow rounded-xl">
                        <div>{message?.message}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

{
    /* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                    A
                  </div>
                  <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Vel ipsa commodi illum saepe numquam maxime asperiores
                      voluptate sit, minima perspiciatis.
                    </div>
                  </div>
                </div>
              </div> */
}

{
    /* <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <div class="flex items-center justify-start flex-row-reverse">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                    A
                  </div>
                  <div class="relative mr-3 text-sm bg-amber-100 py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                  </div>
                </div>
              </div> */
}
{
    /* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                    A
                  </div>
                  <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>Lorem ipsum dolor sit amet !</div>
                  </div>
                </div>
              </div> */
}
{
    /* <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <div class="flex items-center justify-start flex-row-reverse">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                    A
                  </div>
                  <div class="relative mr-3 text-sm bg-amber-100 py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                    <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                      Seen
                    </div>
                  </div>
                </div>
              </div> */
}
{
    /* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                    A
                  </div>
                  <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis, in.
                    </div>
                  </div>
                </div>
              </div> */
}
{
    /* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                    A
                  </div>
                  <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div class="flex flex-row items-center">
                      <button class="flex items-center justify-center bg-yellow-400 hover:bg-indigo-800 rounded-full h-8 w-10">
                        <svg
                          class="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                      <div class="flex flex-row items-center space-x-px ml-4">
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-12 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-6 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-5 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-3 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                        <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */
}
