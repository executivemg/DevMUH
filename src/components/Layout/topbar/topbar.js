import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { useSession, signOut } from "next-auth/react";

const TopBar = () => {
	const path = usePathname();
	const { data: session } = useSession();

	return (
		<div className="bg-[#2C3BFA] p-2">
			{session ? (
				<div className="flex justify-center overflow-hidden">
					<Button
						onClick={() => {
							signOut();
						}}
						className="text-center w-[150px] h-[40px] bg-[#2C3BFA] hover:bg-[#2C3BFA] font-normal text-white  py-2 px-6 mr-2 border-white border-2">
						Logout
					</Button>

					<Link href="/create-event">
						<Button className="w-[150px] text-center h-[40px] bg-[#2C3BFA] hover:bg-[#2C3BFA] text-white  py-2 px-4  border-white border-2">Create Event</Button>
					</Link>

					{path === "/organizer" ? (
						""
					) : (
						<Link href="/organizer">
							<Button className="ml-2 w-[150px] text-center h-[40px] bg-[#2C3BFA] hover:bg-[#2C3BFA] text-white  py-2 px-4  border-white border-2">dashboard</Button>
						</Link>
					)}
				</div>
			) : (
				<div className="flex justify-center">
					<Link href="/login">
						<Button className="text-center w-[150px] h-[40px] bg-[#2C3BFA] hover:bg-[#2C3BFA] font-normal text-white  py-2 px-6 mr-2 border-white border-2">Login</Button>
					</Link>
					<Link href="/create-event">
						<Button className="w-[150px] text-center h-[40px] bg-[#2C3BFA] hover:bg-[#2C3BFA] text-white  py-2 px-4  border-white border-2">Create Event</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default TopBar;
