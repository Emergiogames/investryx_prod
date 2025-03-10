import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../services/user/apiMethods";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import HomeButtonExpand from "../../components/accessories/homeButton/HomeButtonExpand"

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  number: "",
  message: "",
};

const validationSchema = Yup.object({
  firstname: Yup.string()
    .max(1000, "Firstname must be 1000 characters or less")
    .matches(/^[A-Za-z]+$/, "Firstname should contain only English alphabets")
    .required("Firstname is required"),

  lastname: Yup.string()
    .max(1000, "Lastname must be 1000 characters or less")
    .matches(/^[A-Za-z]+$/, "Lastname should contain only English alphabets")
    .required("Lastname is required"),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format. Must be in the format something@something.something"
    )
    .required("Email is required"),

  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  message: Yup.string()
    .max(1000, "Message must be 1000 characters or less")
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Message should contain only English alphabets and numbers, no symbols"
    )
    .required("Message is required"),
});

const ContactUs = () => {
  const navigate = useNavigate();

  const submit = (values, { resetForm }) => {
    addContact(values)
      .then((response) => {
        if (response.data?.status === true) {
          toast.success(response.message || "Message added successfully");
          resetForm(); // Reset form after successful submission
        } else {
          toast.error(response.data?.message || "Failed to add message");
        }
      })
      .catch((error) => {
        toast.error(
          error?.message || "Something went wrong while submitting the message"
        );
      });
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" ">
        <div className="flex items-center">
          {/* close button */}
          <button onClick={handleClose} className=" px-2 py-2 rounded">
            <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
          </button>
          <span className="font-semibold">BACK</span>
        </div>
        <h2 className="flex justify-center w-full font-bold text-2xl my-10">
          Contact Us
        </h2>
      </div>
      <div className="flex justify-center">
        <div className=" lg:w-1/3 bg-amber-100 p-8 rounded-lg shadow-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {() => (
              <Form className="space-y-6">
                {/* Firstname */}
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-gray-700 font-bold"
                  >
                    Firstname
                  </label>
                  <Field
                    id="firstname"
                    name="firstname"
                    type="text"
                    className="w-full border-amber-50 px-4 py-2  rounded-lg  focus:ring-yellow-500 "
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Lastname */}
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-gray-700 font-bold"
                  >
                    Lastname
                  </label>
                  <Field
                    id="lastname"
                    name="lastname"
                    type="text"
                    className="w-full border-amber-50 px-4 py-2  rounded-lg  focus:ring-yellow-500"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full border-amber-50 px-4 py-2  rounded-lg  focus:ring-yellow-500"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Number */}
                <div>
                  <label
                    htmlFor="number"
                    className="block text-gray-700 font-bold"
                  >
                    Number
                  </label>
                  <Field
                    id="number"
                    name="number"
                    type="text"
                    className="w-full border-amber-50 px-4 py-2  rounded-lg  focus:ring-yellow-300"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-bold"
                  >
                    Message
                  </label>
                  <Field
                    id="message"
                    name="message"
                    as="textarea"
                    className="w-full border-amber-50 px-4 py-2  rounded-lg  focus:ring-yellow-500"
                    placeholder="Enter your message"
                    rows="4"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="md:w-1/2 px-4 py-2 bg-yellow-300 font-bold rounded-2xl hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* <HomeButtonExpand /> */}
      </div>
    </div>
  );
};

export default ContactUs;
