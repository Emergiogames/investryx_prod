import * as Yup from "yup";

export const initialAdvisorValues = {
  name: "",
  designation: "",
  number: "",
  email: "",
  state: "",
  industry: [],
  interest: [],
  city: "",
  about_company: "",
  yr_experience: "",
  image1:  "",
};

// Validation schema
export const validationAdvisorSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(4, "Name must be at least 4 characters")
    .max(200, "Name must be at most 200 characters")
    .required("Name is required")
    .matches(/^\S+.*\S$/, "Name cannot contain only spaces"),
  designation: Yup.string()
    .trim()
    .required("Industry is required")
    .matches(/^\S+.*\S$/, "Industry cannot contain only spaces"),
  industry: Yup.array()
    .min(1, "Select at least one industry"),
  interest: Yup.array()
    .min(1, "Select at least one interest"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: Yup.string()
    .email("Enter a valid email address"),
  yr_experience: Yup.number()
    .typeError("Experience must be a number")
    .positive("Experience must be a positive number"),
  about_company: Yup.string()
    .max(100, "About company must be at most 100 characters"),
  company: Yup.string()
    .max(99, "Company name must be at most 100 characters"),
});
