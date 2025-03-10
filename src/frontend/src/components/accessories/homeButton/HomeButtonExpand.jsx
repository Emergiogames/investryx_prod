import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../../../utils/context/reducers/authSlice";

const HomeButtonExpand = () => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const buttons = [
        { label: "Sell Business", profile: "business", gradient: "from-yellow-400/80 to-orange-300/80", link: "/add-post" },
        {
            label: "Add Investment",
            profile: "investor",
            gradient: "from-yellow-500/80 to-orange-400/80",
            link: "/add-post",
        },
        {
            label: "Add Franchise",
            profile: "franchise",
            gradient: "from-yellow-600/80 to-orange-400/80",
            link: "/add-post",
        },
        { label: "Add Advisor", profile: "advisor", gradient: "from-yellow-700/80 to-orange-500/80", link: "/add-post" },
    ];

    const handleProfileChange = (profile, link) => {
        dispatch(userProfile({ profile: profile }));
        navigate("/add-post");
    };

    return (
        <div className="fixed left-6 bottom-4 flex md:flex-row flex-col items-center md:gap-6 gap-3 z-50">
            {/* Base Button */}
            <button
                onClick={() => setExpanded(!expanded)}
                className={`
          w-16 h-16 rounded-full
          bg-gradient-to-r from-yellow-300 to-yellow-400
          text-white shadow-lg shadow-yellow-500/30
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:shadow-yellow-500/40 hover:scale-110
          active:scale-95
          flex items-center justify-center
          font-medium text-sm
        `}
            >
                Buy/Sell
            </button>

            {/* Expanding Buttons Container */}
            <div
                className={`
        flex md:flex-row flex-col md:gap-4 gap-2
        transition-all duration-500 ease-in-out
        absolute md:static bottom-full left-0 mb-2 md:mb-0
        ${expanded ? "opacity-100 translate-y-0" : "opacity-0 md:-translate-x-full translate-y-4 pointer-events-none"}
      `}
            >
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => handleProfileChange(button.profile, button.label)}
                        className={`
              w-16 h-16  rounded-full
              bg-gradient-to-r ${button.gradient}
              text-white font-medium shadow-lg shadow-yellow-500/20
              transition-all duration-300 delay-[${index * 100}ms]
              hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-110
              active:scale-95
              backdrop-blur-sm
              flex items-center justify-center
              text-xs
              ${expanded ? "translate-y-0 opacity-100" : "md:translate-x-[-50px] translate-y-4 opacity-0"}
            `}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomeButtonExpand;