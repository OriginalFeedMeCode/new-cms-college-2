import React from "react";

const VideoPlayerNew = ({ url }) => {
  console.log(url);
  return (
    <iframe
      className={`w-full md:rounded-xl aspect-video`}
      src={url + "?autoplay=1"}
      title="IS Video"
      allow="autoplay"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayerNew;
