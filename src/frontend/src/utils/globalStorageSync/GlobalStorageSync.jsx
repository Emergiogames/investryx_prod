import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../context/reducers/authSlice";

const GlobalStorageSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logout") {
        dispatch(logout());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  return null; // This is a utility component
};

export default GlobalStorageSync;
