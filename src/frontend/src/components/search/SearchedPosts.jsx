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
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { getWishList, deleteWishList } from "../../services/post/apiMethods";
import { postWishList } from "../../services/post/apiMethods";

function SearchedPosts( {props, setIsSearchOpen} ) {
  const navigate = useNavigate();
 
  const post = props
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
    const isSaved = wishPosts.some(wishPost => wishPost.id === post.id);
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
//   const postDate = formatDistanceToNow(new Date(post.listed_on), {
    const postDate = post.listed_on
//   }
// );

  // Navigation to post details
  const handleViewPost = () => {
    setIsSearchOpen(false)
    navigate(`/view-post/${post.id}`, { state: { post } });
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
    <Card
      className="p-3  hover:cursor-pointer"
      sx={{ width: 300, position: "relative" }}
    >
      <CardHeader
        avatar={
          // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //   R
          // </Avatar>
          <div></div>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={post.name}
        // subheader={postDate}
      />
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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Location: {post.city}
          <br />
          EBITDA: {post.ebitda} %
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleSave}
        >
          <FavoriteIcon 
            className={isSavedByUser ? "text-red-500" : ""} 
          />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{post.description}</Typography>
          <Typography paragraph>Established Year: {post.establish_yr}</Typography>
          <Typography>Business Type: {post.type_sale}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default SearchedPosts;