"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@material-tailwind/react";
import { Button } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateEvent = ({ params }) => {
	const [formData, setFormData] = useState({
		// Initialize state with empty values
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		eventVenue: "",
		eventTitle: "",
		address: "",
		date: "",
		startTime: "",
		endTime: "",
		ticketPrice: "",
		description: "",
		interestedInCustomURL: "",
		image: [],
		variants: [],
		flyerURLs: [],
	});

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [loading, setLoading] = useState(false);

	const route = useRouter();

	/* useEffect(() => {
		// Fetch event data and populate form fields
		async function fetchEventData() {
			try {
				const response = await axios.get(`/api/create-event?eventID=${params.id}`);
				console.log(response);
				const eventData = response.data.data;

				setFormData({
					...eventData,
					date: eventData.dateOfEvent,
					variants: eventData.variants || [],
					flyerURLs: eventData.flyerURLs || [],
				});
			} catch (error) {
				console.error("Error fetching event data:", error.message);
			}
		}

		fetchEventData();
	}, []); */

	const handleInputChange = (e) => {
		if (e.target.type === "file") {
			const newFiles = e.target.files;
			setSelectedFiles([...selectedFiles, ...newFiles]);
			const filesArray = Array.from(e.target.files); // Convert FileList to array
			setFormData({ ...formData, [e.target.name]: filesArray });
		} else {
			const { name, value } = e.target;
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const formDataToSend = new FormData();

			// Append form data
			Object.keys(formData).forEach((key) => {
				// Append variants data separately
				if (key === "variants") {
					formData[key].forEach((variant, index) => {
						Object.entries(variant).forEach(([variantKey, variantValue]) => {
							formDataToSend.append(`variants[${index}][${variantKey}]`, variantValue);
						});
					});
				} else if (key === "image") {
					formData[key].forEach((file, index) => {
						formDataToSend.append(`image[${index}]`, file);
					});
				} else {
					formDataToSend.append(key, formData[key]);
				}
			});

			const response = await axios.put(`/api/create-event?eventID=${params.id}`, formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Event updated successfully!");
			route.push("/organizer");
		} catch (error) {
			console.error("Error updating event:", error.message);
			setLoading(false);
		}
	};

	const handleDescriptionChange = (value) => {
		setFormData({ ...formData, description: value });
	};

	const handleRemoveFile = (index) => {
		const filteredFiles = selectedFiles.filter((file, i) => i !== index);
		setSelectedFiles(filteredFiles);
	};

	const handleVariantChange = (e, index, key) => {
		const newVariants = [...formData.variants];
		newVariants[index][key] = e.target.value;
		setFormData({ ...formData, variants: newVariants });
	};

	const handleRemoveVariant = (index) => {
		const newVariants = [...formData.variants];
		newVariants.splice(index, 1);
		setFormData({ ...formData, variants: newVariants });
	};

	const handleAddVariant = () => {
		const { type, price, v_description } = formData;
		if (type && price && v_description) {
			const newVariant = { type, price, v_description };
			setFormData({
				...formData,
				variants: [...formData.variants, newVariant],
				type: "",
				price: "",
				v_description: "",
			});
		} else {
			toast.error("Please fill all variant fields");
		}
	};

	const handleRemoveFlyer = (index) => {
		const updatedFlyerURLs = [...formData.flyerURLs];
		updatedFlyerURLs.splice(index, 1);

		// Check if the updated array is empty
		const isEmpty = updatedFlyerURLs.length === 0;

		setFormData({ ...formData, flyerURLs: isEmpty ? [] : updatedFlyerURLs });
	};
	console.log(formData);
	return (
		<div className="p-10  w-[100%] bg-gray-100 flex justify-center items-center">
			<div className="bg-white rounded-md p-8 shadow-lg  w-[100%">
				<div className="text-center mb-8">
					<p className="text-gray-500">Update your event details.</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
						<Input label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
						<Input label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
						<Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
						<Input label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
						<Input label="Event Venue" type="text" name="eventVenue" value={formData.eventVenue} onChange={handleInputChange} required />
						<Input label="Event Title" type="text" name="eventTitle" value={formData.eventTitle} onChange={handleInputChange} required />
						<Input label="Address of the Venue" type="text" name="address" value={formData.addressOfVenue} onChange={handleInputChange} required />
						<Input label=" Change the Start Date  " type="date" name="date" value={formData.date} onChange={handleInputChange} />
						<p> Start Date of the Event:{formData.dateOfEvent}</p>
						{/* <Input label="End Date of the Event" type="date" name="date" value={formData.date} onChange={handleInputChange} required /> */}
						<Input label="Event Start Time" type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required />
						<Input label="Event End Time" type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required />
						<Input label="Ticket starting  Price" type="text" name="ticketPrice" value={formData.ticketPrice} onChange={handleInputChange} required />
						<ReactQuill theme="snow" className="mb-14" value={formData.description} onChange={handleDescriptionChange} />
						<div>
							<div className="grid col-span-2 gap-2 max-sm:mt-0 mt-[-20px] max-sm:grid-cols-1">
								<p>Add Variants</p>
								<Input label="Ticket Type" type="text" name="type" value={formData.type} onChange={handleInputChange} />
								<Input label="Ticket Price" type="text" name="price" value={formData.price} onChange={handleInputChange} />
								<Input label="Ticket Description" type="text" name="v_description" value={formData.v_description} onChange={handleInputChange} />
								<Button onClick={handleAddVariant} className="bg-blue-800">
									Add Variant
								</Button>
							</div>
						</div>

						<div className={`${formData.variants.length === 0 ? "hidden" : "grid"}`}>
							<p>Change Variants:</p>
							{formData.variants.map((variant, index) => (
								<div key={index} className=" flex gap-4 flex-col mt-2">
									<Input label={`Variant Type ${index + 1}`} type="text" value={variant.type} onChange={(e) => handleVariantChange(e, index, "type")} />
									<Input label={`Variant Price ${index + 1}`} type="text" value={variant.price} onChange={(e) => handleVariantChange(e, index, "price")} />
									<Input label={`Variant Description ${index + 1}`} type="text" value={variant.v_description} onChange={(e) => handleVariantChange(e, index, "v_description")} />
									<Button onClick={() => handleRemoveVariant(index)} className="bg-red-500 mt-4">
										Remove Variant
									</Button>
								</div>
							))}
						</div>

						{/* add flyer and remove flyer options  */}
						<div>
							<div>
								<label for="image" className="custom-file-upload flex items-center justify-center py-2 px-4 border rounded-md cursor-pointer hover:bg-gray-100">
									<input type="file" id="image" name="image" accept="image/*" multiple className="hidden" onChange={handleInputChange} />
									{formData.image ? <span className="text-sm uppercase font-bold">Add more flyer</span> : <span className="text-sm uppercase font-bold">Add flyer</span>}
								</label>
								{selectedFiles.length === 0 ? (
									""
								) : (
									<>
										<div className="flex mt-2">
											{selectedFiles.map((file, index) => (
												<div key={index} className="mr-2 relative">
													<Image src={URL.createObjectURL(file)} alt={`Preview of ${file.name}`} width={300} height={100} />
													<Button
														type="button"
														className=" w-8 h-8 absolute top-0 left-0 p-1 bg-red-500 hover:bg-red-700 text-white rounded-full focus:outline-none"
														onClick={() => handleRemoveFlyer(index)} // Call handleRemoveFlyer function on click
													>
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
															/>
														</svg>
													</Button>
												</div>
											))}
										</div>
									</>
								)}
							</div>
							<div className="mt-4 relative">
								{formData.flyerURLs &&
									formData.flyerURLs.map((url, index) => (
										<div key={index} className="relative">
											<Image src={url} alt={`Flyer ${index + 1}`} width={300} height={100} />
											<Button
												type="button"
												className="  w-8 h-8 absolute  top-0  p-1 bg-red-500 hover:bg-red-700 text-white rounded-full focus:outline-none"
												onClick={() => handleRemoveFlyer(index)} // Call handleRemoveFlyer function on click
											>
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</Button>
										</div>
									))}
							</div>
						</div>
						{/* add flyer and remove flyer options  */}
						<div className="flex flex-col  ">
							<p className="mb-2">Custom event Domain (No spaces) </p>
							<div className="flex items-center mb-2">
								<label className="text-blue-400 mr-2">www.eventrush.co/</label>
								<Input className="border mr-[10px] w-18" name="interestedInCustomURL" label="Domain name" value={formData.interestedInCustomDomain} onChange={handleInputChange} />
							</div>
						</div>
					</div>
					<div></div>
					<div className="mt-6">
						{loading ? (
							<Button className="w-full bg-blue-600 hover:bg-blue-700" loading={true}>
								Updating........
							</Button>
						) : (
							<Button type="submit" variant="gdient" className="flex items-center bg-blue-800 w-full gap-3">
								PUBLISH
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateEvent;
