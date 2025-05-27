import React from "react";
import { useRazorpay } from "react-razorpay";
import { useLocation, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { setSubscribe, orderFetch } from "../../services/user/apiMethods";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";

const PaymentComponent = () => {
    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    const userId = user.id;

    const navigate = useNavigate();
    const { error, isLoading, Razorpay } = useRazorpay();
    const location = useLocation();
    const { plan } = location.state || {};

    console.log("plan data in buysub :", plan);
    const handlePayment = async () => {
        try {
            const result = await orderFetch({ id: plan.id }); // Ensure orderFetch correctly accepts data
            console.log("Payment result:", result);

            // Proceed with Razorpay integration after successful order creation
            if (result.status === 200) {
                const data = result.data;
                const options = {
                    key: data.key, // Ensure key is available
                    amount: data.amount, // Amount from API response
                    currency: data.currency,
                    name: "Emergio Games Pvt Ltd",
                    description: "Payment for Subscription Plan",
                    order_id: data.id, // Razorpay order ID
                    handler: function (response) {
                        console.log("Payment Successful:", response);
                        toast.success("Payment Successful!");

                        const plandata = {
                            id: plan.id,
                            amount: data.amount,
                            // user: userId,
                            transaction_id: response?.razorpay_payment_id || "",
                        };

                        setSubscribe(plandata)
                            .then((response) => {
                                console.log("Final response:", response);

                                if (response) {
                                    navigate("/subscription-success");
                                } else {
                                    console.error("Something went wrong in setting subscription");
                                    toast.error("Subscription activation failed.");
                                }
                            })
                            .catch((error) => {
                                console.error("Error in setting subscription:", error);
                                toast.error("Error in setting subscription.");
                            });
                    },
                    prefill: {
                        name: user.first_name | "",
                        email: user.mail | "",
                        contact: user.username | "",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };
                console.log("33333333", options);

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                toast.error("Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Something went wrong during payment.");
        }
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
                                    strokeWidth="1.5"
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
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum porro molestias
                                    quaerat maxime modi.
                                </span>
                            </div>
                        </div>
                        <div class="mb-5 flex font-medium">
                            <div class="mr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
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
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum porro molestias
                                    quaerat maxime modi.
                                </span>
                            </div>
                        </div>
                        <div class="mb-5 flex font-medium">
                            <div class="mr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
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
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum porro molestias
                                    quaerat maxime modi.
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
