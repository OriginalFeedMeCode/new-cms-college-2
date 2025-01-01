import Header from "@Components/Header";
import { useSession } from "next-auth/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionedAside from "./SessionedAside";

export default function SessionedPagesLayout({ children }) {
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <div className="flex flex-col h-[100svh]">
      {session && <Header session={session} />}
      <div className="flex gap-2 flex-1">
        {session && <SessionedAside role={role} />}
        <div
          className={`${
            session
              ? "flex-1 max-h-[calc(100svh-82px)] py-6 px-2 md:px-4 overflow-y-auto "
              : "w-full"
          }`}
        >
          {children}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
