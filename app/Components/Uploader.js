"use client";
import { uploadFileMain } from "@Utils/FileUploadUtil";
import { Upload } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const MAX_FILE_SIZE = 9 * 1024 * 1024;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewURL(reader.result);
        };

        if (file.type.startsWith("image/")) {
          reader.readAsDataURL(file);
        } else if (file.type === "application/pdf") {
          setPreviewURL("/pdf-icon.png");
        } else if (file.type.startsWith("video/")) {
          reader.readAsDataURL(file);
        } else {
          setSelectedFile(null);
          setPreviewURL(null);
          document.querySelector(".file-input").value = "";
          toast.error(
            "Please upload files in PDF, JPG, PNG, JPEG, MOV, or MP4 with max size of 9 MB."
          );
        }
      } else {
        setSelectedFile(null);
        setPreviewURL(null);
        document.querySelector(".file-input").value = "";
        toast.error("Please upload files within the 9 MB limit.");
      }
    }
  };

  const removeFile = () => {
    setPreviewURL(null);
    setSelectedFile(null);
    document.querySelector(".file-input").value = "";
    console.log("File removed.");
  };

  const uploadFile = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await uploadFileMain(formData);
      if (response.status === "success") {
        setUrl(response.url);
        setUploading(false);
        removeFile();
      }
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error("Unable to upload file");
    }
  };

  return (
    <div className="min-h-max px-4">
      <div className="h-max rounded-xl">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          Media Uploader <Upload size={18} />
        </h2>
        <div className="input-container grid grid-cols-1 items-center gap-4">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`btn text-black ${uploading ? "btn-disabled" : ""}`}
                onClick={uploadFile}
              >
                {uploading ? (
                  <div className="flex items-center gap-1">
                    <span className="loading loading-spinner"></span>{" "}
                    Uploading...
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
              <button
                className={`btn text-black  ${uploading ? "btn-disabled" : ""}`}
                onClick={removeFile}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        {previewURL && (
          <div className="mt-4">
            {selectedFile.type.startsWith("video/") ? (
              <video controls className="w-auto max-h-[300px] rounded-xl">
                <source src={previewURL} type={selectedFile.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={previewURL}
                alt="Preview"
                className="w-auto max-h-[300px] rounded-xl"
              />
            )}
          </div>
        )}
        {url && (
          <div className="flex flex-col gap-4">
            <Link
              target="_blank"
              href={url}
              className="font-semibold text-blue-600 my-2 truncate w-[300px] max-w-[400px]"
            >
              {url}
            </Link>
            <button
              className="btn"
              onClick={() => {
                navigator.clipboard
                  .writeText(url)
                  .then(() => toast.success("URL copied!"));
                setUrl("");
              }}
            >
              Copy Url
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
