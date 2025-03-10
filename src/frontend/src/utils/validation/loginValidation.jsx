import * as Yup from "yup";

export const initialValues = {
  phone: "",
  password: "",
};

export const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits and contain no spaces or letters")
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
});


// import * as Yup from "yup";

// export const initialValues = {
//   name: "",
//   industry: "",
//   establish_yr: "",
//   description: "",
//   address_1: "",
//   address_2: "",
//   state: "",
//   pin: "",
//   city: "",
//   employees: "",
//   entity: "",
//   avg_monthly: "",
//   latest_yearly: "",
//   ebitda: "",
//   rate: "",
//   type_sale: "",
//   url: "",
//   top_selling: "",
//   features: "",
//   facility: "",
//   reason: "",
//   income_source: "",
//   image1: [],
// };

// export const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, "Name must be at least 2 characters")
//     .required("Name is required")
//     .matches(/^\S+$/, "Name should not contain spaces"),

//   industry: Yup.string()
//     .required("Industry is required")
//     .matches(/^\S+$/, "Industry should not contain spaces"),

//   single_desc: Yup.string()
//     .min(10, "Description must be at least 10 characters")
//     .required("Description is required")
//     .matches(/^\S+$/, "Description should not contain spaces"),
//   image1: Yup.array()
//     .of(Yup.mixed().required("Image is required"))
//     .min(1, "At least one image must be selected"),
// });
