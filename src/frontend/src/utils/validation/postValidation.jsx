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
});
