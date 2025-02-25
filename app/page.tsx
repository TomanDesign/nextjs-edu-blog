"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CategoryBlock from "../components/CategoryBlock";
import BlogList from "../components/BlogList";
import { CATEGORY_USER_MAP } from "../types/constants";

// Dynamically import Slider with SSR disabled
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <div>Loading categories...</div>,
});

const categories = [
  {
    name: "Wiedza",
    color: "bg-category-purple",
    iconColor: "text-white",
    icon: "/assets/svg/wiedza.svg",
    image: "/assets/images/wiedza_thumb.jpg",
  },
  {
    name: "Inspiracje",
    color: "bg-category-yellow",
    iconColor: "text-header-text",
    icon: "/assets/svg/inspiracje.svg",
    image: "/assets/images/inspiracje_thumb.jpg",
  },
  {
    name: "Interpretacje",
    color: "bg-category-red",
    iconColor: "text-white",
    icon: "/assets/svg/interpretacje.svg",
    image: "/assets/images/interpretacje_thumb.jpg",
  },
  {
    name: "Dostępne",
    color: "bg-category-green",
    iconColor: "text-header-text",
    icon: "/assets/svg/dostepne.svg",
    image: "/assets/images/dostepne_thumb.jpg",
  },
];

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
      setIsLoading(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: '60px',
    dotsClass: "slick-dots slick-dots-top",
    responsive: [
      {

        breakpoint: 1280, // xl

        settings: {
          dots: true,
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          dots: true,
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          dots: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        },
      },
    ],
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <>
      <div className="bg-background-gray">
        <div className="container mx-auto max-w-[1644px] pt-20">
          <Slider {...sliderSettings} className="pb-16 ">
            {categories.map((category) => (
              <div key={category.name} className="">
                <CategoryBlock category={category} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="container mx-auto max-w-[1644px]">
        <BlogList />
      </div>
      </>
  );
}