import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../context/reducers/adminAuthSlice";


const GlobalAdminStorageSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "AdminLogout") {
        dispatch(AdminLogout());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  return null;
};

export default GlobalAdminStorageSync;
