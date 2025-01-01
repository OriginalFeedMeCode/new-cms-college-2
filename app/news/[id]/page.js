import ApproveNewsButton from "@Components/ApproveNewsButton";
import { format } from "date-fns";
import { Expand, Laptop, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ViewNewsPage({ params, searchParams }) {
  const { id } = await params;
  const { tab = "p" } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-news-by-id`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    console.error(response);
    return (
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Technical Issue</h1>
        <h2 className="text-xl mb-4">News Not Found</h2>
      </div>
    );
  }
  const news = data.data;

  return (
    <div>
      <div
        role="tablist"
        className="tabs tabs-boxed !bg-blue-100 w-max mx-auto mb-4"
      >
        <Link
          href={"?tab=p"}
          role="tab"
          className={`tab flex items-center gap-2 ${
            tab === "p" ? "bg-blue-800 text-white" : ""
          }`}
        >
          <Smartphone />
          Phone
        </Link>
        <Link
          href={"?tab=d"}
          role="tab"
          className={`tab flex items-center gap-2 ${
            tab === "d" ? "bg-blue-800 text-white" : ""
          }`}
        >
          <Laptop />
          Desktop
        </Link>
        <Link
          href={"?tab=e"}
          role="tab"
          className={`tab flex items-center gap-2 ${
            tab === "e" ? "bg-blue-800 text-white" : ""
          }`}
        >
          <Expand size={21} />
          Expand
        </Link>
      </div>
      {tab === "p" && (
        <div className="w-full md:w-[270px] md:max-h-[480px] overflow-y-auto md:border md:rounded-xl md:mx-auto p-2">
          <Image
            priority
            src={news.IMG}
            width={400}
            height={400}
            alt="Main Image"
            className="h-auto rounded-xl"
          />
          <div className="p-2 w-full">
            <h2 className="font-medium text-sm text-blue-800 w-full ">
              {news.TITLE}
            </h2>
            {news.SUBTITLE !== "N/A" && (
              <h3 className="mb-4 font-medium">{news.SUBTITLE}</h3>
            )}
            <p className="text-sm mb-4">{news.DESCRIPTION}</p>
            <button className="btn ">Read More</button>
          </div>
        </div>
      )}
      {tab === "d" && (
        <div className="w-full">
          <div className="w-4/5 mx-auto grid grid-cols-2 gap-5 items-center">
            <Image
              priority
              src={news.IMG}
              width={400}
              height={400}
              alt="Main Image"
              className="h-auto rounded-xl"
            />

            <div className="py-2">
              <h2 className="text-lg md:max-w-80 font-medium text-blue-800 w-max mb-4">
                {news.TITLE}
              </h2>
              {news.SUBTITLE !== "N/A" && (
                <h3 className="mb-4 font-medium">{news.SUBTITLE}</h3>
              )}
              <p className="text-sm mb-4">{news.DESCRIPTION}</p>
              <button className="btn ">Read More</button>
            </div>
          </div>
        </div>
      )}
      {tab === "e" && (
        <div className="w-4/5 mx-auto">
          <div className="grid grid-cols-2 gap-5 items-center mb-6">
            <Image
              priority
              src={news.IMG}
              width={400}
              height={400}
              alt="Main Image"
              className="h-auto rounded-xl"
            />

            <div className="py-2">
              <p className="mb-2">{news.COUNTRY}</p>
              <p className="text-xs mb-2">
                {format(new Date(news.PUBLISH_DATE), "MMM dd, yyyy")}
              </p>

              <h2 className="text-lg md:max-w-80 font-medium text-blue-800 w-max mb-4">
                {news.TITLE}
              </h2>
              {news.SUBTITLE !== "N/A" && (
                <h3 className="mb-4 font-medium">{news.SUBTITLE}</h3>
              )}
              <p className="text-sm mb-4">{news.DESCRIPTION}</p>
            </div>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html:
                "<p>" + news.CONTENT.replaceAll("\n", "<br/><br/>") + "</p>",
            }}
          ></p>
        </div>
      )}
      {news.STATUS !== "A" && <ApproveNewsButton postId={id} status={"A"} />}
    </div>
  );
}
