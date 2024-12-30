import DeleteAchievementButton from "@Components/DeleteAchievementButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function AllAcheivements() {
  const response = await fetch("/api/get-achievements");
  if (!response.ok) {
    return (
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Achievements</h1>
        <h2 className="text-xl mb-4">Sorry No Achievements Currently</h2>
      </div>
    );
  }

  function getFinalStatus(char) {
    switch (char) {
      case "P":
        return "Pending";
      case "A":
        return "Approved";
      case "D":
        return "Deleted";
      default:
        return "Unknown Status";
    }
  }

  const data = await response.json();
  const achievements = data.data;
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Achievements</h1>
      <h2 className="text-xl mb-4">Total - {achievements.length}</h2>
      <table className="table overflow-x-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Media</th>
            <th>Name / Title / Sub Title</th>
            <th>Country / Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((item, index) => {
            return (
              <tr className="hover:bg-gray-50" key={index}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={item.mmi}
                    width={100}
                    height={100}
                    alt={item.mmi}
                    className="h-auto rounded-xl"
                  />
                </td>
                <td>
                  <div>
                    <h2 className=" text-xl font-medium mb-2">{item.name}</h2>
                    <h2 className="font-medium">{item.title}</h2>
                    <p>{item.subtitle || "N/A"}</p>
                  </div>
                </td>
                <td>
                  {item.country} / {getFinalStatus(item.status)}
                </td>
                <td className="flex items-center gap-4">
                  <Link
                    href={`/achievement/edit/${item.id}`}
                    className={`${
                      item.status === "A" ? "btn btn-disabled" : "btn"
                    }`}
                  >
                    Edit Post
                  </Link>
                  <Link href={`/achievement/${item.id}`} className={"btn"}>
                    View Post
                  </Link>
                  <DeleteAchievementButton
                    status={item.status}
                    postId={item.id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
