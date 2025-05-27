
export const userUrls = {
    register: "/register",
    registerOtp: "/verifyOTP",
    resendOtp: "/resendOTP",
    login: "/login",
    forgotPassword: "/forgotpwd",
    forgotOtp: "/otpconfirm",
    resetPassword: "/changepwd",
    googleAuth: "/google-auth",
    googleSignIn: "/social",
    getUserDetails: "/user-details",
    editProfile: "/edit-profile",
    getUserData: "/user",
    postOtp: "/regotp",
    pref: "/prefer",
    addContact: "/contact",
    getActivity: "/activity",
    getPlan: "/plans",
    getFeatured: "/featured",
    getRecommended: "/recommended",
    getRecent: "/latest",
    getBanner: "/banner",
    getFeaturedExperts: "/featured", //need to pass type = advisor // no type passed all reaturned//used in landig
    getGraph: "/graph",
    setSub: "/subscribe",
    orderFetch: "/order_fetch",
    getNoti: "/notification",
    // getLeftPlan: "/subscribe",
    getProfile: "/profile",
    getSearch: "/search",
    filter: "/filter_posts",
    unseenNotif: "/notification",
    preference: "/prefer",
};

export const postUrls = {
    getBusinessData: "/business0",
    getInvestorData: "/investor0",
    getFranchisData: "/franchise0",
    getAdvisorData: "/advisor0",
    getPosts: "/profile",
    addBusinessPost: "/business",
    addFranchisePost: "/franchise",
    addInvestorPost: "/investor",
    addAdvisorPost: "/advisor",
    postContact: "/contact",
    wishList: "/wishlist",
};

export const adminUrls = {
    login: "/admin/login",
    userBlock: "/admin/user-block",
    userList: "/admin/user",
    businessList: "/admin/business",
    franchiseList: "/admin/franchise",
    investorList: "/admin/investor",
    advisorList: "/admin/advisor",
    bannerList: "/admin/banner",
    notificationData: "/admin/notification",
    plans: "/admin/plans",
    postVerify: "/admin/verify-posts",

    postList: "/admin/get-posts",
    reportList: "/admin/report",
    postBlock: "/admin/block",
    getDetails: "/admin/get-details",
    chartData: "/admin/chart-data",
};

export const chatUrls = {
    getRooms: "/rooms",
    getChat: "/chats",
};
