import * as Yup from "yup";

export const initialValues = {
  phone: "",
  password: "",
};

export const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits and contain no spaces or letters")
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
});
