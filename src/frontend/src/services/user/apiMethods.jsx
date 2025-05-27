import { apiCall } from "./apiCalls";
import { userUrls } from "../endPoints";
import { postUrls } from "../endPoints";

export const postRegister = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.register, userData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    console.log('error4', err);                    
                    reject(err);
                });
        } catch (error) {
            resolve({ staus: 500, message: "Something wrong" });
        }
    });
};

//google authentication

export const googleAuthenticate = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.googleAuth, userData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ staus: 500, message: "Something wrong" });
        }
    });
};
export const googleSignIn = (username) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.googleSignIn, username)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ statuse: 500, message: "Something wrong" });
        }
    });
};

// login

export const postLogin = (userData) => {
    console.log("hey data 2", userData);
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.login, userData)
                .then((response) => {
                    resolve(response);
                    // console.log(" hleloo" ,  response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const postRegOtp = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("postRegOtp apiMtheod userdatat :", userData);

            apiCall("post", userUrls.postOtp, userData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

// forgot password
export const forgotPassword = (phone) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.forgotPassword, phone)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

// verify the otp that is send(in forgot password)
export const forgotOTP = (data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.forgotOtp, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

// verify the otp that is send(in forgot password)
export const renewPassword = (data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.resetPassword, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

//userProfile for header

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        try {
            const endpoint = `/user`;

            apiCall("get", endpoint)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => [reject(err)]);
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const preference = (prefData) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("preferenc data api call :", prefData);

            apiCall("post", userUrls.pref, prefData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

//userProfile for header

// export const getUserProfile = (user_id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const endpoint = `/user${user_id}`

//       apiCall('get', endpoint)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err) => [
//         reject(err)
//       ])
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

//Delete account
export const deleteUserAccount = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("delete", userUrls.getUserData, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

//
export const getBusinessPosts = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            // const url = `/profile?type=${profile.type}&show_all=${profile.show_all}`
            apiCall("get", postUrls.getBusinessData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getBusinessBanner = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getBanner}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getBusinessLatest = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecent}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getBusinessRecommended = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecommended}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getBusinessFeatured = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getFeatured}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getInvestorPosts = (user_id) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", postUrls.getInvestorData, user_id)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getInvestorBanner = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getBanner}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getInvestorLatest = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecent}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getInvestorRecommended = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecommended}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getInvestorFeatured = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getFeatured}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFranchisPosts = (user_id) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", postUrls.getFranchisData, user_id)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFranchiseBanner = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getBanner}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFranchiseLatest = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecent}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFranchiseRecommended = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecommended}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFranchiseFeatured = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getFeatured}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};


export const getAdvisorPosts = (user_id) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", postUrls.getAdvisorData, user_id)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getAdvisorBanner = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getBanner}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getAdvisorLatest = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecent}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getAdvisorRecommended = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getRecommended}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getAdvisorFeatured = (profile) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getFeatured}?type=${profile}`;
            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};


export const addBusinessPost = (formData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", postUrls.addBusinessPost, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const editBusinessPost = (formData, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `/business${postId}`;
            apiCall("patch",url, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const addFranchisePost = (formData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", postUrls.addFranchisePost, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const editFranchisePost = (formData, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `/franchise${postId}`;
            apiCall("patch",url, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const addInvestorPost = (formData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", postUrls.addInvestorPost, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};


export const editInvestorPost = (formData, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `/investor${postId}`;
            apiCall("patch",url, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const addAdvisorPost = (formData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", postUrls.addAdvisorPost, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const editAdvisorPost = (formData, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `/advisor${postId}`;
            apiCall("patch",url, formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const deleteUser = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", postUrls.deleteUser)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const addContact = (data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.addContact, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getActivity = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", userUrls.getActivity, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getPlans = (type) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `/plans?type=${encodeURIComponent(type)}`;
            apiCall("get", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

// export const getProfilePlan = (type) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = userUrls.getProfile.concat(`?type=${type}`);
//       apiCall("get", url)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: 500, message: "Something wrong" });
//     }
//   });
// };

export const editProfile = (type, data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("patch", userUrls.getProfile.concat(`${type}`), data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, messge: "Something wrong" });
        }
    });
};

export const getFeaturedList = () => {
    return new Promise((resolve, reject) => {
        try {
            const url = `/featured?type=advisor`;
            apiCall("get", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getRecommendedList = () => {
    return apiCall("get", userUrls.getRecommended, null)
        .then((response) => response)
        .catch((err) => {
            return Promise.reject(err); // Explicitly rejecting to ensure a Promise return
        });
};

export const getRecentActivities = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", userUrls.getRecent, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getBanner = () => {
    return new Promise((resolve, reject) => {
        try {
            //  const url = `/profile?type=${profile.type}&show_all=${profile.show_all}`
            const url = `/banner?type=all`;
            apiCall("get", url)
                // apiCall("get", userUrls.getBanner, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFeaturedExperts = () => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.getFeaturedExperts}?type=advisor`;

            apiCall("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getGraph = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", userUrls.getGraph, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const setSubscribe = (data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.setSub, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const orderFetch = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${userUrls.orderFetch}?id=${data}`
            apiCall("get", url, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getNotification = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", userUrls.getNoti, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const leftPlan = (type) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `/subscribe?type=${type}`;
            apiCall("get", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

// export const setChat = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       apiCall("get", userUrls.getLeftPlan, null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: 500, message: "Something wrong" });
//     }
//   });
// };

export const addProfile = (FormData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.getProfile, FormData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getBusPost = () => {
    return new Promise((resolve, reject) => {
        try {
            const url = "/business1";
            apiCall("get", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getInvPost = () => {
    return new Promise((resolve, reject) => {
        try {
            const url = "/investor1";
            apiCall("get", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFraPost = () => {
    return new Promise((resolve, reject) => {
        try {
            const url = "/franchise1";
            apiCall("get", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getAdvPost = () => {
    return new Promise((resolve, reject) => {
        try {
            const url = "/advisor1";
            apiCall("get", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getAllPlans = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", userUrls.getPlan, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const deleteProfile = () => {
    return new Promise((resolve, reject) => {
        try {
            let url = `/profile?type=business`;
            // apiCall("delete", userUrls.getPlan, null)
            apiCall("delete", userUrls.getProfile, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getSearchResult = (query) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", `${userUrls.getSearch}?query=${encodeURIComponent(query)}&filter=false`)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const getFilterResult = (filters) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("%cQueried Filters:", "color: green", filters);

            // Extract 'value' for objects or use raw values
            const queryParams = Object.entries(filters)
                .filter(([_, value]) => value !== null && value !== undefined && value !== "")
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(
                            typeof value === "object" && value.value !== undefined ? value.value : value
                        )}`
                )
                .join("&");

            console.log("%cQuery Params:", "color: green", queryParams);

            // Call API with valid query params
            apiCall("get", `${userUrls.filter}?${queryParams}`)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
        } catch (error) {
            resolve({ status: 500, message: "Something went wrong" });
        }
    });
};


export const unseenNotification = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const urlWithToken = `${userUrls.unseenNotif}?token=${token}`;
            apiCall("patch", urlWithToken, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong" });
        }
    });
};

export const editUser = (data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("patch", userUrls.getUserData, data)
            .then((response) => {
                resolve(response)
            })
            .catch((err) => {
                    reject(err)
            })
        } catch (error) {
            resolve({status : 500, message: "Something wrong"})
        }
    })
}

export const getPreference = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", userUrls.preference)
            .then((response) => {
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        } catch (error) {
            resolve({ status: 500, message: "Something wrong"})
        }
    })
}

export const setPreference = (data, userId) => {
    return new Promise((resolve, reject) => {
        try {
            
            apiCall("patch", `${userUrls.preference}/${userId}`, data)
            .then((response) => {
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        } catch (error) {
            resolve({ status: 500, message: "Something wrong"})
        }
    })
}
