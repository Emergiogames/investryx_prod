import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminProtect({ children }) {
  const navigate = useNavigate();
  const selectAdmin = (state) => state.adminAuth.token;
  const admin = useSelector(selectAdmin);

  useEffect(() => {
    if(!admin){
      toast.info("Please login to continue ...")
        navigate("/admin/login")
    }
  }, [admin, navigate]);

  if(admin){
    return children;
  }

  return null;
}

export default AdminProtect;
