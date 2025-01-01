import AddNewsForm from "@Components/AddNewsForm";
import Uploader from "@Components/Uploader";
import React from "react";

export default function AddNewsPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:divide-x-2">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Add News</h1>
        <h2 className="text-xl mb-4">Fill Form</h2>
        <AddNewsForm />
      </div>
      <Uploader />
    </div>
  );
}
