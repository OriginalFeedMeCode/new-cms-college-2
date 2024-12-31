"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required.");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format.");
      setLoading(false);
      return;
    }
    login(formData.email, formData.password);
  };

  const login = async (email, password) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: btoa(password),
        }),
      }
    );
    if (!response.ok) {
      console.log(response);
      toast.error("Login failed. Please try again.");
      setLoading(false);
      return;
    }
    toast.success("User signed in successfully");
    const data = await response.json();
    const { userId, loginId, name, role } = data.data;
    await signIn("credentials", {
      userId,
      loginId,
      name,
      email,
      role,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-full md:w-[350px] !max-h-max bg-white rounded-lg shadow  md:mt-0 xl:p-0  ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Sign in to your account
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              autoComplete="current-username"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
              placeholder="username@domain.com"
            />
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      "
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-0 end-0 p-3.5 rounded-e-md"
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-start">
              <Link
                href="https://internationalschooling.org/terms-of-use/"
                className="text-sm font-medium   hover:underline"
              >
                Terms of use
              </Link>
            </div>
            <Link
              href="/forget-password"
              className="text-sm font-medium text-blue-600 hover:underline "
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className={` ${
              loading && "btn-disabled"
            } w-full text-white bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   `}
          >
            Sign in{" "}
            {loading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
