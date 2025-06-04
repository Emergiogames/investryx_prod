import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminStaffProtect({ children }) {
    const [superUser, setSuperUser] = useState(false);

    const superStatus = useSelector((state) => state.adminAuth.admin.is_superuser);
    const staffStatus = useSelector((state) => state.adminAuth.admin.is_staff);

    useEffect(() => {
        setSuperUser(!!superStatus && !!staffStatus);
    }, [superStatus, staffStatus]);

    if (!superUser) {
        useEffect(() => {
            toast.info("Restricted for Non-staff users");
        }, []);
        return <Navigate to="/admin/" replace />;
    }

    return children;
}
