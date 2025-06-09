import * as Yup from 'yup';

  export const initialValues = {
    name: "",
    industry: "",
    establish_yr: "",
    description: "",
    address_1: "",
    address_2: "",
    state: "",
    pin: "",
    city: "",
    employees: "", 
    entity: "",
    avg_monthly: "",
    latest_yearly: "",
    ebitda: "",
    rate: "",
    type_sale: "",
    url: "",
    top_selling: "",
    features: "",
    facility: "",
    reason: "",
    income_source: "",
    asking_price: "",
    single_desc: "",
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
    userId: 0
  }

// Validation schema
export const validationSchema = Yup.object({
  name: Yup.string()
    .trim() // Trim leading and trailing spaces
    .required("Name is required")
    .matches(/^\S+.*\S$/, "Name cannot contain only spaces"),
  industry: Yup.string()
    .trim()
    .required("Industry is required")
    .matches(/^\S+.*\S$/, "Industry cannot contain only spaces"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .matches(/^\S+.*\S$/, "Description cannot contain only spaces"),
  single_desc: Yup.string()
    .trim()
    .required("Single description is required")
    .matches(/^\S+.*\S$/, "Single description cannot contain only spaces"),
  establish_yr: Yup.number()
    .typeError("Establish year must be a number")
    .integer("Establish year must be an integer")
    .max(new Date().getFullYear(), `Establish year cannot be in the future`)
    .required("Establish year is required"),
  pin: Yup.number()
    .typeError("Pin must be a number")
    .integer("Pin must be an integer")
    .positive("Pin must be a positive number")
    .required("Pin is required"),
  employees: Yup.number()
    .typeError("Employees must be a number")
    .integer("Employees must be an integer")
    .positive("Employees must be a positive number")
    .required("Employees is required"),
  avg_monthly: Yup.number()
    .typeError("Average monthly sales must be a number")
    .positive("Average monthly sales must be a positive number")
    .required("Average monthly sales is required"),
  latest_yearly: Yup.number()
    .typeError("Latest yearly sales must be a number")
    .positive("Latest yearly sales must be a positive number")
    .required("Latest yearly sales is required"),
  ebitda: Yup.number()
    .typeError("EBITDA must be a number")
    .min(0, "EBITDA must be at least 0")
    .max(100, "EBITDA cannot be more than 100")
    .required("EBITDA is required"),
  asking_price: Yup.number()
    .typeError("Asking price must be a number")
    .positive("Asking price must be a positive number")
    .required("Asking price is required"),
});
