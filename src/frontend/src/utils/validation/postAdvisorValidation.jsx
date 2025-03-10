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
  // interested_in: Yup.string()
  //   .trim()
  //   .required("Area of Interest is required")
  //   .matches(/^\S+.*\S$/, "Single description cannot contain only spaces"),
});
