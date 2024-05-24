// This line prevents the code from running on the server-side (important for React)
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const Banner = ({ video }) => {
	// State variable to control the display of the loader
	const [timer, setTimer] = useState(false);

	/* useEffect(() => {
		(async () => {
			try {
				const res = await axios.get('/api/sendsms')
				// console.log(res?.data);
			} catch (error) {
				console.log("Error fetching data:", error);
			}
		})();
	}, []); */

	// Use effect hook to simulate a 2-second delay before showing the video
	/* useEffect(() => {
		const timeoutId = setTimeout(() => {
			setTimer(true);
		}, 2000);

		// Cleanup function to clear the timeout when the component unmounts
		return () => clearTimeout(timeoutId);
	}, []); */

	return (
		<div className="relative w-full mb-4  ">
			{/* Conditionally render the video or loader based on the timer state */}
			{timer === true ? (
				<div className="relative inset-0 z-10">
					<video autoPlay muted loop className="w-full h-full object-cover relative z-[-1000]">
						<source src={video} type="video/mp4" />
					</video>
					{/* Overlay div for darkening the background (optional) */}
					<div className="absolute inset-0 bg-black opacity-10 z-50"></div>
				</div>
			) : (
				<div className="w-full flex justify-center items-center p-10">
					<PropagateLoader color="#363bd6" cssOverride={{}} loading size={10} />
				</div>
			)}
		</div>
	);
};

export default Banner;
