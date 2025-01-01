import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

export default async function ViewAllPendingNewsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-pending-news`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return (
      <div className="">
        <h1 className="text-3xl font-bold mb-4">All News</h1>
        <h2 className="text-xl mb-4">Sorry No News Currently</h2>
      </div>
    );
  }

  const data = await response.json();
  const news = data.data || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All News</h1>
      <h2 className="text-xl mb-4">Total News - {news.length}</h2>
      <table className="table overflow-x-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Media</th>
            <th>Title / Description / Source</th>
            <th>Country / Publish Date / Status</th>
          </tr>
        </thead>

        {news.length > 0 ? (
          <tbody>
            {news.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={item.IMG}
                    width={150}
                    height={150}
                    alt={item.IMG}
                    className="h-auto object-contain rounded-xl"
                  />
                </td>
                <td className="max-w-96">
                  <h2 className="font-medium mb-2">{item.TITLE}</h2>
                  <p className="text-xs mb-2">{item.DESCRIPTION}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-max">
                    <Link
                      target="_blank"
                      className="btn"
                      href={item.SOURCE_URL}
                    >
                      View Source
                    </Link>
                    <Link
                      target="_blank"
                      className="btn"
                      href={`/news/${item.ID}`}
                    >
                      View News
                    </Link>
                  </div>
                </td>
                <td className="flex flex-col items-start">
                  <h2 className="font-medium mb-2">{item.COUNTRY}</h2>
                  <p className="text-xs mb-2">
                    {format(new Date(item.PUBLISH_DATE), "MMM dd, yyyy")}
                    <br />
                    <br />
                    <span className="font-semibold">
                      {getFinalStatus(item.STATUS)}
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr className="text-3xl text-gray-500">
              <td>No Pending Approvals ! Shabbash</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
