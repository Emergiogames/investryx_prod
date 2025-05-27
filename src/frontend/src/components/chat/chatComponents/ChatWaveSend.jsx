import React, { useRef, useState } from "react";

function ChatWaveSend({profileImg, audio }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center ">
            {!profileImg ? (
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-300 flex-shrink-0">
                    N/A</div>
                    ): (
                        
             <img src={profileImg} className="h-10 w-10 rounded-full" alt="user_img" />
                    )}
               
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div className="flex flex-row items-center">
                   
                        {/* Play/Pause Button */}
                        <button 
                            onClick={handlePlayPause}
                            className="flex items-center justify-center bg-yellow-400 hover:bg-indigo-800 rounded-full h-8 w-10"
                        >
                            {isPlaying ? (
                                // Pause Icon
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 9v6m4-6v6"></path>
                                </svg>
                            ) : (
                                // Play Icon
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            )}
                        </button>

                        {/* Audio Element */}
                        <audio ref={audioRef} src={audio} onEnded={() => setIsPlaying(false)} />

                        {/* Wave Animation */}
                        <div className="flex flex-row items-center space-x-px ml-4">
                            {Array(30).fill(0).map((_, index) => (
                                <div key={index} className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default ChatWaveSend;
