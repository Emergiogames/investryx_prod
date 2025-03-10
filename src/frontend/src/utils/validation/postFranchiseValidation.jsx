import * as Yup from 'yup';
export const initialFranchiseValues = {
    name: "",
    industry: "",
    url: "",
    offering: "",
    initial: "",
    proj_ROI: "",
    locations_available: "",
    total_outlets: "",
    yr_period: "",
    min_space: "",
    max_space: "",
    brand_fee: "",
    staff: "",
    avg_monthly_sales: "",
    ebitda: "",
    supports: "",
    services: "",
    description: "",
    range_starting: "",
    range_ending: "",
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
export const validationFranchiseSchema = Yup.object({
  name: Yup.string()
    .trim() // Trim leading and trailing spaces
    .required("Name is required")
    .matches(/^\S+.*\S$/, "Name cannot contain only spaces"),
//   industry: Yup.string()
//     .trim()
//     .required("Industry is required")
//     .matches(/^\S+.*\S$/, "Industry cannot contain only spaces"),
});
