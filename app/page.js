import React from "react";
import CommonFooter from "@Components/CommonFooter";
import CommonHeader from "@Components/CommonHeader";
import LoginForm from "@Components/LoginForm";
import { options } from "api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(options);
  if (session) redirect("dashboard");
  return (
    <div className="flex flex-col h-[100svh]">
      <CommonHeader />
      <div className="min-h-max r-w flex-1 md:flex md:items-start md:gap-12 space-y-6 md:space-y-0 leading-tight py-36 md:py-12 ">
        <div className="flex-1 min-h-max rounded-xl text-blue-900 flex">
          <div className="">
            <h2 className="text-[8vw] md:text-[4vw] font-semibold">
              Welcome to
            </h2>
            <h1 className="text-[4.4vw] mb-4 md:text-[2vw] font-bold">
              International Schooling CMS
            </h1>
            <p className="text-justify">
              Whether you&apos;re updating your website&apos;s content, managing
              user permissions, or fine-tuning settings, everything you need is
              right here at your fingertips. Please log in to access your admin
              account and start managing your website effectively. If you
              encounter any issues or have any questions, our support team is
              always here to assist you.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
      <CommonFooter />
    </div>
  );
};

export default Home;
