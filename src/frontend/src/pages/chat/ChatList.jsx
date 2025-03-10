import React, { useEffect, useRef, useState } from "react";
import { getClickRoom, getAllRooms, getApersonChat, getCurrentChat } from "../../services/userChat/apiMethods";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_CHAT } from "../../constants/baseUrls";
import { useSelector } from "react-redux";
import Messages from "../../components/chat/Messages";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import useSound from "use-sound";
import sendSound from "/animations/happy-pop.mp3";
import { roomsWebSocket } from "../../utils/context/reducers/authSlice";
import { CgSearchLoading } from "react-icons/cg";
import { ShimmerLoader } from "../../components/accessories/chatShimmer/ChatShimmer";
import RoomsShimmer from "../../components/accessories/chatShimmer/RoomsShimmer";

function ChatList() {
    const location = useLocation();
    const navigate = useNavigate();
    const [playSendSound] = useSound(sendSound);
    const { roomData } = location.state || {}; //contain data that when one new connection happens//been send from viewposts-
    //only when coming from viewposts
    const [roomsData, setRoomsData] = useState([]); //navbar chats
    const [websocket, setWebSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(0); //inside chat, to pass id of selected chatroom
    const [currentChat, setCurrentChat] = useState([]); //to setup the current chat
    const [loading, setLoading] = useState(false);
    const [sendedByImg, setSendedByImg] = useState(null);//for sended by users image(as in ws not image been passed)
    

    // console.log("roomz data from single connect requst::", roomData);
    // console.log("%c all messages", "color: yellow", messages);
    // console.log("%c roomsData", "color: violet", roomsData);
    // console.log("%c current id", "color: green", roomId);
    // console.log("%c currentChat", "color: brown", currentChat);

    const currentUser = (state) => state.auth.user;
    const user = useSelector(currentUser);

    const myToken = (state) => state.auth.token;
    const token = useSelector(myToken);

    //getting all rooms data for general accessing(chats i am having in navbar with last message)
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const fullRooms = await getAllRooms();
                if (fullRooms.status === 200) {
                    setRoomsData(fullRooms.data);
                }
            } catch (error) {
                console.error("Something went wrong", error.message);
            }
        };
        fetchRooms();
    }, []);

    //update of latest /rooms messages
    const myRoomData = (state) => state.auth.roomsWebSocket;
    const roomdata = useSelector(myRoomData);

    useEffect(() => {
        if (roomdata) {
            setRoomsData((prevRoomsData) => {
                const roomId = roomdata.id || roomdata.room?.id;

                if (!roomId) return prevRoomsData;

                const index = prevRoomsData.findIndex((room) => room.id === roomId);
                console.log("huuu", index);

                if (index !== -1) {
                    const updatedRoomsData = [...prevRoomsData];
                    updatedRoomsData[index] = {
                        ...prevRoomsData[index],
                        last_msg: roomdata.last_msg,
                        updated: roomdata.updated,
                    };
                    return updatedRoomsData;
                } else {
                    return [...prevRoomsData, roomdata];
                }
            });
        }
    }, [roomdata]);

    //showing selected, data in chat
    const setShowChat = (id) => {
        setRoomId(id);

        getApersonChat(id).then((response) => {
            if (response) {
                setMessages(response?.data?.messages);

                // Update roomsData to bring the selected chat to the top
                setRoomsData((prevRoomsData) => {
                    // Find the selected room
                    const selectedRoom = prevRoomsData.find((room) => room.id === id);
                    if (!selectedRoom) return prevRoomsData; // If not found, return the same array
                    // Filter out the selected room and put it at the top
                    const updatedRoomsData = [selectedRoom, ...prevRoomsData.filter((room) => room.id !== id)];

                    return updatedRoomsData;
                });
            }
        });
    };

    //fetching the req connected data been passed
    useEffect(() => {
        if (roomsData && roomsData.length !== 0) {
            setCurrentChat(roomsData[0]);
        }
    }, [roomsData]);

    //if currentChat chagnged the a person chat is fetched
    useEffect(() => {
        try {
            if (currentChat) {
                getApersonChat(currentChat.roomId)
                    .then((response) => {
                        console.log("%ca person messages", "color:green", response);

                        if (response.data.status === true) {
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } catch (err) {
            console.error(err);
        }
    }, [currentChat]);

    useEffect(() => {
        if (!token) return;

        // Create WebSocket URL with token as a query parameter
        const wsUrl = `${BASE_URL_CHAT}/${roomId}?token=${token}`;

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received message:", data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };
        setWebSocket(ws);

        // Cleanup WebSocket connection on unmount or when roomId changes
        return () => {
            ws.close();
        };
    }, [currentChat, roomId, token]);

    // State for input message
    const [inputMessage, setInputMessage] = useState("");

    // Handle sending the message
    const handleSendMessage = () => {
        if (inputMessage.trim() !== "" && websocket && websocket.readyState === WebSocket.OPEN) {
            const messageData = {
                message: inputMessage,
                roomId,
                token: token,
            };
            console.log("Sending message:", messageData);
            playSendSound();
            // Send message through WebSocket
            websocket.send(JSON.stringify(messageData));
            // Clear the input field
            setInputMessage("");
        }
    };

    // udpate messages,with ws response
    useEffect(() => {
        if (websocket) {
            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("Received message:", data);
                playSendSound();
                // Update state with the received message
                setMessages((prevMessages) => [data, ...prevMessages]);
            };
        }
    }, [websocket]);
    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    //Handle Popup
    const [isOpen, setIsOpen] = useState(true);

    // Attachmet addion and sending,
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            for (let file of files) {
                const reader = new FileReader();g
            }
        }
    };

    //Show chat when entering the chat
    useEffect(() => {
        setLoading(true);
        if (currentChat?.id) {
            getApersonChat(currentChat?.id)
                .then((response) => {
                    if (response) {
                        setMessages(response?.data?.messages);
                    }
                })
                .catch((error) => {
                    console.error("error happened", error);
                });
            setLoading(false);
        }
    }, [currentChat]);

    //passing sendedByImg
    useEffect(() => {
        setSendedByImg(currentChat?.first_person?.image || null);
    }, [currentChat]);

    return (
        <div>
            {/* <!-- component 1 --> */}
            <div class="flex h-screen antialiased text-gray-800">
                <div class="flex flex-row h-full w-full overflow-x-hidden">
                    {/* box 1 */}
                    {/* <div> */}
                    <motion.div
                        initial={{ width: "0rem", opacity: 1 }} // Initially collapsed and fully visible
                        animate={{
                            width: isOpen ? "16rem" : "0rem", // Expand to full or collapse
                            opacity: isOpen ? 1 : 0, // Fade out content when collapsed
                        }}
                        transition={{ duration: 0.3 }}
                        className={`flex flex-col ${isOpen ? "py-8 pl-6 pr-2" : ""} bg-white flex-shrink-0 relative`}
                    >
                        <div class="flex flex-row items-center justify-center h-12 w-full ">
                            <div class="flex items-center justify-center rounded-2xl text-yellow-400 bg-amber-100 h-10 w-10">
                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    ></path>
                                </svg>
                            </div>
                            <div onClick={() => navigate("/")} class="ml-2 font-bold text-2xl cursor-pointer">
                                Investryx
                            </div>
                        </div>

                        {isOpen ? (
                            loading ? (
                                <ShimmerLoader />
                            ) : (
                                <div class="relative flex flex-col items-center bg-amber-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                                    <div className="h-20 w-20 rounded-full border overflow-hidden">
                                        <img
                                            onClick={() => {
                                                if (currentChat?.post?.entity_type === "business") {
                                                    navigate(`/view-post-bus/${currentChat.post.id}`, {
                                                        state: { post: currentChat.post },
                                                    });
                                                } else if (currentChat?.post?.entity_type === "franchise") {
                                                    navigate(`/view-post-fra/${currentChat.post.id}`, {
                                                        state: { post: currentChat.post },
                                                    });
                                                } else if (currentChat?.post?.entity_type === "investor") {
                                                    navigate(`/view-post-inv/${currentChat.post.id}`, {
                                                        state: { post: currentChat.post },
                                                    });
                                                } else if (currentChat?.post?.entity_type === "advisor") {
                                                    navigate(`/view-post-adv/${currentChat.post.id}`, {
                                                        state: { post: currentChat.post },
                                                    });
                                                }
                                            }}
                                            src={
                                                currentChat?.post?.image1
                                                    ? `${BASE_URL}${currentChat?.post?.image1}`
                                                    : "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                                            }
                                            alt="Room Image"
                                            className="h-full w-full object-cover cursor-pointer"
                                        />
                                    </div>

                                    <div className="text-sm font-semibold mt-2">{currentChat?.post?.name || "Nil"}</div>
                                    {currentChat?.post?.single_desc && (
                                        <div className="text-xs font-semibold ">
                                            {currentChat?.post?.single_desc.slice(0, 30)}
                                        </div>
                                    )}
                                    {currentChat?.post?.asking_price && (
                                        <div className="text-xs font-semibold ">
                                            Quoted Price :{currentChat?.post?.asking_price}
                                        </div>
                                    )}

                                    <div class="text-xs text-gray-500">
                                        By : {currentChat?.first_person?.first_name || "Nil"}
                                    </div>
                                    <div class="text-xs font-medium text-gray-500 ml-2">
                                        Type : {currentChat?.post?.entity_type || "Nil"}
                                    </div>
                                    <div
                                        onClick={() => {
                                            if (currentChat?.post?.entity_type === "business") {
                                                navigate(`/view-post-bus/${currentChat.post.id}`, {
                                                    state: { post: currentChat.post },
                                                });
                                            } else if (currentChat?.post?.entity_type === "franchise") {
                                                navigate(`/view-post-fra/${currentChat.post.id}`, {
                                                    state: { post: currentChat.post },
                                                });
                                            } else if (currentChat?.post?.entity_type === "investor") {
                                                navigate(`/view-post-inv/${currentChat.post.id}`, {
                                                    state: { post: currentChat.post },
                                                });
                                            } else if (currentChat?.post?.entity_type === "advisor") {
                                                navigate(`/view-post-adv/${currentChat.post.id}`, {
                                                    state: { post: currentChat.post },
                                                });
                                            }
                                        }}
                                        class="px-1 rounded-md hover:bg-amber-300  cursor-pointer text-[0.6rem] absolute right-1 bottom-1 text-gray-800 font-semibold underline underline-offset-2 decoration-blue-500"
                                    >
                                        View Post
                                    </div>

                                    {/* <div class="flex flex-row items-center mt-3">
                                    <div class="flex flex-col justify-center h-4 w-8 bg-yellow-300 rounded-full">
                                        <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                                    </div>
                                    <div class="leading-none ml-1 text-xs">Active</div>
                                </div> */}
                                </div>
                            )
                        ) : null}

                        <div class="flex flex-col mt-8">
                            <div class="flex flex-col space-y-1 mt-4 -mx-2 h-[17rem] overflow-y-auto ">
                                {roomsData && roomsData.length > 0 ? (
                                    roomsData.map((data) => (
                                        <div
                                            className="flex items-center hover:bg-gray-100 rounded-xl"
                                            key={data.id}
                                            onClick={() => setShowChat(data.id)}
                                        >
                                            <button className="flex flex-row items-center   p-2">
                                                <div className="relative flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
                                                    <img
                                                        className="h-full w-full object-cover rounded-full"
                                                        src={data?.post?.image1 || "M"}
                                                        alt={data?.first_person?.first_name}
                                                    />
                                                    <div className="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full overflow-hidden">
                                                        <img
                                                            className="h-full w-full object-cover rounded-full"
                                                            src={data?.first_person?.image || "M"}
                                                            alt={data?.first_person?.first_name}
                                                        />
                                                    </div>
                                                </div>

                                                {data.first_person.id !== user.id ? (
                                                    <div className="flex flex-col  items-start">
                                                        <div className="ml-2 text-sm font-semibold">
                                                            {data?.first_person?.first_name}
                                                        </div>
                                                        {/* <div className=""> */}
                                                        <div className="text-xs font-medium text-gray-500 ml-2">
                                                            {data?.last_msg.slice(0, 20)}
                                                        </div>
                                                        <div className="text-xs font-extralight text-gray-500 ml-2">
                                                            seen{" "}
                                                            {formatDistanceToNow(new Date(data?.updated), {
                                                                addSuffix: true,
                                                            })}
                                                        </div>
                                                        {/* </div> */}
                                                        <div className="text-xs font-medium text-gray-500 ml-2">
                                                            {data?.post?.name}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="ml-2 text-sm font-semibold">
                                                        {data?.second_person?.first_name}
                                                    </div>
                                                )}
                                            </button>
                                            {data?.unread_messages_second !== 0 && (
                                                <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                                                    {data?.unread_messages_second}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <RoomsShimmer />
                                    </div>
                                    // <div className="flex justify-center items-center">No chats available</div>
                                )}
                            </div>
                            {/* <div class="flex flex-row items-center justify-between text-xs mt-6">
                                <span class="font-bold">Archivied</span>
                                <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">7</span>
                            </div> */}
                        </div>
                    </motion.div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className=" w-10 h-10 mt-12 flex justify-center items-center rounded-r-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition "
                    >
                        <div className="rounded-r-xl text-gray-500 ">{isOpen ? <ChevronLeft /> : <ChevronRight />}</div>
                    </button>
                    {/* </div> */}

                    {/* box 2*/}
                    <div class="flex flex-col flex-auto h-full p-6 ">
                        {!isOpen ? (
                            <div className="z-50 absolute top-10 left-24 bg-white rounded-2xl">
                                <div className="flex justify-center items-center w-full h-20 space-x-4 p-4">
                                    {/* Left Side Circle */}
                                    <img
                                        className="w-12 h-12 bg-gray-300 rounded-full"
                                        src={
                                            currentChat?.post?.image1
                                                ? `${BASE_URL}${currentChat?.post?.image1}`
                                                : "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                                        }
                                        alt="user_img"
                                    />

                                    {/* Right Side Box with Inner Elements */}
                                    <div className="flex flex-col space-y-2 w-2/3">
                                        <div className="w-full h-4 ">
                                            {currentChat?.first_person?.first_name.slice(0, 10) || "Nil"}
                                        </div>
                                        <div className="w-1/2 h-4  rounded">{currentChat?.post?.name || "Nil"}</div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            {loading ? (
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <div>
                                        <CgSearchLoading className="w-14 h-14" />
                                    </div>
                                    <div>Loading . . .</div>
                                </div>
                            ) : (
                                <Messages messages={messages} user={user} 
                                sendedByImg={sendedByImg}
                                />
                            )}

                            {/* start */}
                            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                <div>
                                    <button
                                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                        onClick={handleButtonClick}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                    <input type="file" ref={fileInputRef} multiple hidden onChange={handleFileChange} />
                                </div>
                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                </div>

                                <div className="ml-4">
                                    <button
                                        className="flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 rounded-xl text-black px-4 py-1 flex-shrink-0"
                                        onClick={handleSendMessage}
                                    >
                                        <span>Send</span>
                                        <span className="ml-2">
                                            <svg
                                                className="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatList;
