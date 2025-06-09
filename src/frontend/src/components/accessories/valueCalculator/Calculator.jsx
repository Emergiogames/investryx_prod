import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CalculatorForm() {
    const [formData, setFormData] = useState({
        value_criteria: "Low Profitability",
        revenue_metrics: "",
        ebitda: "",
        net_income: "",
        enterprice_value: "",
        multiple_metric: "Revenue",
        revenue_comparable: "",
        ebitda_comparable: "",
    });
    console.log("form data :::", formData);
    const [valuation, setValuation] = useState(null);

    const criteria = [
        {
            label: "Low Profitability",
        },
        {
            label: "Profitability Based",
        },
        {
            label: "Normal",
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateValuation = () => {
        console.log("Starting valuation calculation...");

        let finMetric;

        // Determine which financial metric to use
        if (formData.value_criteria === "Low Profitability") {
            finMetric = parseFloat(formData.revenue_metrics);
        } else if (formData.value_criteria === "Profitability Based") {
            finMetric = parseFloat(formData.net_income);
        } else if (formData.value_criteria === "Normal") {
            finMetric = parseFloat(formData.ebitda);
        }

        // Choose the appropriate comparable value
        let compValue;
        if (formData.multiple_metric === "Revenue") {
            compValue = parseFloat(formData.revenue_comparable);
        } else {
            compValue = parseFloat(formData.ebitda_comparable);
        }

        // Parse enterprise value
        const enterpriseValue = parseFloat(formData.enterprice_value);

        // Basic validation
        if (isNaN(finMetric) || isNaN(compValue) || isNaN(enterpriseValue) || compValue === 0) {
            console.error("Invalid input values");
            toast.error("Please enter valid numeric inputs and make sure no field is zero.");
            return;
        }

        // Valuation formula
        const result = finMetric * (enterpriseValue / compValue);

        console.log("Valuation result:", result);
        setValuation(result.toFixed(2));
    };

    const points = [
        "Predictable key drivers of new sales",
        "Stable or growing traffic from diversified sources",
        "Established suppliers with backup suppliers in place",
        "High percentage of repeat sales",
        "High percentage of repeat customers",
        "Clean legal history",
        "Brand with no trademark, copyright or legal concerns",
        "Documented systems and processes",
        "Growth potential",
    ];

    //ROI

    const pointsROI = [
        "Helps compare multiple investments",
        "Guides better financial planning and desicion making",
        "Highlights cost-effectiveness",
        "ROI calculated, the gain by investment percentage",
    ];

    const [roiData, setRoiData] = useState({
        currency: "₹",
        timeperiod: 0,
        initialInv: 0,
        annualRev: 0,
        annualOpe: 0,
    });

    console.log("roi data ::", roiData);

    const [roi, setRoi] = useState(null);

    const currencyROI = [
        {
            value: "Indian Rupee",
            label: "₹",
        },
        {
            value: "USD",
            label: "$",
        },
        {
            value: "Euro",
            label: "€",
        },
        {
            value: "British Pound",
            label: "£",
        },
        {
            value: "Japanese Yen",
            label: "¥",
        },
        {
            value: "Australian Dollar",
            label: "$",
        },
        {
            value: "Chinese Yuan",
            label: "¥",
        },
    ];

    const handleROI = (e) => {
        const { name, value } = e.target;
        setRoiData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const calculateROI = () => {
        const { currency, timeperiod, initialInv, annualOpe, annualRev } = roiData;
        const c = currency;
        const t = parseFloat(timeperiod);
        const i = parseFloat(initialInv);
        const a = parseFloat(annualOpe);
        const r = parseFloat(annualRev);
        if (!t || !i || !a || !r) {
            toast.error("Fill all fields correctly");
            return;
        }
        const total_profit = (r - a) * t;
        const result = (total_profit / i) * 100;
        setRoi(result.toFixed(2));
    };

    return (
        <>
            {/* box 1 */}
            <div className="px-10 bg-amber-50">
                <section className="w-full lg:flex   pt-20">
                    {/* calculator start */}
                    <div className="w-full xl:w-1/2 p-0 sm:p-12">
                        <div className="mx-auto max-w-md px-6 py-12 border-0 bg-white shadow-lg sm:rounded-3xl">
                            <h1 className="text-2xl font-bold mb-8">Business Valuation Calculator</h1>
                            <form id="form" noValidate>
                                {/* Country Input */}
                                <div className="mb-4">
                                    <div className="font-bold text-gray-500">Financial Metrics</div>
                                </div>
                                <div className="relative z-0 w-full mb-5">
                                    <label htmlFor="fsdf" className="text-gray-500 pl-3">
                                        Valuation Criteria
                                    </label>
                                    <label
                                        htmlFor="value_criteria"
                                        className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                            formData.money && "scale-75 -translate-y-8"
                                        }`}
                                    >
                                        {/* Valuation Criteria */}
                                    </label>
                                    <select
                                        name="value_criteria"
                                        value={formData.value_criteria}
                                        onChange={handleChange}
                                        className="block w-full bg-transparent border-0 border-b-2  border-gray-200"
                                        required
                                    >
                                        {criteria.map((value, index) => (
                                            <option key={index} value={value.label}>
                                                {value.label}
                                            </option>
                                        ))}
                                    </select>
                                    {formData.value_criteria === "Low Profitability" ? (
                                        <div className="text-amber-600 text-sm ">
                                            Revenue-based valuation for early-stage business
                                        </div>
                                    ) : formData.value_criteria === "Profitability Based" ? (
                                        <div className="text-amber-600 text-sm">
                                            Net Income-based valuation for mature business
                                        </div>
                                    ) : formData.value_criteria === "Normal" ? (
                                        <div className="text-amber-600 text-sm">
                                            EBITDA-based valuation for established businesses
                                        </div>
                                    ) : null}
                                </div>

                                {/* Conditional render 1 */}
                                {formData.value_criteria === "Low Profitability" ? (
                                    <div className="relative z-0 w-full mb-5">
                                        <input
                                            type="number"
                                            name="revenue_metrics"
                                            placeholder=" "
                                            value={formData.revenue_metrics}
                                            onChange={handleChange}
                                            className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                        />
                                        <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
                                        <label
                                            htmlFor="money"
                                            className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                                formData.revenue_metrics && "scale-75 -translate-y-8"
                                            }`}
                                        >
                                            Enter Annual Company Revenue
                                        </label>
                                    </div>
                                ) : formData.value_criteria === "Profitability Based" ? (
                                    <div className="relative z-0 w-full mb-5">
                                        <input
                                            type="number"
                                            name="net_income"
                                            placeholder=" "
                                            value={formData.net_income}
                                            onChange={handleChange}
                                            className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2 border-gray-200
                                            focus:outline-none"
                                        />
                                        <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
                                        <label
                                            htmlFor="money"
                                            className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                                formData.net_income && "scale-75 -translate-y-8"
                                            }`}
                                        >
                                            Enter Net income
                                        </label>
                                    </div>
                                ) : formData.value_criteria === "Normal" ? (
                                    <div className="relative z-0 w-full mb-5">
                                        <input
                                            type="number"
                                            name="ebitda"
                                            placeholder=" "
                                            value={formData.ebitda}
                                            onChange={handleChange}
                                            className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2 border-gray-200"
                                        />
                                        <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
                                        <label
                                            htmlFor="money"
                                            className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                                formData.ebitda && "scale-75 -translate-y-8"
                                            }`}
                                        >
                                            Enter EBITDA
                                        </label>
                                    </div>
                                ) : null}

                                <div className="mb-4">
                                    <div className=" font-bold text-gray-500">Enter Multiple Calculations</div>
                                    <div className="text-sm text-gray-500">
                                        Define industry multiple based on comparable data
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-5">
                                    <input
                                        type="number"
                                        name="enterprice_value"
                                        placeholder=" "
                                        value={formData.enterprice_value}
                                        onChange={handleChange}
                                        className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                    />
                                    <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
                                    <label
                                        htmlFor="money"
                                        className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                            formData.enterprice_value && "scale-75 -translate-y-8"
                                        }`}
                                    >
                                        Enterprise value
                                    </label>
                                </div>

                                {/* Currency Radio */}
                                <fieldset className="relative z-0 w-full p-px mb-5">
                                    <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">
                                        Choose a Multiple Metric
                                    </legend>
                                    <div className="block pt-3 pb-2 space-x-4">
                                        <label>
                                            <input
                                                type="radio"
                                                name="multiple_metric"
                                                value="Revenue"
                                                checked={formData.multiple_metric === "Revenue"}
                                                onChange={handleChange}
                                                className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 "
                                            />
                                            Revenue
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="multiple_metric"
                                                value="EBITDA"
                                                checked={formData.multiple_metric === "EBITDA"}
                                                onChange={handleChange}
                                                className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 "
                                            />
                                            EBITDA
                                        </label>
                                    </div>
                                </fieldset>

                                {/* Revenue Input */}
                                {formData.multiple_metric === "Revenue" ? (
                                    <div className="relative z-0 w-full mb-5">
                                        <input
                                            type="number"
                                            name="revenue_comparable"
                                            placeholder=" "
                                            value={formData.revenue_comparable}
                                            onChange={handleChange}
                                            className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                        />
                                        <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
                                        <label
                                            htmlFor="revenue_comparable"
                                            className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                                formData.revenue_comparable && "scale-75 -translate-y-8"
                                            }`}
                                        >
                                            Enter Revenue Value
                                        </label>
                                    </div>
                                ) : formData.multiple_metric === "EBITDA" ? (
                                    <div className="relative z-0 w-full mb-5">
                                        <input
                                            type="number"
                                            name="ebitda_comparable"
                                            placeholder=" "
                                            value={formData.ebitda_comparable}
                                            onChange={handleChange}
                                            className="pt-3 pb-2 pr-12 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                        />
                                        <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">%</div>
                                        <label
                                            htmlFor="ebitda_comparable"
                                            className={`absolute duration-300 top-3 text-gray-500 ${
                                                formData.ebitda_comparable && "scale-75 -translate-y-8"
                                            }`}
                                        >
                                            EBIDTA
                                        </label>
                                    </div>
                                ) : null}

                                {/* EBIDTA Input */}

                                {/* Submit Button */}
                                <button
                                    id="button"
                                    type="button"
                                    onClick={calculateValuation}
                                    className="w-full px-6 py-3 mt-3 text-lg rounded-lg shadow bg-yellow-300 hover:bg-yellow-400 focus:outline-none"
                                >
                                    Calculate
                                </button>
                            </form>

                            {/* Display Valuation */}
                            {valuation && (
                                <div className="mt-6 text-xl text-green-600">Business Valuation: {valuation} $</div>
                            )}
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="none xl:w-1/2 flex flex-col justify-center items-center">
                        <div className="max-w-xl  p-10 bg-white rounded-3xl shadow-md ">
                            <h2 className="text-2xl font-bold mb-4">Ready to Discover Your Business Value?</h2>

                            <p className="mb-2">
                                When determining the value of your business, two key factors influence what a buyer is
                                willing to pay: Return on Investment (ROI) and Perceived Risk.
                            </p>
                            <p className="mb-5">
                                The lower the risk and higher the expected return, the more valuable your business becomes.
                                To maximize your valuation, your business should demonstrate the following:
                            </p>

                            <ul className="list-disc list-inside space-y-2">
                                {points.map((point, index) => (
                                    <li key={index} className="text-gray-700">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <h2 className="text-2xl font-bold mt-4 mb-2">Valuation Methodology</h2>
                            <p className="mb-2">
                                The valuation is based on selected criteria and results in a revenue index. You can choose
                                from three approaches: Low Profitability, Profitability-Based, or Normal. Comparable
                                industry data is then applied to determine the Enterprise Value using either revenue or
                                EBITDA, based on your preference. This ensures a more accurate and realistic valuation.
                            </p>
                        </div>

                        {/* <iframe
            src="https://lottie.host/embed/48840921-a0bf-4ff0-a090-91810b5aa256/yeUrX8ZBLH.json"
            style={{ width: "100%", height: "500px" }}
            className="hidden xl:block" // This hides the iframe below xl size
          ></iframe> */}
                    </div>
                </section>

                {/* box 2 */}
                <section className="w-full lg:flex justify-center items-center lg: mt-28">
                    {/* Text Section */}
                    {/* <div className="none xl:w-1/2 "> */}
                    <div className="none xl:w-1/2 flex flex-col items-center justify-center">
                        <div className="max-w-xl  p-10 bg-white rounded-3xl">
                            <h2 className="text-2xl font-bold mb-4">ROI Calculator</h2>

                            <p className="mb-5 text-gray-500">
                                Return on Investment (ROI) measures the profitability of an investment by comparing the net
                                profit to the initial cost. It's a key metric to assess investment efficiency, helping
                                individuals and businesses make informed financial decisions.
                            </p>

                            <ul className="list-disc list-inside space-y-2">
                                {pointsROI.map((point, index) => (
                                    <li key={index} className="text-gray-500">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* </div> */}
                    {/* calculator start */}
                    <div className="w-full xl:w-1/2 p-0 sm:p-12">
                        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                            <h1 className="text-2xl font-bold mb-8">ROI Calculator</h1>
                            <form id="form">
                                {/* Country currency */}
                                <div className="relative z-0 w-full mb-5">
                                    <select
                                        name="currency"
                                        onChange={handleROI}
                                        className="block w-full bg-transparent border-0 border-b-2  border-gray-200"
                                        required
                                    >
                                        {currencyROI.map((value) => (
                                            <option key={value.label} value={value.label}>
                                                {`${value.label}   ${value.value}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* time period in years */}
                                <div className="relative z-0 w-full mb-5">
                                    <input
                                        type="number"
                                        name="timeperiod"
                                        placeholder=" "
                                        onChange={handleROI}
                                        className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                    />
                                    <label
                                        htmlFor="timeperiod"
                                        className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                            roiData.timeperiod && "scale-75 -translate-y-8"
                                        }`}
                                    >
                                        Select Time Period (in years)
                                    </label>
                                </div>

                                {/* Initial Investment */}
                                <div className="relative z-0 w-full mb-5">
                                    <input
                                        type="number"
                                        name="initialInv"
                                        placeholder=" "
                                        // value={roiData.initialInv}
                                        onChange={handleROI}
                                        className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                    />
                                    <label
                                        htmlFor="initialInv"
                                        className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                            roiData.initialInv && "scale-75 -translate-y-8"
                                        }`}
                                    >
                                        Initial Investment
                                    </label>
                                </div>

                                {/* Annual revene */}
                                <div className="relative z-0 w-full mb-5">
                                    <input
                                        type="number"
                                        name="annualRev"
                                        placeholder=" "
                                        // value={roiData.annualRev}
                                        onChange={handleROI}
                                        className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                    />
                                    <label
                                        htmlFor="annualRev"
                                        className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                            roiData.annualRev && "scale-75 -translate-y-8"
                                        }`}
                                    >
                                        Projected Annual Revenue
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-5">
                                    <input
                                        type="number"
                                        name="annualOpe"
                                        placeholder=" "
                                        // value={roiData.annualOpe}
                                        onChange={handleROI}
                                        className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2  border-gray-200"
                                    />
                                    <label
                                        htmlFor="annualOpe"
                                        className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                                            roiData.annualOpe && "scale-75 -translate-y-8"
                                        }`}
                                    >
                                        Annual Operating Costs
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    id="button"
                                    type="button"
                                    onClick={calculateROI}
                                    className="w-full px-6 py-3 mt-3 text-lg rounded-lg shadow bg-yellow-300 hover:bg-yellow-400 focus:outline-none"
                                >
                                    Calculate
                                </button>
                            </form>

                            {/* Display Valuation */}
                            {roi && <div className="mt-6 text-xl text-green-600">Business ROI: {roi} %</div>}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
