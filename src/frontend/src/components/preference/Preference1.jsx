import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { preference } from "../../services/user/apiMethods";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Geolocator from "../../utils/geolocator/geolocator";
import ReactSlider from "react-slider";

export default function PreferencesForm() {
  const [location, setLocation] = useState(null);

  const initialValues = {
    // price_range: [0, 1000],
    minimum_price: 0,
    maximum_price: 1000,
    profile: [],
    industries: [],
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    price_range: Yup.array()
      .of(Yup.number())
      .length(2, "Price range must have two values"),
    // profile: Yup.string().required("Profile type is required"),
    profile: Yup.array()
      .of(Yup.string())
      .min(1, "At least one profile type must be selected"),
    industries: Yup.array().min(1, "At least one industry must be selected"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!location) {
        toast.error("Location data is not available");
        // return;
      }

      const submissionData = {
        ...values,
        location: location || null,
        // min_price: values.price_range[0],
        // max_price: values.price_range[1],
      };

      console.log("Form submitted", submissionData);
      const prefResponse = await preference(submissionData);

      if (prefResponse) {
        console.log("prefResponse :", prefResponse);
        if (prefResponse.data.status === true) {
          toast.success("Registration Successfull");
          navigate("/"); // Adjust the route as needed
        } else {
          toast.error(prefResponse.message || "Failed Registration");
          navigate("/signup");
        }
      } else {
        toast.error("error happened");
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
      toast.error("Failed to submit preferences");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await Geolocator();
        if (locationData) {
          console.log("Location data:", locationData);
          setLocation(locationData);
        }
      } catch (error) {
        console.error("Failed to get location data:", error);
        toast.error("Failed to get location data");
      }
    };
    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
        <h2 className="text-2xl font-medium mb-6 text-center">
          Enter your Preferences
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {/* Price Range Slider */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Price Range: {values.minimum_price} Lakh to{" "}
                  {values.maximum_price} Lakh (Amount in ₹)
                </label>

                <ReactSlider
                  className="w-full h-8"
                  thumbClassName="w-4 h-4 bg-blue-500 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  trackClassName="h-2 bg-gray-200 rounded-full"
                  value={[values.minimum_price, values.maximum_price]}
                  min={0}
                  max={1000}
                  step={1}
                  ariaLabel={["Minimum price", "Maximum price"]}
                  ariaValuetext={(state) => `Price ${state.valueNow}`}
                  onChange={(value) => {
                    setFieldValue("minimum_price", value[0]);
                    setFieldValue("maximum_price", value[1]);
                  }}
                  pearling
                  minDistance={100}
                />

                <div className="flex justify-between text-sm mt-2">
                  <span>0 </span>
                  <span>1000 </span>
                </div>
              </div>

              {/* Profile Type */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What profile types do you prefer? (Select one or more)
                </label>
                <div className="flex flex-wrap space-x-4">
                  {["Business", "Franchise", "Investment", "Advisor"].map(
                    (type) => (
                      <label key={type} className="flex items-center mb-2">
                        <Field
                          type="checkbox"
                          name="profile"
                          value={type.toLowerCase()}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    )
                  )}
                </div>
                <ErrorMessage
                  name="profile"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Industries */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  What industries are you looking for?
                </label>
                <div className="flex flex-wrap space-x-4">
                  {[
                    "Restaurant",
                    "B2B",
                    "Information Technology",
                    "Investment",
                  ].map((industry) => (
                    <label key={industry} className="flex items-center">
                      <Field
                        type="checkbox"
                        name="industries"
                        value={industry}
                        className="mr-2"
                      />
                      {industry}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="industries"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                >
                  Submit Preferences
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export function funTwo() {
  return (
    <>
      <div> thisis test element</div>
    </>
  );
}
