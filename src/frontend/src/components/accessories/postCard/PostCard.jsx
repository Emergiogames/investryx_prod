import { toast } from "sonner";

const useSharePost = () => {
  const handleShare = async (postId) => {
    const shareUrl = `http://localhost:5173/view-post/${postId}`;

    // Check if the browser supports the Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post!",
          url: shareUrl,
        });
        toast.success("Post shared successfully!");
      } catch (error) {
        toast.error("Failed to share the post.");
      }
    } else {
      // Fallback for browsers without Web Share API
      try {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy the link.");
      }
    }
  };

  return handleShare;
};

export default useSharePost;

