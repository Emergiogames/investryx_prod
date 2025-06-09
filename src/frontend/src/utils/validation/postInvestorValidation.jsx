import * as Yup from 'yup';
export const initialInvestorValues = {
    name: "",
    industry: "",
    state: "",
    city: "",
    profile_summary: "",
    preferences: [],
    location_interested: "",
    range_starting: "",
    range_ending: "",
    evaluating_aspects: "",
    company: "",
    url: "",
    about_company: "",
    image1: [],
    image2: [],
    image3: [],
    image4: [],
    doc1: [],
    doc2: [],
    doc3: [],
    doc4: [],
    proof1: [],
    proof2: [],
    proof3: [],
    proof4: [],
    userId: 0,
  };
  

// Validation schema
export const validationInvestorSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(4, "Name must be at least 4 characters")
    .max(200, "Name must be at most 200 characters")
    .required("Name is required")
    .matches(/^\S+.*\S$/, "Name cannot contain only spaces"),
  industry: Yup.string()
    .trim()
    .required("Industry is required")
    .matches(/^\S+.*\S$/, "Industry cannot contain only spaces"),
  range_starting: Yup.number()
    .typeError("Range starting must be a number")
    .positive("Range starting must be a positive number")
    .required("Range starting is required"),
  range_ending: Yup.number()
    .typeError("Range ending must be a number")
    .positive("Range ending must be a positive number")
    .required("Range ending is required")
    .test(
      "is-greater",
      "Range ending must be greater than range starting",
      function (value) {
        const { range_starting } = this.parent;
        return value > range_starting;
      }
    ),
});
