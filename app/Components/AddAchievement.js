"use client";
import CountriesConstant from "@Constants/CountriesConstant";
import { uploadFileMain } from "@Utils/FileUploadUtil";
import { Plus, VideoIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function AddAchievementForm() {
  const fileUpload = useRef(null);
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [showMediaFiles, setShowMediaFiles] = useState({
    view: false,
    type: "",
    url: "",
    name: "",
  });

  function getPreviewUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async function getFilePreviewUrl(file) {
    try {
      const url = await getPreviewUrl(file);
      return url;
    } catch (error) {
      console.error("Error generating preview URL:", error);
      return null;
    }
  }

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];

    for (const file of files) {
      if (file.size > 9 * 1024 * 1024) {
        toast.error(`${file.name} exceeds the 9MB size limit.`);
      } else {
        try {
          const url = await getFilePreviewUrl(file);
          const fileType = file.type.startsWith("image/") ? "I" : "V";
          validFiles.push({
            type: fileType,
            file: file,
            url,
            name: file.name,
          });
        } catch (error) {
          console.error("Error generating preview URL:", error);
        }
      }
    }
    setMediaFiles((prevData) => [...prevData, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setMediaFiles((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    subtitle: "",
    country: "",
    content: "",
    createdDate: new Date(),
    mainMediaType: "",
    mainMediaVideo: "",
    mainMediaImage: "",
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
    } else if (!formData.name) {
      toast.error("Name is required.");
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
    } else if (!formData.mainMediaType) {
      toast.error("Main Media Type is required.");
      setLoading(false);
      return;
    } else if (formData.mainMediaType === "V" && !formData.mainMediaVideo) {
      toast.error("Main Media Video is required for type 'Video'.");
      setLoading(false);
      return;
    } else if (!formData.mainMediaImage) {
      toast.error("Main Media Image is required");
      setLoading(false);
      return;
    }
    let mediaData = [];

    for (const fileData of mediaFiles) {
      try {
        const formData = new FormData();
        formData.append("file", fileData.file);
        const { url } = await uploadFileMain(formData);
        const data = { type: fileData.type, url, name: fileData.name };
        mediaData.push(data);
      } catch (error) {
        console.error("Error Uploading Files", error);
      }
    }

    const media = {
      media: mediaData,
    };
    if (media.length === 0) {
      toast.error("Atleast 1 Media file is required.");
      setLoading(false);
      return;
    }
    const data = {
      title: formData.title,
      description: formData.description,
      name: formData.name,
      subtitle: formData.subtitle ? formData.subtitle : "N/A",
      country: formData.country,
      content: formData.content,
      createdBy: userId,
      mainMediaType: formData.mainMediaType,
      mainMediaVideo: formData.mainMediaVideo,
      mainMediaImage: formData.mainMediaImage,
      media: JSON.stringify(media),
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-achievement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resdata = await response.json();
      if (!response.ok) {
        toast.error(resdata.message);
      } else {
        toast.success(resdata.message);
        router.push("/achievement");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  }

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
        <div className="mb-2">
          <label
            htmlFor="subtitle"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter Subtitle
          </label>
          <input
            name="subtitle"
            id="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="Max 60 Characters"
          />
        </div>
        <div className="mb-6">
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
        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Name
            </label>
            <input
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
              placeholder="John Doe"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="mainMediaType"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Choose Main Media Type
            </label>
            <select
              name="mainMediaType"
              id="mainMediaType"
              value={formData.mainMediaType}
              onChange={handleChange}
              className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            >
              <option value="" defaultValue>
                Select Type
              </option>
              <option value="I">Image</option>
              <option value="V">Video</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mainMediaImage"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              {formData.mainMediaType !== "V"
                ? "Main Media Image URL"
                : "Thumbnails URL"}
            </label>
            <input
              name="mainMediaImage"
              id="mainMediaImage"
              value={formData.mainMediaImage}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
              placeholder="https://...."
            />
          </div>
          {formData.mainMediaType === "V" && (
            <div>
              <label
                htmlFor="mainMediaVideo"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Insert Youtube Video Url
              </label>
              <input
                name="mainMediaVideo"
                id="mainMediaVideo"
                value={formData.mainMediaVideo}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
                placeholder="https://...."
              />
            </div>
          )}
        </div>

        <div className="mb-6">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
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

        <div className="mb-2">
          <label
            htmlFor="media"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Upload All Media
          </label>
          <input
            type="file"
            id="media"
            ref={fileUpload}
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          ></input>
          <input
            onClick={() => {
              fileUpload.current.click();
            }}
            className="cursor-pointer disabled bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
            placeholder="Click me to Upload files."
          />
        </div>
        {mediaFiles.length > 0 && (
          <div className="my-6 grid grid-cols-3 md:grid-cols-8 gap-4 w-max">
            {mediaFiles.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-14 h-14 border rounded-xl flex items-center justify-center relative"
                >
                  <button
                    onClick={() => {
                      handleRemoveFile(index);
                    }}
                    className="w-4 z-50 h-4 flex items-center justify-center rotate-45 absolute -top-1 -right-1 rounded-full bg-red-500"
                  >
                    <Plus size={10} />
                  </button>
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
        )}

        <button
          type="submit"
          className={` ${
            loading && "btn-disabled"
          } w-full text-white bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-4 md:w-max mt-6  `}
        >
          Save Achievement
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </button>
      </form>
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
            <p className="text-xs mt-2">{showMediaFiles.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
