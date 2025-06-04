import React, { useEffect, useState } from 'react';
import { GetUserConnCount } from '../../../services/admin/apiMethods';

function UserConnCount() {
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetUserConnCount()
            .then((response) => {
                setCount(response?.data?.connections_count ?? null);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-amber-100 border border-amber-300 rounded-xl shadow-md p-6 mb-8 w-full max-w-xs mx-auto flex flex-col items-center">
            <div className="text-lg font-semibold text-amber-900 mb-2">Total Connections</div>
            {loading ? (
                <div className="text-amber-600">Loading...</div>
            ) : (
                <div className="text-5xl font-bold text-amber-500">{count !== null ? count : "N/A"}</div>
            )}
        </div>
    );
}

export default UserConnCount;
