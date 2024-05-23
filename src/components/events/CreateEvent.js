"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@material-tailwind/react";
// NEXT-UI
import { Button as NextButton } from "@nextui-org/button";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure
} from "@nextui-org/modal";
import { Input as NextInput } from "@nextui-org/input";
import { Switch, cn } from '@nextui-org/react';

import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setFloorImage, setItems } from '@/redux/reducers/floorSlice';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaPlus } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import {
	RiProfileLine,
	RiMoneyDollarCircleLine,
	RiDeleteBin6Line,
	RiUser6Line,
	RiInkBottleLine
} from 'react-icons/ri';
import UploadImage from "@/components/ui/image";

const cl = console.log.bind(console);


// Component for individual item inputs
const ItemAppendForm = ({ item, index, onDelete, onChange }) => {

	return (
		<div className="flex flex-col gap-[0.5rem] items-center max-w-[55rem] lg:w-full ">
			<NextInput
				label="Name"
				name={`name-${index}`}
				type="text"
				labelPlacement="inside"
				size='sm'
				variant='bordered'
				color='primary'
				startContent={<MdOutlineDriveFileRenameOutline className='text-[1.25rem] text-gray-400 ' />}
				value={item.name}
				className='min-w-[10rem] md:w-full'
				placeholder="Front VIP 1"
				onChange={(e) => onChange(index, "name", e.target.value)}
			// className=''
			/>

			<div className='flex md:flex-row flex-col gap-[0.5rem] w-full mt-[1.5rem] '>
				<NextInput
					label="Alias"
					name={`alias-${index}`}
					type="text"
					labelPlacement="inside"
					size='sm'
					variant='bordered'
					color='primary'
					startContent={<RiProfileLine className='text-[1.25rem] text-gray-400 ' />}
					value={item.alias}
					placeholder="A1"
					onChange={(e) => onChange(index, "alias", e.target.value)}
					className='min-w-[4rem] '
				/>
				<NextInput
					label="Price"
					name={`price-${index}`}
					type="number"
					labelPlacement="inside"
					size='sm'
					variant='bordered'
					color='primary'
					startContent={<RiMoneyDollarCircleLine className='text-[1.25rem] text-gray-400 ' />}
					value={item.price}
					placeholder="0.00"
					onChange={(e) => onChange(index, "price", e.target.value)}
					className='min-w-[4rem] '
				/>
				<NextInput
					label="People"
					name={`people-${index}`}
					type="number"
					labelPlacement="inside"
					size='sm'
					variant='bordered'
					color='primary'
					startContent={<RiUser6Line className='text-[1.25rem] text-gray-400 ' />}
					value={item.people}
					placeholder="3"
					onChange={(e) => onChange(index, "people", e.target.value)}
					className='min-w-[4rem] '
				/>

				{/* :::::::::::::::::::::::::::::::::::::::
				
				!! CHANGE THE "BOTTLES" TO ACCESORIES
				
				:::::::::::::::::::::::::::::::::::::::::: */}
				<NextInput
					label="Includes"
					name={`bottles-${index}`}
					type="number"
					labelPlacement="inside"
					size='sm'
					variant='bordered'
					color='primary'
					startContent={<RiInkBottleLine className='text-[1.25rem] text-gray-400 ' />}
					value={item.bottles}
					placeholder="5"
					onChange={(e) => onChange(index, "bottles", e.target.value)}
					className='min-w-[4rem] '
				/>
			</div>

			{/* BUTTON */}
			<NextButton
				endContent={<RiDeleteBin6Line />}
				color='danger'
				className="flex items-center justify-center sm:justify-self-end min-w-[2.5rem] rounded-[8px] text-white"
				onClick={() => onDelete(index)}
			>
				Delete
			</NextButton>
		</div>
	);
};


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// ::::::::::::::::::::::::::::::::::::: MAIN COMPONENT
const CreateEvent = () => {
	const items = useSelector((state) => state.floorData.items);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	// :::::::::::::::::::::::::::::::::::::::::::: IMAGE SECTION FUNCTION
	const [floorImage, setLocalFloorImage] = useState("");
	const [openCustomSpace, setOpenCustomSpace] = useState(false);


	const [formData, setFormData] = useState({
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
		image: null,
		variants: [], // State to store variants

		// Spaces
		interestedInCustomSpaces: false,
		seatImage: null,
		seats: JSON.stringify(items),
	});


	// :::::::::::::::::::::::::::::::::: IMAGE UPLOAD FUNCTIONS
	const [imageItem, setImageItem] = useState([]);
	const handleFloorImage = (event) => {
		if (file === null) return;
		
		// File upload format
		const newFiles = event.target.files;
		setImageItem([...imageItem, ...newFiles]);
		const filesArray = Array.from(event.target.files);
		setFormData({ ...formData, [event.target.name]: filesArray });
		
		// For displaying the image
		var file = event.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setLocalFloorImage(reader.result);
		};

		reader.onerror = function (error) {
			cl('Change Image error: ', error);
		};
	};


	// Updates the formData.seats with floorItems on change
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			interestedInCustomSpaces: openCustomSpace,
			seats: items,
			// seatImage: [imageItem],
		}));
		cl('FormData: ', formData);
	}, [items, openCustomSpace, imageItem]);

	const { data: session } = useSession();
	const route = useRouter();

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [loading, setLoading] = useState(false);

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

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const formDataToSend = new FormData();

			// Append form data
			Object.keys(formData).forEach((key) => {
				if (key === "variants") {
					formData[key].forEach((variant, index) => {
						Object.entries(variant).forEach(([variantKey, variantValue]) => {
							formDataToSend.append(`variants[${index}][${variantKey}]`, variantValue);
						});
					});
				} else if (key === "image") {
					// Handle multiple files
					formData[key].forEach((file, index) => {
						formDataToSend.append(`image[${index}]`, file);
					});
				} else {
					formDataToSend.append(key, formData[key]);
					cl('Submitted formData: ', formData);
				}
			});

			const response = await axios.post(`/api/create-event?email=${session.user.email}`, formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Event created successfully!");
			// resets the form
			dispatch(setItems([]));
			// dispatch(setFloorImage(""));

			cl('Submitted formData: ', formData);
			// re-routes to another page
			route.push("/organizer");
		} catch (error) {
			console.error("Error submitting event:", error.message);
			if (error.response && error.response.data && error.response.data.error === "Event already exists") {
				toast.error("Event already exists. Please choose a different name  ");
			} else {
				toast.error("An error occurred while submitting the event. Please try again later. with different event name or domain ");
			}
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

	// ::::::::::::::::::::::::::::::::::::::::::  SPACE FUNCTIONS
	const dispatch = useDispatch();

	// :::::::::::::::::::::::::::::::::::::::::::: ADD FUNCTION
	const handleAddItem = () => {
		dispatch(setItems([...items, { name: "", alias: "", price: "", people: "", bottles: "" }]));
	};

	// :::::::::::::::::::::::::::::::::::::::::::: DELETE FUNCTION
	const handleDeleteItem = (index) => {
		dispatch(setItems(items.filter((_, i) => i !== index)));
	};

	// :::::::::::::::::::::::::::::::::::::::::::: ITEM CHANGE FUNCTION
	const handleItemChange = (
		index,
		field,
		value
	) => {
		dispatch(
			setItems(
				items.map((item, i) =>
					i === index ? { ...item, [field]: value } : item
				)
			)
		);
	};

	return (
		<div className="p-10  w-full bg-gray-100 flex justify-center items-center">
			{/* eslint-disable @next/next/no-img-element */}
			<div className="bg-white rounded-md p-8 shadow-lg  w-full">

				<div className="text-center mb-8">
					<Image className="w-full mb-10" src="/image/small-banner.jpeg" alt="banner" width={1000} height={30} />
					<Image className="w-full" src="/image/banner.jpg" alt="banner" width={1000} height={100} />
					<p className="text-gray-500 uppercase font-semibold mt-4 ">Get started now by completing the form.</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">

						<Input
							className="  rounded-lg bg-blue-600" color="blue" label="First Name" type="text" name="firstName" value={formData.firstName}
							onChange={handleInputChange} required
						/>

						<Input
							className=" rounded-lg bg-blue-600" color="blue"
							label="Last Name" type="text" name="lastName" value={formData.lastName}
							onChange={handleInputChange} required
						/>
						<Input
							className=" rounded-lg bg-blue-600" color="blue"
							label="Email" type="email" name="email" value={formData.email}
							onChange={handleInputChange} required
						/>
						<Input
							className=" rounded-lg  " color="blue"
							label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber}
							onChange={handleInputChange} required
						/>
						<Input
							label="Event Venue" type="text" name="eventVenue" value={formData.eventVenue}
							onChange={handleInputChange} required
						/>
						<Input
							className=" rounded-lg  " color="blue"
							label="Event Title" type="text" name="eventTitle" value={formData.eventTitle}
							onChange={handleInputChange} required
						/>
						<div className="grid grid-cols-10 max-sm:col-span-1 col-span-2 w-[100%]">

							<div className="col-span-5 max-sm:col-span-10 max-sm:mb-8 rounded-lg">
								<Input
									className="rounded-lg w-[100%] bg-blue-600"
									color="blue"
									label="Address"
									type="text"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="grid grid-cols-3 max-sm:col-span-10 col-span-5 gap-2 ml-4">
								<input
									className="rounded-lg w-full border border-gray-400 p-2 focus:outline-none"  // Improved styling and focus handling
									placeholder="City"
									type="text"
									name="city"
									value={formData.city}
									onChange={handleInputChange}
									required
								/>
								<input
									className="rounded-lg w-full border border-gray-400 p-2 focus:outline-none"  // Improved styling and focus handling
									placeholder="State"
									type="text"
									name="state"
									value={formData.state}
									onChange={handleInputChange}
									maxLength="2"  // Enforce maximum length for state
									required
								/>
								<input
									className="rounded-lg w-full border border-gray-400 p-2 focus:outline-none"  // Improved styling and focus handling
									placeholder="Zip"
									type="text"
									name="zip"
									value={formData.zip}
									onChange={handleInputChange}
									maxLength="5"  // Enforce maximum length for zip
									required
								/>
							</div>


						</div>



						<Input
							className=" rounded-lg bg-blue-600" color="blue"
							label="Start Date of the Event" type="date" name="date" value={formData.date}
							onChange={handleInputChange} required
						/>
						<Input
							className=" rounded-lg bg-blue-600" color="blue"
							label="End Date of the Event" type="date" name="date" value={formData.date}
							onChange={handleInputChange} required
						/>
						<Input
							className=" rounded-lg bg-blue-600" color="blue"
							label="Event Start Time" type="time" name="startTime" value={formData.startTime}
							onChange={handleInputChange} required
						/>
						<Input
							className=" rounded-lg bg-blue-600" color="blue"
							label="Event End Time" type="time" name="endTime" value={formData.endTime}
							onChange={handleInputChange} required
						/>
						<Input
							className=" rounded-lg bg-blue-600" color="blue"
							label="Ticket starting  Price" type="text" name="ticketPrice" value={formData.ticketPrice}
							onChange={handleInputChange} required
						/>
						<div className=" col-span-2 max-sm:col-span-1 mb-14 h-72 ">
							<ReactQuill theme="snow" className="h-full rounded-lg" value={formData.description}
								onChange={handleDescriptionChange} />

						</div>

						<div className=" col-span-2 max-sm:col-span-1">
							<div className="mb-8">
								{selectedFiles.length === 0 ? (
									""
								) : (
									<>
										<div className="flex mt-2 justify-center items-center">
											{selectedFiles.map((file, index) => (

												<div key={index} className={`${index !== 0 ? " " : ""} mr-2 relative`}>
													<Image width={100} height={100} src={URL.createObjectURL(file)} alt={`Preview of ${file.name}`} className={`${index === 0 ? 'w-28 h-28' : 'w-16 h-16'}    object-cover rounded-md border`} />
													<button
														type="button"
														className="absolute top-0 right-0 p-1 bg-red-500 hover:bg-red-700 text-white rounded-full focus:outline-none"
														onClick={() => handleRemoveFile(index)} // Call handleRemoveFile on click
													>
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
															/>
														</svg>
													</button>
												</div>
											))}
										</div>
									</>
								)}
							</div>
							<label htmlFor="image" className="custom-file-upload flex items-center justify-center py-2 px-4 border rounded-md cursor-pointer hover:bg-gray-100">
								<input type="file" id="image" name="image" accept="image/*" multiple className="hidden" onChange={handleInputChange} required />
								{formData.image ? 
									<span className="text-sm uppercase font-bold">Add more flyer</span> : 
									<span className="text-sm uppercase font-bold">Add flyer</span>
								}
							</label>

						</div>
						<div className="col-span-2 max-sm:col-span-1">
							<div>
								<div className="grid max-sm:col-span-1 col-span-2 gap-2 max-sm:mt-0 mt-[-20px] max-sm:grid-cols-1">
									<p className=" uppercase font-semibold mt-4 text-center">Add Variants</p>
									<Input
										className=" rounded-lg bg-blue-600" color="blue"
										label="Ticket Type" type="text" name="type" value={formData.type}
										onChange={handleInputChange}
									/>
									<Input
										className=" rounded-lg bg-blue-600" color="blue"
										label="Ticket Price" type="text" name="price" value={formData.price}
										onChange={handleInputChange}
									/>
									<Input
										className=" rounded-lg bg-blue-600" color="blue"
										label="Ticket Description" type="text" name="v_description" value={formData.v_description}
										onChange={handleInputChange}
									/>
									<Button onClick={handleAddVariant} className="bg-blue-800">
										Add Variant
									</Button>
								</div>
							</div>
							<div>
								<p className=" uppercase font-semibold mt-4 text-center">Added Variants:</p>
								{formData.variants.map((variant, index) => (
									<div key={index}>
										<p>Type: {variant.type}</p>
										<p>Price: {variant.price}</p>
										<p>Description: {variant.v_description}</p>
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col max-sm:col-span-1 col-span-2 w-full">
							<p className="mb-2">Custom event Domain (No spaces) </p>
							<div className="flex items-center mb-2">
								<label className="text-blue-400 mr-2">www.eventrush.co/</label>
								<Input
									className="border mr-[10px] w-18"
									name="interestedInCustomURL"
									label="Domain name"
									value={formData.interestedInCustomURL}
									onChange={handleInputChange}
									pattern="^[^\s]+$" // Regular expression pattern to disallow spaces
									title="No spaces allowed"
									required // Error message displayed when pattern doesn't match
								/>
							</div>
						</div>


					</div>

					{/* ::::::::::::::::::::::::::::::::::: CREATE CUSTOM SPACE CTA */}
					<div className='flex w-full'>
						<div className="flex flex-col gap-[1rem] mt-[5rem]">

							{/* :::::::::: Toggle set seating arrangement */}
							<Switch
								classNames={{
									base: cn(
										"inline-flex flex-row-reverse w-full max-w-md bg-slate-400/10 hover:bg-content2 items-center",
										"justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
										formData.interestedInCustomSpaces === true && "data-[selected=true]:border-primary",
										formData.interestedInCustomSpaces === true && "border-primary",
									),
									wrapper: "p-0 h-4 overflow-visible",
									thumb: cn("w-6 h-6 border-2 shadow-lg",
										"group-data-[hover=true]:border-primary",
										"group-data-[selected=true]:ml-6",
										"group-data-[pressed=true]:w-7",
										"group-data-[selected]:group-data-[pressed]:ml-4",
									),
								}}
								onChange={() => {
									setOpenCustomSpace(!openCustomSpace)
								}}
							>
								<div className="flex flex-col gap-1">
									<p className="text-medium">Enable reserved seating</p>
									<p className="text-tiny text-default-400">
										Does your venue have reserved seating arrangement?
									</p>
								</div>
							</Switch>
							{formData.interestedInCustomSpaces &&
								<NextButton
									endContent={<FiEdit className='' />}
									onPress={onOpen}
									className='bg-primary text-white rounded-[8px] '
								>
									Edit/Preview Seating arrangement
								</NextButton>
							}
						</div>
					</div>

					{/* :::::::::::::::::: Seating arrangement modal */}
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						size='full'
						scrollBehavior='inside'
						isKeyboardDismissDisabled={true}
						className='p-[0.5rem] w-full h-max lg:w-[80%] rounded-[8px] '
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col text-center gap-1">
										<h2 className='text-[1.25rem] sm:text-[1.5rem] lg:text-[1.875rem] font-semibold text-slate-700 ' >Create your Seating Arrangement</h2>
									</ModalHeader>
									<ModalBody>
										{floorImage && (
											<>
												<div className='relative z-[3] flex justify-center items-center max-w-[55rem] w-full h-[25rem] min-h-[25rem] mx-auto bg-black/20 overflow-hidden '>
													<img
														src={floorImage}
														alt={'floorplan'}
														className='relative z-[2] max-w-[45rem] h-full min-h-[25rem] mx-auto object-contain border-solid border-[2px] border-teal-500 rounded-[8px] shadow-sm '
													/>
													<img
														src={floorImage}
														alt={'floorplan'}
														className='absolute z-1 top-0 left-0 w-full min-w-full h-full min-h-[25rem] mx-auto object-cover backdrop-blur-[5px] blur-[5px]  '
													/>
												</div>
												<NextButton
													endContent={<RiDeleteBin6Line className='' />}
													color="warning"
													onPress={() => setLocalFloorImage("")}
													className='max-w-[55rem] text-white mx-auto '
												>
													Remove Image
												</NextButton>
											</>
										)}

										{/* ::::::::::::::::::::::::::::::::::::: IMAGE UPLOAD */}
										{!floorImage &&
											<UploadImage
												name='seatImage'
												label='Upload floor-plan'
												onChange={handleFloorImage}
											/>
										}
										<div className='flex flex-col gap-[2rem] items-center mx-auto w-full max-h-[50%] '>
											<p className='text-[1.05rem] text-slate-800 mt-[1rem] '>Enter the Spaces Details as Follows </p>
											{items.map((item, index) => (
												<ItemAppendForm
													key={index}
													item={item}
													index={index}
													onDelete={handleDeleteItem}
													onChange={handleItemChange}
												/>
											))}
											<button
												type="button"
												className="flex items-center justify-center gap-[0.5rem] text-[1.25rem] font-semibold text-center h-[2.5rem] max-w-[55rem] w-full mx-auto bg-blue-100 hover:bg-text-800 text-blue-500 hover:text-blue-600 hover:shadow-sm hover:shadow-blue-200/50 rounded-[8px] ease-250"
												onClick={handleAddItem}
											>
												<FaPlus className='text-[0.875rem]' />
												<p className='text-[0.875rem] '>Add Seat</p>
											</button>
										</div>
									</ModalBody>

									<ModalFooter className='h-[5.5rem] '>
										<NextButton color="primary" onPress={onClose}>
											Done
										</NextButton>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>



					<div className="mt-6">
						{loading ? (
							<Button className="w-full bg-blue-600 hover:bg-blue-700" loading={true}>
								Loading
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

export default CreateEvent;





