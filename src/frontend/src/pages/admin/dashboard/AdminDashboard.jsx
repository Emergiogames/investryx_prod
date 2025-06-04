import React, { useEffect } from "react";
import AdminProfile from "../../../components/admin/adminProfile";
import { GetDashboardDetails } from "../../../services/admin/apiMethods";
import UserConn from "../../../components/admin/dashboard-components/UserConn";
import UserConnCount from "../../../components/admin/dashboard-components/UserConnCount";
import TimeSpendTotal from "../../../components/admin/dashboard-components/TimeSpendTotal";
import AdminReport from "../../../components/admin/dashboard-components/Report";
// import GraphList from '../../../components/admin/GraphList'

function AdminDashboard() {
    return (
        <div className="w-full flex flex-col justify-self-center items-center">
            <div className="w-11/12 lg:mr-10">
                <AdminProfile />
                <AdminReport />
                {/* <img src="/images/dashboard_img.png" alt="" /> */}
                <UserConn />
                <UserConnCount />
                <TimeSpendTotal />
            </div>
            <div className="w-10/12 lg:mr-10">{/* <GraphList /> */}</div>
        </div>
    );
}

export default AdminDashboard;
