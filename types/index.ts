export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number; // Using JSONPlaceholder's structure
  }

  export interface Category {
    name: string;
    color: string;
    icon: string;
    image: string;
  }