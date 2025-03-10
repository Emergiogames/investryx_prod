import * as Yup from "yup";

export const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};
export const validationSchema = Yup.object({
  name: Yup.string()
    .trim()  // Removes leading and trailing spaces
    .matches(
      /^[A-Za-z]+(\s[A-Za-z]+)*$/, 
      "Name can contain letters and a single space between words"
    )
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/^\S+$/, "Email should not contain spaces"),  // Disallow spaces
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(/^\S+$/, "Password should not contain spaces")  // Disallow spaces
    .test(
      "password-complexity",
      "Password must contain at least one number, one uppercase letter, and one lowercase letter.",
      (value) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
        return regex.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required")
    .matches(/^\S+$/, "Confirm password should not contain spaces"),  // Disallow spaces
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .matches(/^\S+$/, "Phone number should not contain spaces"),  // Disallow spaces
});

