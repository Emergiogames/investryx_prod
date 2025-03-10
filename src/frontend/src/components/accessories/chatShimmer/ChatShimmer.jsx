export const ShimmerLoader = () => {
    return (
        <div className="relative flex flex-col items-center bg-amber-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg animate-pulse">
            {/* Circular Image Placeholder */}
            <div className="h-20 w-20 rounded-full border bg-gray-300"></div>

            {/* Name Placeholder */}
            <div className="h-4 w-32 bg-gray-300 mt-3 rounded"></div>

            {/* Description Placeholder */}
            <div className="h-3 w-40 bg-gray-300 mt-2 rounded"></div>
            <div className="h-3 w-24 bg-gray-300 mt-2 rounded"></div>

            <div className="h-3 w-28 bg-gray-300 mt-2 rounded"></div>
        </div>
    );
};
