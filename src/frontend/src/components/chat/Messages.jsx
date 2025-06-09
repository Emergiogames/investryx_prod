import React, { useRef, useEffect, useState } from "react";
import ChatWave from "./chatComponents/ChatWaveReceived";
import Attachments from "./chatComponents/Attachments";
import ChatWaveSend from "./chatComponents/ChatWaveSend";
import ChatWaveReceived from "./chatComponents/ChatWaveReceived"
import AttachmentsRight from "./chatComponents/AttachmentsRight";

function Messages({ messages, user, sendedByImg }) {    
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
                                    // right side
                                    <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                                        <ReceiveMessage message={message} user={user} />
                                    </div>
                                ) : (
                                    // left side
                                    <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                                        <SendMessage message={message} sendedByImg={sendedByImg} /> 
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





//left side
export const SendMessage = ({ message, sendedByImg }) => {
    return (
        <>
            {(message.attachment_type === "image") | (message.attachment_type === "file") ? (
                <>
                    <Attachments message={message} />
                </>
            ) : message.attachment_type === "file" ? (
                <>
                    <div key={message?.id} className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                                <img src={message?.sended_by?.image ? message?.sended_by?.image : "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"} className="rounded-full w-10 h-10" alt="" />
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{message?.message}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : message.attachment_type === null || message.audio === null ? (
                <div key={message?.id} className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                            {/* <img src={sendedByImg ? sendedByImg : "Nil"} className="rounded-full w-10 h-10" alt="" /> */}
                            <img src={message?.sended_by?.image ? message?.sended_by?.image : "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"} className="rounded-full w-10 h-10" alt="" />
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{message?.message}</div>
                        </div>
                    </div>
                </div>
            ) : message.audio ? (
                <>
                    <ChatWaveSend profileImg={sendedByImg} audio={message.audio} />
                </>
            ) : null}
        </>
    );
};

//right side
export const ReceiveMessage = ({ message, user }) => {
    return (
        <>
            {message.attachment_type === "image" || message.attachment_type === "file" ? (
                <>
                    <AttachmentsRight message={message} />
                </>
            ) : message.attachment_type === "file" ? (
                <>
                    <div key={message?.id} className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                                <img src={user?.image || "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"} className="rounded-full w-10 h-10" alt="" />
                            </div>
                            <div className="relative mr-3 text-sm bg-amber-100 py-2 px-4 shadow rounded-xl">
                                <div>{message?.message} hel</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : message.attachment_type === null || message.audio === null ? (
                <div key={message?.id} className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                            <img src={user?.image || "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"} className="rounded-full w-10 h-10" alt="" />
                        </div>
                        <div className="relative mr-3 text-sm bg-amber-100 py-2 px-4 shadow rounded-xl">
                            <div>{message?.message}</div>
                        </div>
                    </div>
                </div>
            ) : message.audio ? (
                <>
                    <div className="flex justify-end">
                        <ChatWaveReceived profileImg = {user?.image} audio={message.audio} />
                    </div>
                </>
            ) : null}
        </>
    );
};

