"use client";
import { Play } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";

const DynamicModal = dynamic(() => import("./VideoPlayerNew"), {
  ssr: false,
});

export default function VideoElement({ img, video }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleVideo = () => {
    setIsOpen(true);
  };
  return (
    <div>
      {!isOpen && (
        <div onClick={handleVideo} className="w-full cursor-pointer">
          <div className="relative flex items-center justify-center group">
            <Play
              fill="#027FFF"
              size={65}
              stroke="#fff"
              strokeWidth={1}
              className={
                "absolute duration-150 cursor-pointer animate-pulse group-hover:animate-none group-hover:scale-105"
              }
            />

            <Image
              width={300}
              height={300}
              alt={img}
              src={img}
              className="rounded-xl border-2 w-full h-auto"
            />
          </div>
        </div>
      )}
      {isOpen && <DynamicModal url={video} />}
    </div>
  );
}
