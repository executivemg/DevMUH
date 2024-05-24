"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Input } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Page() {

  const route = useRouter()
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.status === 200) {
        toast.success("logged In successfully!");
        // window.location.href = `/create-event`
        route.push("/")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <Toaster />
      <div className="w-full max-w-xl   p-10 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Sign in to your account
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
              label="Enter emal address"
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              label="Enter password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"

              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Sign in
          </button>
          <p className="text-sm text-gray-800 mt-2">
            Don’t have an account yet?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};


