"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteUserButton({ userId, name }) {
  const [popup, setPopUp] = useState(false);
  const { data: session } = useSession();
  const myUserId = session?.user?.userId;
  const role = session?.user?.role;
  const roleRights = ["DEVELOPER", "OWNER"];
  const rights = roleRights.includes(role);
  async function deleteUser(userId) {
    if (!rights) {
      toast.error("Unauthorize Request");
      return;
    }
    try {
      const response = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete user");
      }
      const result = await response.json();
      toast.success(result.message);
      setPopUp(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      return {
        status: "failed",
        message: error.message || "An error occurred while deleting the user",
      };
    }
  }

  return (
    <>
      {popup && (
        <div className="w-[100svw] h-[100svh] z-[9999] bg-white/80 backdrop-blur fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
          <div className="w-full md:w-max px-4 md:px-12 py-6 bg-white border md:rounded-xl">
            <h3 className="text-xl md:text-2xl font-medium text-red-500 mb-4">
              Do you want to Delete User ?
            </h3>
            <p className="mb-4">Confirm User - {name} deletion.</p>
            <div className="flex items-center gap-5">
              <button
                onClick={() => {
                  deleteUser(userId);
                }}
                className="btn btn-error !text-white"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setPopUp(false);
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {session && (
        <button
          onClick={() => {
            setPopUp(true);
          }}
          className={`btn  text-white ${
            userId == myUserId ? "btn-disabled" : "btn-error"
          }`}
        >
          Delete User
        </button>
      )}
    </>
  );
}
