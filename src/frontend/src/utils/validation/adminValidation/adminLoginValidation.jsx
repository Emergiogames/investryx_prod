import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  // email: Yup.string()
  //   .email("Invalid email address")
  //   .required("Email is required"),
 password: Yup.string()
     .required("Password is required")
     .min(8, "Password must be at least 8 characters")
     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
     .matches(/[0-9]/, "Password must contain at least one number")
     .matches(/[\W_]/, "Password must contain at least one special character")
     .required("Password is required"),
});
