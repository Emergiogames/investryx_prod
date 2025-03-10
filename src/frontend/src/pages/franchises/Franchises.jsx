import React, { useState, useEffect } from "react";
import FranchisePosts from "../../components/franchise_posts/FranchisePosts";
import {
    getFranchisPosts,
    getFranchiseBanner,
    getFranchiseLatest,
    getFranchiseRecommended,
    getFranchiseFeatured,
} from "../../services/user/apiMethods";
import HomePostLoader from "../../components/loader/HomePostLoader";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { toast } from "sonner";
import SideFilterFranchise from "../../components/sidebar/SideFilterFranchise";
import { useSelector } from "react-redux";
import ImgSlider from "../../components/accessories/homePageImgSlider/ImgSlider";
import SinglePostAtExplore from "../../components/singlePostAtExplore/SinglePostAtExplore";
import { TbMoodEmpty } from "react-icons/tb";

function Franchise() {
    const [posts, setPosts] = useState([]);
    const [banner, setBanner] = useState(null);
    const [latest, setLatest] = useState(null);
    const [recommended, setRecommended] = useState(null);
    const [featured, setFeatured] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    console.log("filtered post @franchise ::", filteredPosts);
    console.log("postss @franchise ::", posts);

    //filter status select
    const filterStatus = (state) => state.auth.filter || "";
    const filter = useSelector(filterStatus);

    useEffect(() => {
        const fetchFranchiseData = async () => {
            setLoading(true); // Start loading
            try {
                // Parallel API calls
                const profile = "franchise";
                const [bannerRes, latestRes, recommendedRes, featuredRes] = await Promise.all([
                    getFranchiseBanner(profile), // API for banner
                    getFranchiseLatest(profile), // API for latest franchisees
                    getFranchiseRecommended(profile), // API for recommended franchisees
                    getFranchiseFeatured(profile), // API for featured franchisees
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
                setLoading(false); // Stop loading
            }
        };

        fetchFranchiseData();
    }, []);

    console.log("555", banner);

    // Get user data from Redux
    const userData = (state) => state.auth.user || "";
    const user = useSelector(userData);
    const userId = user.id || "";

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
            type: "franchise",
            show_all: "all",
        };
        getFranchisPosts(profile)
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

    const profile = "franchise";
    return (
        <div className="flex overflow-y-auto">
            {/* Sidebar - Visible on MD and larger screens */}
            <div className="hidden md:block">
                <SideFilterFranchise onFilterUpdate={handleFilteredData} currentPage={profile} clear={clearFilter} />
            </div>

            {/* Main Content (Posts + Banners) */}
            <div className="flex-1">
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
            <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
        ))}
    </div>
) : !filter ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {displayData?.slice(0, 4).map((post) => (
            <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
        ))}
    </div>
) : null}


                <div className="font-bold text-3xl mx-5 lg:mx-36 text-violet-900">Latest Posts</div>
                <hr className="mx-5 lg:mx-24 mt-2 mb-10" />

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {latest?.slice(0, 4).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
                    ))}
                </div> */}
                <div className="w-full">
                    {/* {latest?.map((post) => ( */}
                    <div className="w-[395px] lg:w-full">
                        <SinglePostAtExplore props={latest} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {displayData?.slice(4, 8).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
                    ))}
                </div>

                <div className="font-bold text-3xl mx-5 lg:mx-36 text-violet-900">Recommended List</div>
                <hr className="mx-5 lg:mx-24 mt-2 mb-10" />

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {recommended?.slice(0, 4).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
                    ))}
                </div> */}
                <div className="w-[395px] lg:w-full">
                    <SinglePostAtExplore props={recommended} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {displayData?.slice(8, 12).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
                    ))}
                </div>

                <div className="font-bold text-3xl mx-5 lg:mx-36 text-violet-900">Featured List</div>
                <hr className="mx-5 lg:mx-24 mt-2 mb-10" />

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {featured?.slice(0, 4).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
                    ))}
                </div> */}
                <div className="w-[395px] lg:w-full">
                    <SinglePostAtExplore props={featured} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {displayData?.slice(12).map((post) => (
                        <div key={post.id}>{loading ? <HomePostLoader /> : <FranchisePosts post={post} />}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Franchise;
