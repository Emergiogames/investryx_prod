import * as Yup from 'yup';
export const initialInvestorValues = {
    name: "",
    industry: "",
    state: "",
    city: "",
    profile_summary: "",
    preferences: "",
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
    .trim() // Trim leading and trailing spaces
    .required("Name is required")
    .matches(/^\S+.*\S$/, "Name cannot contain only spaces"),
  industry: Yup.string()
    .trim()
    .required("Industry is required")
    .matches(/^\S+.*\S$/, "Industry cannot contain only spaces"),
});
