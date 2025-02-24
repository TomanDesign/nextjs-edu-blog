"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Post } from "../../../types";

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [params.id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.body}</p>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex items-center text-yellow-500"
        >
          <span className="mr-2">{isFavorite ? "★" : "☆"}</span> Add to Favorites
        </button>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Post List
        </Link>
      </div>
    </div>
  );
}