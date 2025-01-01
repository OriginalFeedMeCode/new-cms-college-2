"use client";
import CountriesConstant from "@Constants/CountriesConstant";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function AddNewsForm() {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    title: "",
    img: "",
    description: "",
    content: "",
    country: "",
    publishDate: "",
    sourceUrl: "",
    createdBy: userId,
  });

  async function submitForm(event) {
    event.preventDefault();
    setLoading(true);

    if (!formData.title) {
      toast.error("Title is required.");
      setLoading(false);
      return;
    } else if (!formData.description) {
      toast.error("Description is required.");
      setLoading(false);
      return;
    } else if (!formData.img) {
      toast.error("Related image is required.");
      setLoading(false);
      return;
    } else if (!formData.country) {
      toast.error("Country is required.");
      setLoading(false);
      return;
    } else if (!formData.content) {
      toast.error("Content is required.");
      setLoading(false);
      return;
    } else if (!formData.publishDate) {
      toast.error("Published Date is required.");
      setLoading(false);
      return;
    }

    const data = {
      title: formData.title,
      description: formData.description,
      country: formData.country,
      content: formData.content,
      createdBy: userId,
      publishedDate: formData.publishDate,
      img: formData.img,
      sourceUrl: formData.sourceUrl,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
        router.push("/news");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false); // Ensure the loading state is reset
    }
  }

  const formatDateToString = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  return (
    <div>
      <form className="" onSubmit={submitForm}>
        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter Title
          </label>
          <input
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="Max 60 Characters"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="Max 160 Characters"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="img"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Image URL
          </label>
          <input
            name="img"
            id="img"
            value={formData.img}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="https://...."
          />
        </div>
        {formData.img && (
          <Image
            src={formData.img}
            alt="news-image"
            width={400}
            height={800}
            className="h-auto mb-4"
          />
        )}

        <div className="mb-4">
          <label
            htmlFor="img"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Source URL
          </label>
          <input
            name="sourceUrl"
            id="sourceUrl"
            value={formData.sourceUrl}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="https://...."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="img"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Article Published Date (DD-MM-YYYY)
          </label>
          <input
            type="date"
            name="publishDate"
            id="publishDate"
            value={formatDateToString(
              formData.publishDate ? formData.publishDate : new Date()
            )}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="https://...."
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter Content
          </label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            className="bg-gray-50 h-96 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="Content..."
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Choose Country
          </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          >
            <option value="" defaultValue>
              Select Country
            </option>
            {CountriesConstant.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className={` ${
            loading && "btn-disabled"
          } w-full text-white bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-4 md:w-max mt-6  `}
        >
          Save News
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </button>
      </form>
    </div>
  );
}
