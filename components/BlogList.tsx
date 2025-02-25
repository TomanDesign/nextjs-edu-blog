"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PostTrailer from "./PostTrailer";
import { useBlog } from "./BlogContext";
import { Post } from "../types";
import { CATEGORY_USER_MAP } from "../types/constants";

// Dynamically import Slider with SSR disabled
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <div>Loading posts...</div>, // Fallback during hydration
});

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { filterCategory, sortOrder, setFilterCategory } = useBlog();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data.slice(0, 50));
    };
    fetchPosts();
  }, []);

  // Filter posts by userId based on category
  const filteredPosts = filterCategory
    ? posts.filter((post) => post.userId === CATEGORY_USER_MAP[filterCategory as keyof typeof CATEGORY_USER_MAP])
    : posts;

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === "newest") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    if (sortOrder === "popular") return b.id - a.id;
    return 0;
  });

  const sliderSettings = {
    arrows:false,
    slidesToShow: 4, // Default for desktop (4 items)
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1280, // xl (desktop)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // lg (large tablet)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // md (tablet)
        settings: {
          slidesToShow: 1,
          rows:4
        },
      }
    ],
  };

  return (
    <div className="container mx-auto p-4 max-w-[1644px]">
      <div className="flex justify-between items-center mb-4">
        <nav className="text-sm text-secondary-text">
          <span>Home</span> > <span>Blog</span>
        </nav>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest" | "popular")}
          className="p-2 border rounded text-primary-text"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
      <button
        onClick={() => setFilterCategory(null)}
        className="mb-4 text-category-wiedza hover:text-link-hover"
      >
        Clear Filter
      </button>

      <Slider {...sliderSettings} className="mb-8">
        {sortedPosts.map((post) => (
          <div key={post.id} className="px-[28px]">
            <PostTrailer post={post} category={filterCategory || "Wiedza"} />
          </div>
        ))}
      </Slider>
    </div>
  );
}