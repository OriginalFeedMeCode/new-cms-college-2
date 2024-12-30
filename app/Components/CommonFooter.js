import Link from "next/link";
import React from "react";

const CommonFooter = () => {
  return (
    <div className="w-full border-t">
      <div className="md:flex md:gap-2 md:items-center md:justify-between py-4 r-w text-xs">
        <p className="mb-2 md:mb-0">
          &copy; International Schooling {new Date().getFullYear()}
        </p>
        <div className="md:gap-5 md:flex md:items-center">
          <Link
            className="hover:text-blue-600 transition-colors duration-150"
            href={"https://internationalschooling.org/privacy-policy"}
          >
            Privacy & Policies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommonFooter;
