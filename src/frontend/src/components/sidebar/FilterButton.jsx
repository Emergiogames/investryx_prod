import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FilterButton({ onClick, isOpen }) {
    const navigate = useNavigate();
    const profile = useSelector((state) => state.auth.profile);
    console.log("profile @ FilterButton", profile);

    //AddPost
    const AddPost = () => {
        navigate("/add-post");
    };

    return (
        <div className="flex gap-x-2">
            <div>
                {profile && (
                    <button
                        onClick={() => AddPost()}
                        className={`bg-yellow-300 hover:bg-yellow-400 font-bold p-4 px-4 rounded-xl ${
                            profile === "investor" ? "text-lg" : "text-xl"
                        }`}
                    >
                        {profile === "business" || profile === "franchise"
                            ? `Sell your ${profile}`
                            : profile === "investor"
                            ? "Add investment post"
                            : profile === "advisor"
                            ? "Add advisor profile"
                            : null}
                    </button>
                )}
            </div>
            <button onClick={onClick} className="p-2 m-1 mr-5 bg-yellow-300 rounded-md hover:bg-yellow-400 transition-all">
                {isOpen ? "Hide Filters" : "Show Filters"}
            </button>
        </div>
    );
}

export default FilterButton;
