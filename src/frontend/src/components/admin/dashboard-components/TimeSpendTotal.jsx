import React, { useState } from "react";
import { TimeSpend } from "../../../services/admin/apiMethods";

export default function TimeSpendTotal() {
    const [userId, setUserId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleFetch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const response = await TimeSpend(userId, startDate, endDate);
            setResult(response?.data || {});
        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to extract hours and minutes from result string
    const getTimeParts = (totalTime) => {
        if (!totalTime) return { hours: "0", minutes: "0" };
        const match = totalTime.match(/(\d+)\s*hours?,\s*(\d+)\s*minutes?/i);
        if (match) {
            return { hours: match[1], minutes: match[2] };
        }
        return { hours: "0", minutes: "0" };
    };

    const timeParts = getTimeParts(result?.total_time_spent);

    return (
        <div className="bg-amber-100 border border-amber-300 rounded-xl p-6 shadow-md mb-8 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Time Spent Summary</h2>
            <form onSubmit={handleFetch} className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div className="flex flex-col flex-1">
                    <label className="text-amber-900 font-semibold mb-1">User ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        className="p-2 rounded border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label className="text-amber-900 font-semibold mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="p-2 rounded border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label className="text-amber-900 font-semibold mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="p-2 rounded border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-400 text-white font-bold px-6 py-2 rounded-lg mt-2 md:mt-0 hover:bg-amber-500 transition"
                >
                    {loading ? "Loading..." : "Fetch"}
                </button>
            </form>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {result && (
                <div className="bg-white rounded-lg p-6 border border-amber-200 shadow flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Total Time Spent</h3>
                    <div className="flex space-x-8 mb-2">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-amber-600">{timeParts.hours}</span>
                            <span className="text-md text-gray-700 font-semibold">Hours</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-amber-600">{timeParts.minutes}</span>
                            <span className="text-md text-gray-700 font-semibold">Minutes</span>
                        </div>
                    </div>
                    <div className="text-gray-500 text-sm mt-2">
                        User ID: <span className="font-semibold">{result.user_id || "N/A"}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
