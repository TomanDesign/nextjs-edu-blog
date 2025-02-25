import Link from "next/link";
import { CATEGORY_USER_MAP } from "../types/constants";

interface PostTrailerProps {
  post: Post;
  category: string;
}

export default function PostTrailer({ post, category }: PostTrailerProps) {
  const date = new Date().toLocaleDateString();

  // Map userId back to category name
  const getCategoryFromUserId = (userId: number): string => {
    const category = Object.keys(CATEGORY_USER_MAP).find(
      (key) => CATEGORY_USER_MAP[key as keyof typeof CATEGORY_USER_MAP] === userId
    );
    return category || "Wiedza"; // Default to "Wiedza" if not found
  };

  const displayCategory = category || getCategoryFromUserId(post.userId);

  return (
    <div
      className="my-8 p-4 rounded-tl-[60px] rounded-br-[60px] bg-background-gray shadow-md w-full max-w-[366px] h-[457px] flex flex-col justify-between flex-shrink-0"
    >
      <div>
        <p className="text-sm text-secondary-text">{displayCategory}</p>
        <p className="text-sm text-secondary-text">{date}</p>
        <p>{post.userId}</p>
        <h3 className="text-lg font-semibold font-display mt-2">{post.title.slice(0, 20)}...</h3>
        <p className="text-gray-600 mt-2">{post.body.slice(0, 50)}...</p>
      </div>
      <Link
        href={`/posts/${post.id}`} // Use dynamic route with post.id
        className="text-category-wiedza hover:text-link-hover mt-auto block text-center"
      >
        Zobacz więcej
      </Link>
    </div>
  );
}