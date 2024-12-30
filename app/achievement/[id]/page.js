import ApproveAchievementButton from "@Components/ApproveAchievementButton";
import Gallery from "@Components/Gallery";
import VideoElement from "@Components/VideoElement";
import { Expand, Laptop, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function EditAchievementPage({ params, searchParams }) {
  const { id } = await params;
  const { tab = "p" } = await searchParams;
  const response = await fetch(
    "http://localhost:3000/api/get-achievement-by-id",
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
        <h2 className="text-xl mb-4">Achievement Not Found</h2>
      </div>
    );
  }
  const achievement = data.data;
  const media = JSON.parse(achievement.MEDIA);
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
        <div className="w-full md:w-[270px] md:h-[480px] md:border md:rounded-xl md:mx-auto p-2">
          {achievement.MAIN_MEDIA_TYPE === "I" ? (
            <Image
              src={achievement.MAIN_MEDIA_IMAGE}
              width={400}
              height={400}
              alt="Main Image"
              className="h-auto rounded-xl"
            />
          ) : (
            <VideoElement
              img={achievement.MAIN_MEDIA_IMAGE}
              video={achievement.MAIN_MEDIA_VIDEO}
            />
          )}
          <div className="p-2 w-full">
            <h2 className="font-medium text-sm text-blue-800 w-full ">
              {achievement.NAME}
            </h2>
            <h2 className="font-semibold text-lg mb-2">{achievement.TITLE}</h2>
            <h3 className="mb-4 font-medium">{achievement.SUBTITLE}</h3>
            <p className="text-sm mb-4">{achievement.DESCRIPTION}</p>
            <button className="btn ">Read More</button>
          </div>
        </div>
      )}
      {tab === "d" && (
        <div className="w-full">
          <div className="w-4/5 mx-auto grid grid-cols-2 gap-5 items-center">
            {achievement.MAIN_MEDIA_TYPE === "I" ? (
              <Image
                src={achievement.MAIN_MEDIA_IMAGE}
                width={400}
                height={400}
                alt="Main Image"
                className="h-auto rounded-xl"
              />
            ) : (
              <VideoElement
                img={achievement.MAIN_MEDIA_IMAGE}
                video={achievement.MAIN_MEDIA_VIDEO}
              />
            )}
            <div className="py-2">
              <h2 className="text-lg font-medium py-1 px-4 rounded bg-blue-100 text-blue-800 w-max mb-4">
                {achievement.NAME}
              </h2>
              <h2 className="text-xl font-medium">{achievement.TITLE}</h2>
              <h3 className="mb-4">{achievement.SUBTITLE}</h3>
              <p className="text-sm mb-4">{achievement.DESCRIPTION}</p>
              <button className="btn ">Read More</button>
            </div>
          </div>
        </div>
      )}
      {tab === "e" && (
        <div className="w-4/5 mx-auto">
          <div className="grid grid-cols-2 gap-5 items-center mb-6">
            {achievement.MAIN_MEDIA_TYPE === "I" ? (
              <Image
                src={achievement.MAIN_MEDIA_IMAGE}
                width={400}
                height={400}
                alt="Main Image"
                className="h-auto rounded-xl"
              />
            ) : (
              <VideoElement
                img={achievement.MAIN_MEDIA_IMAGE}
                video={achievement.MAIN_MEDIA_VIDEO}
              />
            )}
            <div className="py-2">
              <h2 className="text-lg font-medium py-1 px-4 rounded bg-blue-100 text-blue-800 w-max mb-4">
                {achievement.NAME}
              </h2>
              <h2 className="text-xl font-medium">{achievement.TITLE}</h2>
              <h3 className="mb-4">{achievement.SUBTITLE}</h3>
              <Gallery mediaFiles={media.media} />
              <p className="text-sm mb-4">{achievement.DESCRIPTION}</p>
            </div>
          </div>
          <p className="font-medium">{achievement.CONTENT}</p>
        </div>
      )}
      {achievement.STATUS !== "A" && (
        <ApproveAchievementButton postId={id} status={"A"} />
      )}
    </div>
  );
}
