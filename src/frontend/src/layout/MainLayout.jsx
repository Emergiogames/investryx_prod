import  { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import FilterButton from "../components/sidebar/FilterButton";
import ResponsiveSideNavBar from "../components/sidebar/ResponsiveSideNavBar"; //for mobile view filter

function MainLayout() {
    const location = useLocation();

    const shouldShowSideNav =
        !["/user-profile", "/settings", "/saved", "/Profile1"].includes(location.pathname) &&
        !location.pathname.startsWith("/view-post/");

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    function toggleSideNav() {
        setIsSideNavOpen((prev) => !prev);
    }

    return (
        <>
    {/* Header Section (Fixed at the Top) */}
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header />
    </div>

    {/* Scrollable Content (Includes SideNav, Posts, and Footer) */}
    <div className="layout-container flex flex-col pt-28">
        {/* Adjust `pt-16` based on actual header height */}

        <div className="flex flex-1">
            {/* Side Navigation for screens md and above */}
            {shouldShowSideNav && (
                <div className="hidden md:block">
                    {/* <SideNavBar /> */}
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1">
                {/* Filter Button for screens below md */}
                {shouldShowSideNav && (
                    <div className="md:hidden flex justify-end">
                        <FilterButton onClick={toggleSideNav} isOpen={isSideNavOpen} />
                    </div>
                )}

                {/* Outlet for dynamic content */}
                <Outlet />

                {/* Responsive SideNavBar for screens below md */}
                {shouldShowSideNav && (
                    <div
                        className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
                            isSideNavOpen ? "translate-y-0" : "translate-y-full"
                        } md:hidden bg-white shadow-lg rounded-t-lg`}
                    >
                        <ResponsiveSideNavBar onClick={toggleSideNav} isOpen={isSideNavOpen} />
                    </div>
                )}
            </main>
        </div>

        {/* Footer Section */}
        <Footer />
    </div>
</>

    );
}

export default MainLayout;
