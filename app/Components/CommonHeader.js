import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommonHeader = () => {
  return (
    <div className="w-full border-b min-h-max">
      <div className="flex gap-2 items-center justify-between py-4 r-w">
        <Image
          priority
          src={"/is-blue-logo.webp"}
          width={200}
          height={200}
          className="w-auto"
          alt="International Schooling Logo"
        />
        <Link href={"https://internationalschooling.org/"} className="btn">
          Visit Website
        </Link>
      </div>
    </div>
  );
};

export default CommonHeader;
