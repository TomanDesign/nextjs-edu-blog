"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useBlog } from "../../../components/BlogContext";
import { Post } from "../../types";
import Image from "next/image";

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const { toggleFavorite, favorites } = useBlog();
  const isFavorite = post ? favorites.includes(post.id) : false;

  // Fetch post by id
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [params.id]);

  if (!post) {
    return <div className="text-primary-text">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-[1644px] font-sans">
      <div className="flex justify-end mt-2 mb-12">
        <button
          onClick={() => toggleFavorite(post.id)}
          className="flex items-center text-category-dostepne"
        >
          <span className="mr-2">{isFavorite ? "★" : "☆"}</span> Dodaj do ulubionych
        </button>
      </div>
      <h1 className="text-3xl font-bold font-display mb-4">{post.title}</h1>
      <p className="text-primary-text mb-4">{post.body}</p>

      <div className="py-12">
        <h3 className="text-3xl font-bold font-display mb-4">Lorem ipsum</h3>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
           remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
      </div>
      <Image
        src="/assets/images/3902e58f3f176b8001ea0e177e2a1266.jpg"
        alt="Placeholder"
        width={1024}
        height={744}
        className="rounded-tl-[60px] rounded-br-[60px]" />


      <Link href="/" className="text-category-wiedza hover:text-link-hover mt-4 block text-center">
        <div className="transform rotate-180 inline-block">
          <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1571 0.681786L12.9095 1.92938L17.8468 6.87551L-3.48089e-07 6.87551L-2.70736e-07 8.64514L17.8468 8.64514L12.9006 13.5824L14.1571 14.8389L21.2356 7.76033L14.1571 0.681786Z" fill="black"/>
          </svg>
        </div>
        <span className="pl-4">Powrót do listy wpisów</span>
      </Link>
    </div>
  );
}