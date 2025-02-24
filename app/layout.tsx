import { BlogProvider } from "../components/BlogContext";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="bg-white">
        <BlogProvider>
          <Header />
          {children}
        </BlogProvider>
      </body>
    </html>
  );
}