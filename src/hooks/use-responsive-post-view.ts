import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

export function useResponsivePostView() {
  const isMobile = useIsMobile();
  const router = useRouter();

  const handlePostClick = (post: Post) => {
    if (isMobile) {
      // On mobile, navigate to the post detail page
      router.push(`/post/${post.id}`);
    } else {
      // On desktop, return the post to be shown in a modal
      return post;
    }
  };

  return { isMobile, handlePostClick };
}