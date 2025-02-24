"use client";

import Image from "next/image";
import { useBlog } from "./BlogContext";

interface CategoryBlockProps {
  category: { name: string; color: string; icon: string; image: string; iconColor?: string };
}

export default function CategoryBlock({ category }: CategoryBlockProps) {
  const { setFilterCategory } = useBlog();

  return (
    <div
      onClick={() => setFilterCategory(category.name)}
      className={`rounded-tl-[60px] rounded-br-[60px] shadow-lg cursor-pointer ${category.color} text-white flex flex-col items-center w-[366px] h-[457px]`}
    >
      <div className="relative w-full h-[228.5px]">
        <Image
          src={category.image}
          alt={`${category.name} background`}
          fill
          className="rounded-tl-[60px] object-cover"
          quality={85}
          sizes="(max-width: 366px) 100vw"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-[228.5px] w-full">
        <div className={`text-lg font-semibold ${category.iconColor || "text-white"}`}>
          {category.name}
        </div>
        <Image
          src={category.icon}
          width={50}
          height={50}
          alt={category.name}
          className="mt-4"
        />
      </div>
    </div>
  );
}