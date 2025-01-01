"use client";
import { Plus, VideoIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Gallery({ mediaFiles }) {
  const [showMediaFiles, setShowMediaFiles] = useState({
    view: false,
    type: "",
    url: "",
    name: "",
  });
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-max my-4">
        {mediaFiles.map((item, index) => {
          return (
            <div
              key={index}
              className="w-14 h-14 border rounded-xl flex items-center justify-center cursor-pointer"
            >
              {item.type === "V" ? (
                <VideoIcon
                  onClick={() => {
                    setShowMediaFiles({
                      view: true,
                      type: item.type,
                      url: item.url,
                      name: item.name,
                    });
                  }}
                  size={24}
                />
              ) : (
                <Image
                  onClick={() => {
                    setShowMediaFiles({
                      view: true,
                      type: item.type,
                      url: item.url,
                      name: item.name,
                    });
                  }}
                  src={item.url}
                  width={56}
                  height={56}
                  alt={index}
                  className="object-cover h-full rounded-xl overflow-hidden "
                />
              )}
            </div>
          );
        })}
      </div>
      {showMediaFiles.view && (
        <div className=" w-[100svw] h-[100svh] z-[9999] bg-white/80 backdrop-blur fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
          <Plus
            onClick={() => {
              setShowMediaFiles({ view: false, type: "", url: "", name: "" });
            }}
            className="btn btn-circle btn-error rotate-45 fixed top-4 right-4 p-2"
          />
          <div className="">
            {showMediaFiles.type === "V" ? (
              <video
                src={showMediaFiles.url}
                width={400}
                height={400}
                autoPlay
                controls
                className="aspect-video"
              ></video>
            ) : (
              <Image
                src={showMediaFiles.url}
                width={400}
                height={400}
                className="w-auto h-[200px]"
                alt={showMediaFiles.type}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
