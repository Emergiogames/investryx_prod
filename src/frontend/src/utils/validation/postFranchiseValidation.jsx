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
    .trim()
    .min(4, "Name must be at least 4 characters")
    .max(200, "Name must be at most 200 characters")
    .required("Name is required")
    .matches(/^\S+.*\S$/, "Name cannot contain only spaces"),
  url: Yup.string()
  .trim()
  .matches(
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
    "Enter a valid website URL (e.g., https://example.com)"
  ),
  initial: Yup.number()
    .typeError("Initial must be a number")
    .positive("Initial must be a positive number")
    .notRequired(),
  proj_ROI: Yup.number()
    .typeError("Projected ROI must be a number")
    .positive("Projected ROI must be a positive number")
    .notRequired(),
  total_outlets: Yup.number()
    .typeError("Total outlets must be a number")
    .positive("Total outlets must be a positive number")
    .notRequired(),
  yr_period: Yup.number()
    .typeError("Year period must be a number")
    .positive("Year period must be a positive number")
    .notRequired(),
  min_space: Yup.number()
    .typeError("Minimum space must be a number")
    .positive("Minimum space must be a positive number")
    .notRequired(),
  max_space: Yup.number()
    .typeError("Maximum space must be a number")
    .positive("Maximum space must be a positive number")
    .notRequired()
    .test(
      "is-greater",
      "Maximum space must be greater than minimum space",
      function (value) {
        const { min_space } = this.parent;
        // Only validate if both values are present and not empty
        if (value && min_space) {
          return value > min_space;
        }
        return true;
      }
    ),
  range_starting: Yup.number()
    .typeError("Range starting must be a number")
    .positive("Range starting must be a positive number")
    .notRequired(),
  range_ending: Yup.number()
    .typeError("Range ending must be a number")
    .positive("Range ending must be a positive number")
    .notRequired()
    .test(
      "is-greater",
      "Range ending must be greater than range starting",
      function (value) {
        const { range_starting } = this.parent;
        // Only validate if both values are present and not empty
        if (value && range_starting) {
          return value > range_starting;
        }
        return true;
      }
    ),
  brand_fee: Yup.number()
    .typeError("Brand fee must be a number")
    .positive("Brand fee must be a positive number")
    .notRequired(),
  staff: Yup.number()
    .typeError("Staff must be a number")
    .positive("Staff must be a positive number")
    .notRequired(),
  avg_monthly_sales: Yup.number()
    .typeError("Average monthly sales must be a number")
    .positive("Average monthly sales must be a positive number")
    .notRequired(),
  ebitda: Yup.number()
    .typeError("EBITDA must be a number")
    .min(0, "EBITDA must be at least 0")
    .max(100, "EBITDA cannot be more than 100")
    .notRequired(),
});
