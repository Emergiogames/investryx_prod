import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import HomePage from "../pages/userHomePage/HomePage";
import Signup from "../pages/signup/Signup";
import Business from "../pages/business/Business";
import Investors from "../pages/investors/Investors";
import Franchises from "../pages/franchises/Franchises";
import Advisors from "../pages/advisors/Advisors";
import HomeLayout from "../layout/HomeLayout";
import MainLayout from "../layout/MainLayout";
import AddPost from "../components/AddPost/AddPost";
import UserProfile from "../pages/userProfile/UserProfile";
import Settings from "../pages/settings/Settings";
import ViewPostBus from "../components/post/ViewPostBus";
import ViewPostFra from "../components/post/ViewPostFra";
import ViewPostInv from "../components/post/ViewPostInv";
import ViewPostAdv from "../components/post/ViewPostAdv";

import Saved from "../pages/saved/Saved";
import Otp from "../pages/otpPage/otp";
import OauthPage from "../pages/signup/PhoneOtp";
import { adminRouter, adminLoginRouter } from "./adminRouter";
import Protect from "./protect/protectedRoute";
import PhoneOtp from "../pages/signup/PhoneOtp";
import Preference from "../components/preference/Preference";
import RenewPassword from "../components/forgotPassword/renewPassword";
import ForgotPassword from "../components/forgotPassword/forgotPassword";
import ForgotOtp from "../components/forgotPassword/forgotOtp";
import Contact from "../pages/contactUs/contact";
import Subscription from "../pages/subscription/Subscription";
import BuySubscription from "../pages/buy_subscription/BuySubscription";
import SubSuccess from "../pages/subscription_success/SubSuccess";
import Notification from "../pages/notification/Notification";
import NotFound from "../components/accessories/errorBoundarys/NotFound";
import PrivacyDocs from "../pages/privacy_docs/PrivacyDocs";
import PrivacyDocsPages from "../pages/privacy_docs/PrivacyDocsPages";
import TermsDocsPages from "../pages/privacy_docs/TermsDocsPages";
import RefundDocsPages from "../pages/privacy_docs/RefundDocsPages";
import BestDocsPages from "../pages/privacy_docs/BestDocsPages";
import ChatList from "../pages/chat/ChatList";
import Test from "../components/accessories/Test";
import CalculatorForm from "../components/accessories/valueCalculator/Calculator";
import PreVerificationBus from "../components/addProfile/business/PreVerificationBus";
import PreVerificationInv from "../components/addProfile/investor/PreVerificationInv";
import PreVerificationFra from "../components/addProfile/franchise/PreVerificationFra";
import PreVerificationAdv from "../components/addProfile/advisor/PreVerificationAdv";
import AddBusinessProfile from "../components/addProfile/business/AddBusinessProfile";
import AddInvestorProfile from "../components/addProfile/investor/AddInvestorProfile";
import AddFranchiseProfile from "../components/addProfile/franchise/AddFranchiseProfile";
import AddAdvisorProfile from "../components/addProfile/advisor/AddAdvisorProfile";
import ScrollToTop from "../components/accessories/scrolltop/ScrollToTop";
import ChatBot from "react-chatbotify";
import ChatButton from "../components/accessories/chatButton/ChatButton";
import { useSelector } from "react-redux";
import DigiLockerVerification from "../pages/surepass/DigilockerVerification";
import AboutUs from "../pages/aboutUs/AboutUs";
import QandA from "../pages/q&a/QandA";
import HomeButtonExpand from "../components/accessories/homeButton/HomeButtonExpand";
import EditBusPost from "../components/editPost/EditBusPost";
import EditFraPost from "../components/editPost/EditFraPost";
import EditInvPost from "../components/editPost/EditInvPost";
import EditAdvPost from "../components/editPost/EditAdvPost";
import DeteteAccDocsPage from "../pages/privacy_docs/DeteteAccDocsPage";
import HowSellBus from "../pages/howTo/HowSellBus";
import HowFindInv from "../pages/howTo/HowFindInv";
import HowFranchise from "../pages/howTo/HowFranchise";
import HowBuyBusi from "../pages/howTo/HowBuyBusi";
import HowInv from "../pages/howTo/HowInv";
import HowAdvisor from "../pages/howTo/HowAdvisor";
import HowValue from "../pages/howTo/HowValue";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ChatButton />
                <HomeButtonExpand />
                <ScrollToTop />
                <HomeLayout />
            </>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },

    {
        path: "/",
        element: (
            <>
                <ScrollToTop />
                <ChatButton />
                <HomeButtonExpand />
                {/* <ChatBot/> */}
                <HomeLayout />
            </>
        ),
        children: [
            {
                path: "/subscribe",
                element: <Subscription />,
            },
        ],
    },

    {
        path: "/",
        element: (
            <>
                <ScrollToTop />
                <ChatButton />
                <HomeButtonExpand />
                {/* <ChatBot/> */}
                <Protect>
                    <HomeLayout />
                </Protect>
            </>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/contact_us",
                element: <Contact />,
            },
            {
                path: "/calculator",
                element: <CalculatorForm />,
            },
            {
                path: "/notification",
                element: <Notification />,
            },
            {
                path: "/buy-subscription",
                element: <BuySubscription />,
            },
            {
                path: "/subscription-success",
                element: <SubSuccess />,
            },
            {
                path: "/add-post",
                element: <AddPost />,
            },
            {
                path: "/add-Profile-pre-business",
                element: <DigiLockerVerification />,
            },
            {
                path: "/add-Profile-pre-investor",
                element: <DigiLockerVerification />,
            },
            {
                path: "/add-Profile-pre-franchise",
                element: <DigiLockerVerification />,
            },
            {
                path: "/add-Profile-pre-advisor",
                element: <DigiLockerVerification />,
            },
            {
                path: "/add-profile-bus",
                element: <AddBusinessProfile />,
            },
            {
                path: "/add-profile-inv",
                element: <AddInvestorProfile />,
            },
            {
                path: "/add-profile-fra",
                element: <AddFranchiseProfile />,
            },
            {
                path: "/add-profile-adv",
                element: <AddAdvisorProfile />,
            },
            {
                path: "/saved",
                element: <Saved />,
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            },
            {
                path: "/howtosell-business",
                element: <HowSellBus />,
            },
            {
                path: "/howtofind-investor",
                element: <HowFindInv />,
            },
            {
                path: "/howto-franchise",
                element: <HowFranchise />,
            },
            {
                path: "/howtobuy-business",
                element: <HowBuyBusi />,
            },
            {
                path: "/howto-invest",
                element: <HowInv />,
            },
            {
                path: "/howto-advisor",
                element: <HowAdvisor />,
            },
            {
                path: "/howto-value",
                element: <HowValue />,
            },
            {
                path: "/q&a",
                element: <QandA />,
            },
            {
                path: "/bus-edit",
                element: <EditBusPost />,
            },
            {
                path: "/inv-edit",
                element: <EditInvPost />,
            },
            {
                path: "/fra-edit",
                element: <EditFraPost />,
            },
            {
                path: "/adv-edit",
                element: <EditAdvPost />,
            },
        ],
    },
    {
        path: "/",
        element: (
            <>
                <Protect>
                    <ScrollToTop />
                    <ChatButton />
                    <HomeButtonExpand />
                    <MainLayout />
                </Protect>
            </>
        ),
        children: [
            {
                path: "/user-profile",
                element: <UserProfile />,
            },
        ],
    },
    {
        path: "/",
        element: (
            <>
                <ScrollToTop />
                <HomeButtonExpand />
                {/* <ChatButton /> */}
                <MainLayout />
            </>
        ),
        children: [
            {
                path: "/view-post-bus/:postId",
                element: <ViewPostBus />,
            },
            {
                path: "/view-post-inv/:postId",
                element: <ViewPostInv />,
            },
            {
                path: "/view-post-fra/:postId",
                element: <ViewPostFra />,
            },
            {
                path: "/view-post-adv/:postId",
                element: <ViewPostAdv />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },

            {
                path: "/business",
                element: <Business />,
            },
            {
                path: "/investment",
                element: <Investors />,
            },
            {
                path: "/franchise",
                element: <Franchises />,
            },
            {
                path: "/advisor",
                element: <Advisors />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/legal_privacy",
        element: <PrivacyDocs />,
    },
    {
        path: "/legal_terms_page",
        element: <TermsDocsPages />,
    },
    {
        path: "/legal_privacy_page",
        element: <PrivacyDocsPages />,
    },
    {
        path: "/legal_refund_page",
        element: <RefundDocsPages />,
    },
    {
        path: "/legal_best_page",
        element: <BestDocsPages />,
    },
    {
        path: "/legal_delete_page",
        element: <DeteteAccDocsPage />,
    },
    {
        path: "/otp/",
        element: <Otp />,
    },
    {
        path: "/auth-verify",
        element: <OauthPage />,
    },
    {
        path: "/phoneOtp",
        element: <PhoneOtp />,
    },
    {
        path: "/preference",
        element: <Preference />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/forgot-otp",
        element: <ForgotOtp />,
    },
    {
        path: "/renew-password",
        element: <RenewPassword />,
    },
    {
        path: "/test",
        element: <Test />,
    },
    adminRouter,
    adminLoginRouter,
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/connectionAll",
        element: (
            <>
                <ChatList />
            </>
        ),
    },
]);

export default appRouter;
