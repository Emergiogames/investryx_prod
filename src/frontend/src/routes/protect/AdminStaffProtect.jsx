import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminStaffProtect({ children }) {
    const superStatus = useSelector((state) => state.adminAuth.admin.is_superuser);
    const staffStatus = useSelector((state) => state.adminAuth.admin.is_staff);

    const allowed = !!superStatus && !!staffStatus;

    useEffect(() => {
        if (!allowed) {
            toast.info("Restricted for Non-staff users");
        }
    }, [allowed]);

    if (!allowed) {
        return <Navigate to="/admin/" replace />;
    }

    return children;
}
