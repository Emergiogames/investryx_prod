import React, { useEffect } from "react";
import { GetReport } from "../../../services/admin/apiMethods";

function AdminReport() {
    useEffect(() => {
        GetReport().then((response) => {
            // console.log("ddd ::", response);
        });
    }, []);
    return <div></div>;
}

export default AdminReport;
