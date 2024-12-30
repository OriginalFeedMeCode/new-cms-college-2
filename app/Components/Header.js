import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const Header = ({ session }) => {
  const loginId = session?.user?.loginId;
  const myName = session?.user?.name;
  async function logoutUser() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Log out Success");
        signOut();
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  function firstLetter(name) {
    return name.charAt(0);
  }

  return (
    <header className="w-full border-b min-h-max bg-white/80 backdrop-blur z-[999]">
      <nav className="flex gap-2 items-center justify-between py-4 px-2 md:px-6">
        <Image
          priority
          src={"/is-blue-logo.webp"}
          width={200}
          height={200}
          className="w-auto"
          alt="International Schooling Logo"
        />
        {session && (
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-base-200 w-10 h-10 text-xl font-bold hidden md:flex md:items-center md:justify-center ">
              {myName && firstLetter(myName)}
            </div>
            <button
              className="btn btn-error text-white"
              onClick={() => {
                logoutUser();
              }}
            >
              Signout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
