import { chatUrls } from "../endPoints";
import { apiCallChat } from "../userChat/apiCalls";

//get room of current post 
export const getOneRooms = (receiverId) => {
    return new Promise((resolve, reject) => {
      try {
        let objOne = { receiverId: receiverId }; 
          apiCallChat("post",chatUrls.getRooms, objOne)
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

  export const getClickRoom = (receiverId) => {
    return new Promise((resolve, reject) => {
      try {
        let objOne = { receiverId: receiverId }; 
          apiCallChat("get",chatUrls.getRooms, objOne)
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



  //get room of current post 
export const getAllRooms = () => {
  return new Promise((resolve, reject) => {
    try {
        apiCallChat("get",chatUrls.getRooms, null)
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

//get room of current post 
export const getCurrentChat = (receiverId) => {
  return new Promise((resolve, reject) => {
    try {
      let objOne = { receiverId: receiverId }; 
        apiCallChat("get",chatUrls.getRooms, objOne)
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

  //get a person chat

  export const getApersonChat = (id) => {
    return new Promise((resolve, reject) => {
      try {
        // console.log('4444', id);
        
        const url = `/chats?roomId=${id}`
        // apiCallChat("get", chatUrls.getChat)
        apiCallChat("get", url)
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