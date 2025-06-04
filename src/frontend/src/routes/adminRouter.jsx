import UserList from "../components/admin/UserList";
import BusinessList from "../components/admin/BusinessList";
import FranchiseList from "../components/admin/FranchiseList";
import InvestorList from "../components/admin/InvestorList";
import AdvisorList from "../components/admin/AdvisorList";
import Admin from "../pages/admin/Admin";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import AdminLogin from "../pages/admin/login/adminLogin";
import AdminProtect from "./protect/adminProtect";
import AdminViewPost from "../pages/admin/adminViewPost/AdminViewPost";
import BannerList from "../components/admin/BannerList";
import AdminNotificationPush from "../components/admin/AdminNotificationPush";
import Plans from "../components/admin/Plans";
import PostVerify from "../components/admin/PostVerify";
import ReportList from "../components/admin/ReportList";
import BannerListSub from "../components/admin/BannerListSub";
import AdminViewUser from "../components/admin/ViewUser";
import InvestorViewPost from "../components/admin/view-post/InvestorViewPost";
import AdvisorViewPost from "../components/admin/view-post/AdvisorViewPost";
import BusinessViewPost from "../components/admin/view-post/BusinessViewPost";
import FranchiseViewPost from "../components/admin/view-post/FranchiseViewPost";
import StaffUser from "../components/admin/StaffUser";
import ViewStaffUser from "../components/admin/ViewStaffUser";
import EditStaffUser from "../components/admin/EditStaffUser";
import AdminStaffProtect from "./protect/AdminStaffProtect";


export const adminRouter = {
    path: "/admin",
    element: (
        <AdminProtect>
            <Admin />
        </AdminProtect>
    ),
    children: [
        {
            path: "/admin/",
            element: <AdminDashboard />,
        },
        {
            path: "/admin/postVerify",
            element: <PostVerify />,
        },
        {
            path: "/admin/viewPostBusiness",
            element: <BusinessViewPost />,
        },
        {
            path: "/admin/viewPostInvestor",
            element: <InvestorViewPost />,
        },
        {
            path: "/admin/viewPostFranchise",
            element: <FranchiseViewPost />,
        },
        {
            path: "/admin/viewPostAdvisor",
            element: <AdvisorViewPost />,
        },
        {
            path: "/admin/users",
            element: <UserList />,
        },
        {
            path: "/admin/business",
            element: <BusinessList />,
        },
        {
            path: "/admin/franchise",
            element: <FranchiseList />,
        },
        {
            path: "/admin/investor",
            element: <InvestorList />,
        },
        {
            path: "/admin/admin_viewpost",
            element: <AdminViewPost />,
        },
        {
            path: "/admin/admin_viewuser",
            element: <AdminViewUser />,
        },
        {
            path: "/admin/banner",
            element: <BannerList />,
        },
        {
            path: "/admin/banner-sub",
            element: <BannerListSub />,
        },
        {
            path: "/admin/advisor",
            element: <AdvisorList />,
        },
        {
            path: "/admin/reports",
            element: <ReportList />,
        },
        {
            path: "/admin/notification",
            element: <AdminNotificationPush />,
        },
        {
            path: "/admin/plans",
            element: <Plans />,
        },
        {
            path: "/admin/staff",
            element: (
                <AdminStaffProtect>
                    <StaffUser />
                </AdminStaffProtect>
            ),
        },
        {
            path: "/admin/viewStaff",
            element: (
                <AdminStaffProtect>
                    <ViewStaffUser />
                </AdminStaffProtect>
            ),
        },
        {
            path: "/admin/edit-staff",
            element: <EditStaffUser />,
        },
    ],
};

export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />,
};
