"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PostTrailer from "./PostTrailer";
import { useBlog } from "./BlogContext";
import { Post } from "../types";
import { CATEGORY_CONFIG } from "../types/constants";

// Dynamically import Slider with SSR disabled
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <div>Loading posts...</div>,
});

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { filterCategory, setFilterCategory, sortOrder, setSortOrder, favorites } = useBlog();
  const [viewMode, setViewMode] = useState<"wszystkie" | "ulubione">("wszystkie");

  // Fetch posts and set client readiness
  useEffect(() => {
    setIsClient(true);
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      // Filter posts to only include userIds 1-4 (mapped categories)
      const filteredData = data.filter((post: Post) => [1, 2, 3, 4].includes(post.userId));
      setPosts(filteredData.slice(0, 100));
    };
    fetchPosts();
  }, []);

  // Filter posts by userId based on category
  const categoryFilteredPosts = filterCategory
    ? posts.filter((post) => post.userId === CATEGORY_CONFIG[filterCategory as keyof typeof CATEGORY_CONFIG]?.userId)
    : posts;

  // Filter by view mode (wszystkie or ulubione)
  const viewFilteredPosts = viewMode === "ulubione"
    ? categoryFilteredPosts.filter((post) => favorites.includes(post.id))
    : categoryFilteredPosts;

  // Sort posts based on sortOrder
  const sortedPosts = [...viewFilteredPosts].sort((a, b) => {
    if (sortOrder === "najnowsze") return b.id - a.id; // Sort by id descending
    if (sortOrder === "najstarsze") return a.id - b.id; // Sort by id ascending
    return 0; // Default (no sorting if sortOrder is invalid)
  });

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dotsClass: "slick-dots slick-dots-top",
    draggable: true,
    touchThreshold: 5,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 768, // md breakpoint for mobile
        settings: {
          slidesToShow: 1,
          centerMode: false, // Disable center mode for vertical list
          slidesToScroll: 1,
          draggable: true,
          arrows: false, // Hide arrows on mobile
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 max-w-[1644px]">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 mb-8">
      {/* Mobile: Title and sort select in one line, desktop: left column */}
      <div className="col-span-1 md:col-span-1 order-1 md:order-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-header-text font-sans font-bold text-3xl">Wpisy</span>
          <div className="flex items-center space-x-2 w-full md:w-auto md:hidden max-w-[200px]">
            <span className="text-sm text-secondary-text hidden md:block">pokaż od:</span>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value as "najnowsze" | "najstarsze");
              }}
              className="text-sm text-primary-text border-b border-gray-300 bg-transparent appearance-none focus:outline-none focus:border-b-2 focus:border-category-wiedza w-full md:w-auto"
            >
              <option value="najnowsze">najnowsze wpisy</option>
              <option value="najstarsze">najstarsze wpisy</option>
            </select>
          </div>
        </div>
      </div>
      {/* Desktop: Center column with buttons, mobile: below */}
      <div className="col-span-1 md:col-span-1 order-3 md:order-2 flex justify-center py-6 md:py-auto">
        <div className="flex space-x-4 w-full md:w-auto items-center">
          <button
            onClick={() => {
              setViewMode("wszystkie");
              setFilterCategory(null);
            }}
            className={`text-sm uppercase ${viewMode === "wszystkie" && !filterCategory
              ? "underline text-secondary-text font-semibold"
              : "text-primary-text"}`}
          >
            Wszystkie
          </button>
          <span className="px-4 text-secondary-text">&#47;</span>
          <button
            onClick={() => setViewMode("ulubione")}
            className={`text-sm uppercase ${viewMode === "ulubione"
              ? "underline text-secondary-text font-semibold"
              : "text-primary-text"}`}
          >
            Ulubione
          </button>
        </div>
      </div>
      {/* Desktop: Right column with sort select, mobile: ignored */}
      <div className="col-span-1 md:col-span-1 order-2 md:order-3 hidden md:flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-primary-text pr-4">pokaż od:</span>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as "najnowsze" | "najstarsze");
            }}
            className="text-sm text-primary-text border-b border-gray-300 bg-transparent appearance-none
                  focus:outline-none focus:border-b-2 focus:border-category-wiedza font-bold min-w-[200px]"
          >
            <option value="najnowsze">najnowsze wpisy</option>
            <option value="najstarsze">najstarsze wpisy</option>
          </select>
        </div>
      </div>
    </div>

      {isClient ? (
        <>
          <div className="hidden md:block"> {/* Show slider on desktop (md and up) */}
            <Slider {...sliderSettings} className="mb-8">
              {sortedPosts.map((post) => (
                <div key={post.id} className="px-[28px]">
                  <PostTrailer post={post} category={filterCategory || "Wiedza"} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="md:hidden"> {/* Show vertical list on mobile */}
            <div className="grid grid-cols-1 gap-[28px] mb-8">
              {sortedPosts.map((post) => (
                <PostTrailer key={post.id} post={post} category={filterCategory || "Wiedza"} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
}