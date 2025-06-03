import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getWishList, deleteWishList } from "../../services/post/apiMethods";
import { postWishList } from "../../services/post/apiMethods";
import { FaImage } from "react-icons/fa6";

function SearchedPosts({ props, setIsSearchOpen }) {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();

    const post = props;
    const userData = (state) => state.auth.user || "";
    const user = useSelector(userData);
    const userId = user.id || "";

    // State for wishlist and expanded view
    const [wishPosts, setWishlistData] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isSavedByUser, setIsSavedByUser] = useState(false);

    // Fetch wishlist on component mount and when userId changes
    useEffect(() => {
        if (userId) {
            fetchWishList(userId);
        }
    }, [userId]);

    // Check if post is in wishlist whenever wishPosts changes
    useEffect(() => {
        const isSaved = wishPosts.some((wishPost) => wishPost.id === post.id);
        setIsSavedByUser(isSaved);
    }, [wishPosts, post.id]);

    // Fetch wishlist
    const fetchWishList = () => {
        getWishList()
            .then((response) => {
                const wishlistData = response.data;
                setWishlistData(wishlistData);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    // Handle save/unsave to wishlist
    const handleSave = () => {
        if (isSavedByUser) {
            // If already saved, remove from wishlist
            deleteWishList(post.id)
                .then((response) => {
                    if (response.data?.status === true) {
                        toast.success("Post removed from wishlist");
                        fetchWishList();
                    }
                })
                .catch((error) => {
                    toast.error(error.message || "Error happened while removing from wishlist");
                });
        } else {
            // If not saved, add to wishlist
            postWishList({ productId: post.id })
                .then((response) => {
                    if (response.data?.status === true) {
                        toast.success("Post added to wishlist");
                        // Refresh wishlist after adding
                        fetchWishList();
                    }
                })
                .catch((error) => {
                    toast.error(error.message || "Error happened while saving to wishlist");
                });
        }
    };

    // Expand/collapse logic for card
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Prepare image and post details
    const imageUrlArray = post.image1 ? post.image1 : post.logo || [];
    const imageUrl = `${BASE_URL}${imageUrlArray}`;

    const handleViewPost = () => {
        const profile = post?.entity_type;
        switch (profile) {
            case "business":
                navigate(`/view-post-bus/${post.id}`, { state: { post: post } });
                break;
            case "franchise":
                navigate(`/view-post-fra/${post.id}`, { state: { post: post } });
                break;
            case "investor":
                navigate(`/view-post-inv/${post.id}`, { state: { post: post } });
                break;
            case "advisor":
                navigate(`/view-post-adv/${post.id}`, { state: { post: post } });
                break;
            default:
                console.warn("Unknown profile type:", profile);
        }
    };

    // Styled expand more component
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

    return (
        <Card className="p-3  hover:cursor-pointer" sx={{ width: 300, position: "relative" }}>
            <CardHeader title={post.single_desc} />
            {imageUrl ? (
                <CardMedia
                    onClick={handleViewPost}
                    component="img"
                    image={imageUrl}
                    alt="Image description"
                    sx={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                <div className="h-40 lg:h-48 w-full object-cover flex justify-center items-center rounded-2xl transition-transform duration-300 transform group-hover:scale-105">
                    <FaImage onClick={() => handleViewPost(post)} className="w-full h-full p-7 text-gray-400" />
                </div>
            )}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    for: {post.entity_type}
                    <br />
                    Location: {post.state ? post.state : "n/a"},{post.city ? post.city : "n/a"}
                    <br />
                    EBITDA: {post.ebitda ? (`${post.ebitda} %`) : "n/a"} 
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleSave}>
                    <FavoriteIcon className={isSavedByUser ? "text-red-500" : ""} />
                </IconButton>
                {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Description :</Typography>
                    <Typography paragraph className="text-gray-500">{post.title ? post.title : "n/a"}</Typography>
                    <Typography paragraph>Established Year : {post.establish_yr ? post.establish_yr : "n/a"}</Typography>
                    <Typography>Business Type : {post.type_sale ? post.type_sale : "n/a"}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default SearchedPosts;
