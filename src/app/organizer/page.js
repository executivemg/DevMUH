"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { Button } from "@material-tailwind/react";
import { DeleteEvent } from "@/helper/Event";
import toast from "react-hot-toast";
import Link from "next/link";

const cl = console.log.bind(console);

export default function Page() {
	const [products, setProducts] = useState([]);
	const [fetch, setFetch] = useState(false);
	const { data: session } = useSession();

	useEffect(() => {
		const handleEvent = async () => {
			try {
				const id = session?.id;
				const response = await axios.get(`/api/create-event?id=${id}`);
				setProducts(response.data.data);
			} catch (error) {
				console.log(error.message);
			}
		};

		handleEvent();
	}, [session, fetch]);

	const HandleDelete = async (id) => {
		const url = `/api/create-event?id=${id}`;

		try {
			await DeleteEvent(url);
			toast.success("Event deleted successfully");
			setFetch((prevFetch) => !prevFetch); // Toggle fetch state to trigger useEffect
		} catch (error) {
			toast.error(error.message); // Show error message using toast or any other notification method
		}
	};

	return (
		<div className="flex justify-center items-center mt-2 ml-20 mb-[16rem]">

			{session ? (
			<>
			{/* ::::::::::::::::::::::::::::::: REVAMPED TABLE DESIGN */}
				<div>
				</div>

				
				<div className="relative shadow-md sm:rounded-lg overflow-x-auto">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Event Name
								</th>
								<th scope="col" className="px-6 py-3">
									Flyer
								</th>
								<th scope="col" className="px-6 py-3">
									Date
								</th>
								<th scope="col" className="px-6 py-3">
									Start time
								</th>
								<th scope="col" className="px-6 py-3">
									End time
								</th>
								<th scope="col" className="px-6 py-3">
									Location
								</th>
								<th scope="col" className="px-6 py-3">
									Price
								</th>
								<th scope="col" className="px-6 py-3">
									Address
								</th>
								<th scope="col" className="px-6 py-3">
									Custom domain
								</th>
								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.eventTitle}</td>
									<td className="px-6 py-4">{product.flyerURLs[0] ? <Image src={product.flyerURLs[0]} width={100} height={100} alt="flyer image" /> : ""}</td>
									<td className="px-6 py-4">{product.dateOfEvent.slice(0, 10)}</td>
									<td className="px-6 py-4">{product.startTime}</td>
									<td className="px-6 py-4">{product.endTime}</td>
									<td className="px-6 py-4">{product.addressOfVenue}</td>
									<td className="px-6 py-4">{product.ticketPrice}</td>
									<td className="px-6 py-4">{product.addressOfVenue}</td>
									<td className="px-6 py-4">{product.interestedInCustomDomain ? "YES" : "NO"}</td>
									<td className="flex items-center px-6 py-4">
										<Button onClick={() => HandleDelete(product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline bg-white ms-3">
											Remove
										</Button>
										<Link href={`/edit/${product._id}`}>
											<Button className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-white ms-3">EDIT</Button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				</>
			) : (
				<FadeLoader color="#363bd6" cssOverride={{}} loading size={10} />
			)}
		</div>
	);
}
