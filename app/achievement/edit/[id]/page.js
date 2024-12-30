import EditAchievementForm from "@Components/EditAchievement";
import Uploader from "@Components/Uploader";
import React from "react";

export default async function EditAchievementPage({ params }) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.BASEURL}/api/get-achievement-by-id`,
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
        <h1 className="text-3xl font-bold mb-4">Edit Achievement</h1>
        <h2 className="text-xl mb-4">Achievement Not Found</h2>
      </div>
    );
  }
  const achievement = data.data;
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:divide-x-2">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Edit Achievement</h1>
        <h2 className="text-xl mb-4">Fill Form to update </h2>
        <EditAchievementForm data={achievement} />
      </div>
      <Uploader />
    </div>
  );
}
