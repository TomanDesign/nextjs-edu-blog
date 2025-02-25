"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CATEGORY_USER_MAP } from "../types/constants";

interface BlogContextType {
  filterCategory: string | null;
  setFilterCategory: (category: string | null) => void;
  sortOrder: "newest" | "oldest" | "popular";
  setSortOrder: (order: "newest" | "oldest" | "popular") => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "popular">("newest");

  return (
    <BlogContext.Provider value={{ filterCategory, setFilterCategory, sortOrder, setSortOrder }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within a BlogProvider");
  return context;
};