import Link from "next/link";
import { CATEGORY_CONFIG } from "../types/constants";

interface PostTrailerProps {
  post: Post;
  category: string;
}

export default function PostTrailer({ post, category }: PostTrailerProps) {
  const date = new Date().toLocaleDateString();

  // Map userId back to category name
  const getCategoryFromUserId = (userId: number): string => {
    const category = Object.keys(CATEGORY_CONFIG).find(
      (key) => CATEGORY_CONFIG[key as keyof typeof CATEGORY_CONFIG].userId === userId
    );
    console.log("UserId:", userId, "Mapped Category:", category); // Debug log
    return category || "Wiedza"; // Default to "Wiedza" if not found
  };

  const displayCategory = category || getCategoryFromUserId(post.userId);
  const categoryColor = CATEGORY_CONFIG[displayCategory as keyof typeof CATEGORY_CONFIG]?.color || "text-gray-600";
  console.log("Display Category:", displayCategory, "Color:", categoryColor); // Debug log


  return (
    <div
      className="px-8 py-10 rounded-tl-[60px] rounded-br-[60px] bg-background-gray shadow-md min-w-full max-w-[366px] h-[457px] flex flex-col justify-between flex-shrink-0"
    >
      <div>
        <p className={`text-sm uppercase underline font-semibold hidden md:block ${categoryColor}`}>{displayCategory}</p>
        <h3 className="text-xl text-primary-text font-semibold font-display mt-2">{post.title}</h3>
        <div className="flex flex-row items-center w-[69px] h-[1px] bg-primary-text mt-8"></div>
        <p className="text-sm py-8 text-primary-text">{date}</p>
        <p className="text-gray-600 mt-2">{post.body.slice(0, 50)}...</p>
      </div>
      <Link
        href={`/posts/${post.id}`}
        className="text-primary-text hover:text-link-hover mt-auto flex flex-row justify-start text-center font-bold items-center"
      >
        <span className="pr-2">Zobacz więcej</span>
        <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1571 0.681786L12.9095 1.92938L17.8468 6.87551L-3.48089e-07 6.87551L-2.70736e-07 8.64514L17.8468 8.64514L12.9006 13.5824L14.1571 14.8389L21.2356 7.76033L14.1571 0.681786Z" fill="black"/>
        </svg>
      </Link>
    </div>
  );
}