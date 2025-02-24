"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CategoryBlock from "../components/CategoryBlock";
import BlogList from "../components/BlogList";

// Dynamically import Slider with SSR disabled
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const categories = [
  { name: "Wiedza", color: "bg-category-purple", iconColor: "text-white", icon: "/assets/svg/wiedza.svg", image: "/assets/images/wiedza_thumb.jpg" },
  { name: "Inspiracje", color: "bg-category-yellow", iconColor: "text-header-text", icon: "/assets/svg/inspiracje.svg", image: "/assets/images/inspiracje_thumb.jpg" },
  { name: "Interpretacje", color: "bg-category-red", iconColor: "text-white", icon: "/assets/svg/interpretacje.svg", image: "/assets/images/interpretacje_thumb.jpg" },
  { name: "Dostępne", color: "bg-category-green", iconColor: "text-header-text", icon: "/assets/svg/dostepne.svg", image: "/assets/images/dostepne_thumb.jpg" },
];

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1600);
      setIsLoading(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: false,
    draggable:true,
    centerPadding: '60px',
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: true,
    dotsClass: "slick-dots slick-dots-top",
    responsive: [
      {
        breakpoint: 1600, // xl
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        },
      },
      {
        breakpoint: 1580, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        },
      },
      {
        breakpoint: 1280, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <>
      <div className="bg-background-gray flex flex-col items-center">
        <div className="container py-12">
        {isDesktop ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[60px] mx-auto">
            {categories.map((category) => (
              <CategoryBlock key={category.name} category={category} />
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className="my-8">
            {categories.map((category) => (
              <div key={category.name} className="px-[30px]">
                <CategoryBlock category={category} />
              </div>
            ))}
          </Slider>
        )}
        </div>
      </div>
      <div className="container mx-auto p-4">
        <BlogList />
      </div>
    </>
  );
}