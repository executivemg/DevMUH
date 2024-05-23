"use client";
import React from "react";
import { Button, Input } from "@material-tailwind/react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
	const route = useRouter();
	const handleSignup = async (e) => {
		e.preventDefault();
		const data = {
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value,
			phone: e.target.phone.value,
		};
		const url = "api/signup";
		try {
			const response = await axios.post(url, data);

			if (response.status === 200) {
				toast.success("account created successfully!");
				route.push("/login");
			}
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
				console.log(error.response.data);
				console.log(error.response.status);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
			console.log(error.config);
		}
	};

	return (
		<section className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
			<div className="w-full max-w-xl   p-10 bg-white rounded-lg shadow-md">
				<p className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Your account</p>
				<form className="space-y-4" onSubmit={handleSignup}>
					<Input type="text" name="name" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required label="Enter name" />
					<Input
						type="email"
						name="email"
						id="email"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
						required
						label="Enter emal address"
					/>
					<Input
						type="password"
						name="password"
						id="password"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
						label="Enter password"
						required
					/>
					<Input
						type="number"
						name="phone"
						id="phone"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
						required
						label="Enter phone number"
					/>

					<Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
						Sign up
					</Button>
					<p className="text-sm text-gray-800 mt-2">
						already have an account ?{" "}
						<Link href="/login" className="text-blue-500 hover:underline">
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}
