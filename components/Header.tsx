import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white p-4">
      <div className="container mx-auto flex items-left flex-col">
        <Link href="/">
            <Image
                src="/assets/images/acme_logo.png"
                alt="ACME logo"
                width={322}
                height={57}
                className="mr-4 pt-6"
            />

        </Link>
        <h1 className="text-header-text font-sans font-bold flex flex-row justify-start items-center mt-5">
          <span className="w-[10px] bg-header-text h-[1px]"></span>
          <span className="ml-2 text-xs">BLOG</span>
        </h1>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-[#dddddd]"></hr>
        <h2 className="text-header-text font-sans font-bold text-3xl">Blog edukacyjny</h2>
      </div>
    </header>
  );
}