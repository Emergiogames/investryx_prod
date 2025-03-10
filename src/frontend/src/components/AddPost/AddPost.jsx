import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBusinessPost } from "../../services/user/apiMethods";

import AddBusiness from "./AddBusiness";
import AddFranchise from "./AddFranchise";
import AddInvestor from "./AddInvestor";
import AddAdvisor from "./AddAdvisor";

import {
  initialValues,
  validationSchema,
} from "../../utils/validation/postValidation";
import Loader from "../loader/loader";

function AddPost() {
  const selectedUser = (state) => state.auth.user || "";
  const selectedProfile = (state) => state.auth.profile || "";
 
  
  // const user = useSelector(selectedUser);
  const profile = useSelector(selectedProfile)
  // console.log("selected profile :", profile);
  // const userId = user.userid || "";
  // console.log("userId test :", userId);
  

 

  return (
    <>
    {profile === 'business' && (
      <AddBusiness/>
    )}
    {profile === 'franchise' && (
      <AddFranchise/>
    )}
    {profile === 'investor' && (
      <AddInvestor/>
    )}
    {profile === 'advisor' && (
      <AddAdvisor/>
    )}

    </>
    
  );
}
export default AddPost;
