import React, { useEffect, useState } from 'react';
import { GetUserConn } from '../../../services/admin/apiMethods';
import { formatDistanceToNow } from 'date-fns';

function UserConn() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetUserConn()
            .then((response) => {
                setEnquiries(response?.data?.recent_enquiries || []);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-white border border-amber-300 rounded-xl shadow-md p-6 mb-8 w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-amber-900 mb-4">Recent Enquiries</h2>
            {loading ? (
                <div className="text-amber-600">Loading...</div>
            ) : enquiries.length === 0 ? (
                <div className="text-gray-500">No recent enquiries found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                        <table className="min-w-full divide-y divide-amber-200">
                            <thead className="bg-amber-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-amber-900 uppercase">#</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-amber-900 uppercase">User</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-amber-900 uppercase">Other Person</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-amber-900 uppercase">Created</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-amber-100">
                                {enquiries.slice(0, 5).map((item, idx) => (
                                    <tr key={idx} className="hover:bg-amber-50">
                                        <td className="px-4 py-2 text-sm text-gray-700">{idx + 1}</td>
                                        <td className="px-4 py-2 text-sm font-medium text-amber-800">{item.user}</td>
                                        <td className="px-4 py-2 text-sm text-amber-700">{item.other_person}</td>
                                        <td className="px-4 py-2 text-sm text-gray-500">
                                            {item.created_date
                                                ? formatDistanceToNow(new Date(item.created_date), { addSuffix: true })
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserConn;