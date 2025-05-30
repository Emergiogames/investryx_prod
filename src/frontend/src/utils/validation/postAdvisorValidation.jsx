import * as Yup from "yup";

export const initialAdvisorValues = {
  name: "",
  designation: "",
  state: "",
  city: "",
  about_company: "",
  yr_experience: "",
  image1:  "",
};

// Validation schema
export const validationAdvisorSchema = Yup.object({
  name: Yup.string()
    .trim() // Trim leading and trailing spaces
    .required("Name is required")
    .matches(/^\S+.*\S$/, "Name cannot contain only spaces"),
  designation: Yup.string()
    .trim()
    .required("Industry is required")
    .matches(/^\S+.*\S$/, "Industry cannot contain only spaces"),
  company: Yup.string()
    .max(99, "Company name must be at most 100 characters"),
});
