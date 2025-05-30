import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/baseUrls";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {  toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { getWishList, deleteWishList } from "../../services/post/apiMethods";
import { postWishList } from "../../services/post/apiMethods";
import useSharePost from "../accessories/postCard/PostCard";
import { IoBookmarks } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";

function InvestmentPosts({ post }) {
    const navigate = useNavigate();

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
                        // Refresh wishlist after deletion
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
    const imageUrlArray = post.image1;
    const imageUrl = `${BASE_URL}${imageUrlArray}`;
    const postDate = formatDistanceToNow(new Date(post.listed_on), {
        addSuffix: true,
    });

    // Navigation to post details
    const handleViewPost = () => {
        navigate(`/view-post-inv/${post.id}`, { state: { post } });
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

    const handleShare = useSharePost();

    return (
        <Card className="p-3 m-5 hover:cursor-pointer" sx={{ maxWidth: 400, position: "relative" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={imageUrl}>
                        {post.name.slice(0, 1).toUpperCase()}
                    </Avatar>
                }
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={post.single_desc}
                subheader={postDate}
            />
            {imageUrlArray ? (
                <CardMedia
                    onClick={handleViewPost}
                    component="img"
                    image={imageUrl}
                    alt="Image description"
                    sx={{
                        height: 300,
                        width: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                <FaFileImage onClick={handleViewPost} className="w-full h-[19rem] text-gray-400" />
            )}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Location: {post.city}
                    <br />
                    Details: {post.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleSave}>
                    <IoBookmarks className={isSavedByUser ? "text-amber-300" : ""} />
                </IconButton>
                {/* <IconButton aria-label="share" onClick={() => handleShare(post.id)}>
                    <ShareIcon />
                </IconButton> */}
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Description:</Typography>
                    <Typography paragraph>{post.description ? post.description : "Nil"}</Typography>
                    <Typography paragraph>Established Year: {post.establish_yr ? post.establish_yr : "Nil"}</Typography>
                    <Typography>Investment Type: {post.type_sale ? post.type_sale : "Nil"}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default InvestmentPosts;
