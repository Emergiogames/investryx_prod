import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { MdPreview } from "react-icons/md";

function Attachments({ message }) {
    const url = message.attachment;
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Get file extension
    const getFileType = (url) => {
        const extension = url.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) return "image";
        if (["pdf"].includes(extension)) return "pdf";
        if (["doc", "docx"].includes(extension)) return "word";
        if (["xls", "xlsx"].includes(extension)) return "excel";
        return "other";
    };

    const fileType = getFileType(url);

    return (
        <>
            {fileType === "image" ? (
                // Image handling
                <div className=" w-1/2 relative ">
                    <img className=" cursor-pointer" src={url} alt="attachment" onClick={() => setIsFullScreen(true)} />
                    <a
                        href={url}
                        download
                        className="absolute top-2 right-2 bg-white p-2 rounded-full text-slate-700 hover:bg-amber-400 hover:bg-opacity-50"
                    >
                        <FaDownload />
                    </a>
                </div>
            ) : fileType === "pdf" || fileType === "word" || fileType === "excel" ? (
                // Document handling (PDF, Word, Excel)
                <div className="relative bg-gray-100 p-4 rounded-lg w-1/2">
                    <p className="text-sm text-gray-700">Preview:</p>
                    <iframe className="w-full h-64" src={url} title="Document Preview"></iframe>
                    <a
                        href={url}
                        download
                        className="mt-2 inline-block text-slate-700 px-4 py-2 rounded hover:bg-amber-400 hover:bg-opacity-50"
                    >
                        <MdPreview className="w-8 h-8" />
                    </a>
                </div>
            ) : (
                // Other file types
                <div className="relative">
                    <p className="text-sm text-gray-700">File: {url.split("/").pop()}</p>
                    <a
                        href={url}
                        download
                        className="mt-2 inline-block text-slate-700 px-4 py-2 rounded hover:bg-amber-400 hover:bg-opacity-50"
                    >
                        <FaDownload /> Download
                    </a>
                </div>
            )}

            {/* Full-Screen View for images */}
            {isFullScreen && fileType === "image" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <button
                        onClick={() => setIsFullScreen(false)}
                        className="absolute top-5 right-5 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 
                        focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg 
                        text-sm px-5 py-2.5 text-center inline-flex items-center"
                    >
                        X
                    </button>
                    <img className="max-w-full max-h-full" src={url} alt="fullscreen" />
                </div>
            )}
        </>
    );
}

export default Attachments;
