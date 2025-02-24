import Link from "next/link";

interface PostTrailerProps {
  post: Post;
  category: string;
}

export default function PostTrailer({ post, category }: PostTrailerProps) {
  const date = new Date().toLocaleDateString();

  return (
    <div
      className="p-4 rounded-tl-[60px] rounded-br-[60px] bg-background-gray shadow-md max-w-[366px] min-w-[320px] h-[457px] flex flex-col justify-between flex-shrink-0"
    >
      <div>
        <p className="text-sm text-secondary-text">{category}</p>
        <p className="text-sm text-secondary-text">{date}</p>
        <h3 className="text-lg font-semibold font-display mt-2">{post.title.slice(0, 20)}...</h3>
        <p className="text-gray-600 mt-2">{post.body.slice(0, 50)}...</p>
      </div>
      <Link
        href={`/posts/${post.id}`}
        className="text-category-wiedza hover:text-link-hover mt-auto block text-center"
      >
        Zobacz więcej
      </Link>
    </div>
  );
}