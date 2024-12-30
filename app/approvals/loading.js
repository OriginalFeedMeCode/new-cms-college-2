import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex items-center text-xl gap-4">
        <span className="loading loading-spinner loading-xs"></span>Loading...
      </div>
    </div>
  );
}
