import React from "react";
import { useRazorpay } from "react-razorpay";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setSubscribe } from "../../services/user/apiMethods";
import { useSelector } from "react-redux";

const PaymentComponent = () => {

  const selectedUser = (state) => state.auth.user || ""
  const user = useSelector(selectedUser)
  const userId = user.id


  const navigate = useNavigate();
  const { error, isLoading, Razorpay } = useRazorpay();
  const location = useLocation();
  const { plan } = location.state || {};

  console.log("plan data in buysub :", plan);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_rNMwg2QWhvYchp",
      amount: 50000, // Amount in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      // order_id: "order_111", // Generate order_id on server
      handler: (response) => {
        // console.log("payment id :", response);
        // toast("Payment Successful!");
        if (response?.razorpay_payment_id) {
          console.log('paymentresponse ::', plan.id,userId, response.razorpay_payment_id);
          
         const plandata = {
            id: plan.id,
            user: userId,
            transaction_id: response?.razorpay_payment_id || '' ,
            // remaining_posts: "" ,
            // expiry_date: "" ,
          }
          setSubscribe(plandata)
            .then((response) => {
              console.log('final response :::', response);
              
              if (response.data?.status === true) {
                navigate("/subscription-success");
              } else {
                console.error("Something went wrong in setting subscription");
              }
            })
            .catch((error) => {
              console.error("Error in setting subscription:", error);
              toast("Error in setting subscription.");
            });
        } else {
          toast("error happenend in payment");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <>
      <section class=" py-12 text-gray-800 sm:py-24 mt-10">
        <div class="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <div class="max-w-2xl px-4 lg:pr-24">
            {/* <p class="mb-2 text-blue-600">Have Custom Needs</p> */}
            <h3 class="mb-5 text-3xl font-semibold">{plan.name}</h3>
            {Object.entries(plan.description).map(([key, value], index) => (
              <p key={index} className="mb-2 text-lg text-gray-600">
                <strong>{key}:</strong> {value}
              </p>
            ))}
            <div class="mb-5 flex font-medium">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-7 w-7 text-blue-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                  />
                </svg>
              </div>
              <div class="">
                <p class="mb-2">Monthly 400k Image Downloads</p>
                <span class="font-normal text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum porro molestias quaerat maxime modi.
                </span>
              </div>
            </div>
            <div class="mb-5 flex font-medium">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-7 w-7 text-blue-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div class="">
                <p class="mb-2">Stay Syned to the Database</p>
                <span class="font-normal text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum porro molestias quaerat maxime modi.
                </span>
              </div>
            </div>
            <div class="mb-5 flex font-medium">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-7 w-7 text-blue-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div class="">
                <p class="mb-2">Save on Energy Costs</p>
                <span class="font-normal text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum porro molestias quaerat maxime modi.
                </span>
              </div>
            </div>
          </div>
          <div class="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
            <div class="relative border-b border-gray-300 p-4 py-8 sm:px-8">
              <h3 class="mb-1 inline-block text-3xl font-medium">
                <span class="mr-4">Get Plan !</span>
                <span class="inline-block rounds-md bg-blue-100 px-2 py-1 text-sm text-blue-700 sm:inline">
                  On offer
                </span>
              </h3>
              <p class="text-gray-600"> Add multimple posts from now onwards</p>
            </div>
            <div class="p-4 sm:p-8">
              <button
                onClick={handlePayment}
                class="w-full rounded-lg border border-blue-700 bg-blue-700 p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentComponent;
