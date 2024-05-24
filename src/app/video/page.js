import React from "react";

const page = () => {
	return (
		<div className="w-full h-[100vh]">
			<div className=" absolute  top-0 left-0 w-full h-full"></div>
			<video className="w-full h-full object-cover " src={"/videos/2.mp4"} autoPlay muted loop />
		</div>
	);
};

export default page;
