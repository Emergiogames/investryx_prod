import { adminUrls } from "../endPoints";
import adminApiCalls from "./apiCalls";

// Admin login

// export const adminPostLogin = (adminData) => {
//   return new Promise((resolve, reject) => {
//     try {
//       adminApiCalls("post", adminUrls.login, adminData)
//         .then((response) => {
//           resolve(response)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

//admin login
export const adminPostLogin = async (adminData) => {
    try {
        const response = await adminApiCalls("post", adminUrls.login, adminData);
        console.log("response from adminlogin :", response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const adminUserList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.userList)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminUserBlock = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrls.userBlock, userId)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

// export const PostBlockUnblock = (userId,type) => {
//   return new Promise((resolve, reject) => {
//     try {
//       console.log('useridss', userId);

//       const url = "/admin/verify-posts/$userId"
//       adminApiCalls("post", url, type)
//         .then((response) => {
//           resolve(response)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

export const PostBlockUnblock = (userId, type) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("useridss", userId, type);
            const url = `/admin/verify-posts/${userId.postId}`; // Fixed the template literal
            adminApiCalls("patch", url, { action: type })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminBusinessList = () => {
    return new Promise((resolve, reject) => {
        try {
            // console.log('business list api side');

            adminApiCalls("get", adminUrls.businessList, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminFranchiseList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.franchiseList, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminInvestorList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.investorList, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminAdivisorList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.advisorList, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminBannerList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.bannerList)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminBannerSubList = (type) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.bannerList}?type=${type}`;
            adminApiCalls("get", url, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminBannerPost = (data) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrls.bannerList, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminBannerSubPost = (data) => {
  return new Promise((resolve, reject) => {
      try {
          adminApiCalls("post", adminUrls.bannerList, data)
              .then((response) => {
                  resolve(response);
              })
              .catch((err) => {
                  reject(err);
              });
      } catch (error) {
          reject(error);
      }
  });
};

export const adminDeleteBanner = (bannerId) => {
    return new Promise((resolve, reject) => {
        try {
            const deleteUrl = `admin/banner${bannerId}`;
            adminApiCalls("delete", deleteUrl, bannerId)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminDeleteBannerSub = (bannerId) => {
    return new Promise((resolve, reject) => {
        try {
            const deleteUrl = `admin/banner${bannerId}`;
            adminApiCalls("delete", deleteUrl, bannerId)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminUpdateBanner = (bannerId) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("put", adminUrls.bannerList, bannerId)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminPostBlock = (id) => {
    return new Promise((resolve, reject) => {
        try {
            // console.log("in api call", postId);
            adminApiCalls("post", adminUrls.postBlock, id)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const adminReportList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.reportList, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

// export const getDashboardDetails = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       adminApiCalls("get",adminUrls.getDetails, null)
//         .then((response) => {
//           resolve(response)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

// export const chartData = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       adminApiCalls("get", adminUrls.chartData, null)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch (error) {
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

export const getAdminNotificationPush = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.notificationData, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong while fetching notification" });
        }
    });
};

export const sendAdminNotificationPush = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrls.notificationData, null)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Something wrong with sending notification" });
        }
    });
};

export const getAdminPlans = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.plans, null)
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

export const postAdminPlan = (data) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrls.plans, data)
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

export const deleteAdminPlan = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const deleteUrl = `admin/plan/${id}`;
            adminApiCalls("delete", deleteUrl)
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

export const getPostVerify = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.postVerify, null)
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

export const AdminNotification = (data) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("datassss", data);
            adminApiCalls("post", adminUrls.notificationData, data)
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

export const AdminNotificationApi = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrls.notificationData, null)
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
