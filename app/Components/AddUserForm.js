"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddUserForm() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const roleRights = ["DEVELOPER", "OWNER"];
  const rights = roleRights.includes(role);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  async function submitForm(event) {
    event.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name) {
      toast.error("Name is required.");
      setLoading(false);
      return;
    }
    if (!formData.email) {
      toast.error("Email is required.");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email format.");
      setLoading(false);
      return;
    }
    if (!formData.password) {
      toast.error("Password is required.");
      setLoading(false);
      return;
    }
    if (!formData.role) {
      toast.error("Role is required.");
      setLoading(false);
      return;
    }
    const data = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: btoa(formData.password),
    };

    const response = await fetch("/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resdata = await response.json();
    if (!response.ok) {
      toast.error(resdata.message);
      setLoading(false);
      return;
    }
    toast.success(resdata.message);
    setLoading(false);
    router.push("/users");
  }

  return (
    <div>
      {rights ? (
        <div>
          <h2 className="text-xl mb-4">Fill the Form</h2>
          <form
            className=" grid grid-cols-1 md:grid-cols-3 gap-4"
            onSubmit={submitForm}
          >
            <div className="mb-2">
              <label
                htmlFor="email"
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
                placeholder="John Doe."
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Enter Email
              </label>
              <input
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
                placeholder="username@domain.com"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Choose Role
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              >
                <option value="" defaultValue>
                  SELECT ROLE
                </option>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="OWNER">OWNER</option>
                <option value="CONTENT WRITER">CONTENT WRITER</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-0 end-0 p-3.5 rounded-e-md "
                >
                  {showPassword ? (
                    <svg
                      className="flex-shrink-0 size-3.5 text-gray-400 "
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg
                      className="flex-shrink-0 size-3.5 text-gray-400 "
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="hidden md:flex md:col-span-2"></div>
            <button
              type="submit"
              className={` ${
                loading && "btn-disabled"
              } w-full text-white md:w-max bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-4  `}
            >
              Create User
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
          </form>
        </div>
      ) : (
        <h2 className="text-xl mb-4">You Can't Create a User</h2>
      )}
    </div>
  );
}
