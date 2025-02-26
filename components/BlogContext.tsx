"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BlogContextType {
  filterCategory: string | null;
  setFilterCategory: (category: string | null) => void;
  sortOrder: "najnowsze" | "najstarsze";
  setSortOrder: (order: "najnowsze" | "najstarsze") => void;
  favorites: number[];
  toggleFavorite: (postId: number) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"najnowsze" | "najstarsze">("najnowsze");
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Load favorites from localStorage on mount
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Toggle favorite status and save to localStorage
  const toggleFavorite = (postId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(postId)
        ? prevFavorites.filter((id) => id !== postId)
        : [...prevFavorites, postId];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <BlogContext.Provider value={{ filterCategory, setFilterCategory, sortOrder, setSortOrder, favorites, toggleFavorite }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within a BlogProvider");
  return context;
};