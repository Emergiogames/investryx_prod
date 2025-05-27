import React, { useState, useEffect } from "react";
import BusinessPosts from "../../components/business_posts/BusinessPosts";
import {
    getBusinessPosts,
    getBusinessBanner,
    getBusinessLatest,
    getBusinessRecommended,
    getBusinessFeatured,
} from "../../services/user/apiMethods";
import HomePostLoader from "../../components/loader/HomePostLoader";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import SideFilterBusiness from "../../components/sidebar/SideFilterBusiness";
import { useSelector } from "react-redux";
import ImgSlider from "../../components/accessories/homePageImgSlider/ImgSlider";
import SinglePostAtExplore from "../../components/singlePostAtExplore/SinglePostAtExplore";
import RecommendedListing from "../../components/accessories/homePageAddOn/recommededListing/RecommendedListing";
import { TbMoodEmpty } from "react-icons/tb";

function Business() {
    const [posts, setPosts] = useState([]);
    const [banner, setBanner] = useState(null);
    const [latest, setLatest] = useState(null);
    const [recommended, setRecommended] = useState(null);
    const [featured, setFeatured] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingSub, setLoadingSub] = useState(true)
    const [error, setError] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    console.log("filtered post @business ::", filteredPosts);
    console.log("postss @business ::", posts);

    useEffect(() => {
        const fetchBusinessData = async () => {
            setLoadingSub(true); // Start loading
            try {
                // Parallel API calls
                const profile = "business";
                const [bannerRes, latestRes, recommendedRes, featuredRes] = await Promise.all([
                    getBusinessBanner(profile), // API for banner
                    getBusinessLatest(profile), // API for latest businesses
                    getBusinessRecommended(profile), // API for recommended businesses
                    getBusinessFeatured(profile), // API for featured businesses
                ]);

                // Update states with response data
                if (bannerRes?.status) setBanner(bannerRes.data);
                if (latestRes?.status) setLatest(latestRes.data);
                if (recommendedRes?.status) setRecommended(recommendedRes.data);
                if (featuredRes?.status) setFeatured(featuredRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoadingSub(false); // Stop loading
            }
        };

        fetchBusinessData();
    }, []);

    // Get user data from Redux
    const userData = (state) => state.auth.user || "";
    const user = useSelector(userData);
    const userId = user.id || "";

    //filter status select
    const filterStatus = (state) => state.auth.filter || "";
    const filter = useSelector(filterStatus);

    // Fetch initial posts on component mount
    useEffect(() => {
        try {
            fetchPosts();
        } catch (error) {
            console.log(error);
        }
    }, [userId]);

    // Function to fetch all posts
    const fetchPosts = () => {
        setLoading(true);
        const profile = {
            type: "business",
            show_all: "all",
        };
        getBusinessPosts(profile)
            .then((response) => {
                const postDatas = response.data;
                setPosts(postDatas);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    };

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    // Handler for receiving filtered data from SideNavBar
    const handleFilteredData = (data) => {
        setFilteredPosts(data);
        setPosts(data);
    };

    //Handle reset of post(clearing filter)
    const clearFilter = () => {
        fetchPosts();
    };

    // Determine which data to display - filtered or all posts
    const displayData = filteredPosts.length > 0 ? filteredPosts : posts;

    const profile = "business";

    return (
        <div className="flex overflow-y-auto">
            {/* Sidebar - Visible on MD and larger screens */}
            <div className="hidden md:block">
                <SideFilterBusiness onFilterUpdate={handleFilteredData} currentPage={profile} />
            </div>

            {/* Main Content (Posts + Banners) */}
            <div className="flex-   1">
                <div className="mx-1 md:px-12">
                    <ImgSlider props={banner} />
                </div>

                {/* Posts Section */}
                {filter && displayData.length === 0 ? (
                    <div className="items-center text-center my-36 py-5 flex flex-col">
                        <TbMoodEmpty className="w-16 h-16 bg-yellow-300 p-3 rounded-lg" />
                        <div className="mt-4">No results found</div>
                    </div>
                ) : filter && displayData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                        {displayData?.map((post) => (
                            <div key={post.id}>{loading ? <HomePostLoader /> : <BusinessPosts post={post}  />}</div>
                        ))}
                    </div>
                ) : !filter ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                        {displayData?.slice(0, 4).map((post) => (
                            <div key={post.id}>{loading ? <HomePostLoader /> : <BusinessPosts post={post} />}</div>
                        ))}
                    </div>
                ) : null}

                <div className="font-bold text-3xl mx-5 lg:mx-36 text-violet-900">Latest Posts</div>
                <hr className="mx-5 lg:mx-24 mt-2 mb-10" />

                <div className="w-full">
                    {/* {latest?.map((post) => ( */}
                    <div className="w-[395px] md:w-[50rem] lg:w-full">
                        <SinglePostAtExplore props={latest} loading={loadingSub} />
                    </div>
                </div>

                <hr className="lg:mx-24 mt-5" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:p-4">
                    {displayData?.slice(4, 8).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <BusinessPosts post={post} />}</div>
                    ))}
                </div>

                <div className="font-bold text-3xl mx-5 lg:mx-36 text-violet-900">Recommended List</div>
                <hr className="  mx-5 lg:mx-24 mt-2 mb-10" />
                <div className="w-[395px] md:w-[50rem] lg:w-full">
                    <SinglePostAtExplore props={recommended} loading={loadingSub}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:p-4">
                    {displayData?.slice(8, 12).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <BusinessPosts post={post} />}</div>
                    ))}
                </div>

                <div className="font-bold text-3xl mx-5 lg:mx-36 text-violet-900">Featured List</div>
                <hr className="mx-5 lg:mx-24 mt-2 mb-10" />
                <div className="w-[395px] md:w-[50rem] lg:w-full">
                    <SinglePostAtExplore props={featured} loading={loadingSub}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:p-4">
                    {displayData?.slice(12).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <BusinessPosts post={post} />}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Business;
