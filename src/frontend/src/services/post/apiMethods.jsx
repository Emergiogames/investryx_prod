import { apiCall } from "./apiCalls";
import { postUrls } from "../endPoints";

export const getWishList = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", postUrls.wishList, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => [reject(err)]);
    } catch (error) {
      resolve({ status: 500, message: "Something wrong" });
    }
  });
};

export const postWishList = (productId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.wishList, productId)
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

export const deleteWishList = (productId) => { //token passed so no userid needed
  console.log("11111 :", productId);
  
  return new Promise((resolve, reject) => {
    try {
      // const endpoint = `/wishlist${user_id}?productId=${productId}`;
      // const endpoint = `/wishlist?productId=${productId}`;
      const endpoint = `/wishlist?productId=${productId}`;
      apiCall("delete", endpoint,productId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethig is wrong" });
    }
  });
};

//add wishList

// export const getBusinessPosts = (userData) => {
//   return new Promise((resolve, reject) => {
//     try {
//       apiCall('get', postUrls.getBusinessData, userData)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

// export const getUserProfile = (user_id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const endpoint = `/user${user_id}`

//       apiCall('get', endpoint, null)
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

// //
// export const getBusinessPosts = (userData) => {
//   return new Promise((resolve, reject) => {
//     try {
//       apiCall('get', postUrls.getBusinessData, userData)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

// //
// export const getInvestorPosts = (user_id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       apiCall('get', postUrls.getInvestorData, user_id)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }
// //
// export const getFranchisPosts = (user_id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       apiCall('get', postUrls.getFranchisData, user_id)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

// export const getAdvisorPosts = (user_id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       apiCall('get', postUrls.getAdvisorData, user_id)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

// export const addBusinessPost = (formData) => {
//   return new Promise ((resolve, reject) =>{
//     try {apiCall('post', postUrls.addBusinessPost, formData)
//       .then((response) => {
//         resolve(response)
//         console.log("rsp dat :" , response);

//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

// export const addFranchisePost = (formData) => {
//   return new Promise ((resolve, reject) =>{
//     try {apiCall('post', postUrls.addFranchisePost, formData)
//       .then((response) => {
//         resolve(response)
//         console.log("rsp dat :" , response);

//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

// export const addInvestorPost = (formData) => {
//   return new Promise ((resolve, reject) =>{
//     try {apiCall('post', postUrls.addInvestorPost, formData)
//       .then((response) => {
//         resolve(response)
//         console.log("rsp dat :" , response);

//       })
//       .catch((err) => {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }

// export const addAdvisorPost = ()=> {
//   return new Promise((resolve, reject) => {
//     try{ apiCall('post', postUrls.addAdvisorPost)
//       .then((response) => {
//         resolve(response)
//       })
//       .catch((err)=> {
//         reject(err)
//       })
//     } catch(error){
//       resolve({status: 500, message: "Something wrong"})
//     }
//   })
// }
