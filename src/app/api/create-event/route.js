import connect from "@/db/connect";
import Event from "@/models/EventModel";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";
import HandleFile from "@/utils/HandleFile";

export async function POST(req) {
	connect();
	try {
		const id = await req.nextUrl.searchParams.get("email");

		const data = await req.formData();
		const { firstName, lastName, email, phoneNumber, eventVenue, eventTitle, address, date, startTime, endTime, ticketPrice, description, interestedInCustomURL, interestedInCustomSpaces, seats } =
			Object.fromEntries(data);

		console.log(data);
		const isUser = await User.findOne({ email: id });
		const event = await Event.find({
			$or: [
				{ eventTitle: eventTitle }, // Check if eventTitle matches
				{ interestedInCustomDomain: interestedInCustomURL }, // Check if interestedInCustomURL matches
			],
		});

		if (event.interestedInCustomDomain === interestedInCustomURL) {
			return NextResponse.json({ error: "Domain name  already exists" }, { status: 400 });
		}
		if (event.eventTitle === eventTitle) {
			return NextResponse.json({ error: "Event already exists" }, { status: 400 });
		}
		if (!isUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		if (
			!firstName ||
			!lastName ||
			!email ||
			!phoneNumber ||
			!eventVenue ||
			!eventTitle ||
			!address ||
			!date ||
			!startTime ||
			!endTime ||
			!ticketPrice ||
			!description ||
			!interestedInCustomURL
		) {
			return NextResponse.json({ error: "all the filed required" }, { status: 400 });
		}
		const variants = [];
		for (const [key, value] of data.entries()) {
			if (key.startsWith("variants")) {
				const [, index, variantKey] = key.match(/variants\[(\d+)\]\[(\w+)\]/);
				const variantIndex = parseInt(index);
				const currentVariant = variants[variantIndex] || {};
				currentVariant[variantKey] = value;
				variants[variantIndex] = currentVariant;
			}
		}

		const imagePaths = [];
		for (const [key, value] of data.entries()) {
			if (key.startsWith("image")) {
				const path = await HandleFile(value);
				imagePaths.push(path.url);
			}
		}



		const seatImage = data.find(item => item.name === 'seatImage');
		const path = await HandleFile(seatImage)
		console.log("adsads", path);
		const saveData = new Event({
			firstName,
			lastName,
			email,
			phoneNumber,
			eventVenue,
			eventTitle,
			addressOfVenue: address,
			dateOfEvent: date,
			startTime,
			endTime,
			ticketPrice,
			description,
			interestedInCustomDomain: interestedInCustomURL,
			flyerURLs: imagePaths,
			user: isUser._id,
			variants: variants,
			interestedInCustomSpaces: interestedInCustomSpaces
		});
		const user = await saveData.save();

		return NextResponse.json({ success: true, message: user });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function GET(req) {
	try {
		connect(); // Assuming this connects to the database

		const id = req.nextUrl.searchParams.get("id");
		const interestedInCustomDomain = req.nextUrl.searchParams.get("event_name");
		const eventID = req.nextUrl.searchParams.get("eventID");

		if (eventID) {
			const event = await Event.findById(eventID);

			if (!event) {
				return NextResponse.json({ error: "Event not found" }, { status: 404 });
			}

			return NextResponse.json({ success: true, data: event }, { status: 200 });
		}

		if (interestedInCustomDomain) {
			const data = await Event.find({ interestedInCustomDomain });

			if (data.length === 0) {
				return NextResponse.json({ error: "Event not found" }, { status: 404 });
			}

			return NextResponse.json({ success: true, data: data }, { status: 200 });
		}

		if (!id) {
			const events = await Event.find();
			return NextResponse.json({ success: true, data: events }, { status: 200 });
		}

		const userEvents = await Event.find({ user: id });

		if (userEvents.length === 0) {
			return NextResponse.json({ error: "User events not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, data: userEvents }, { status: 200 });
	} catch (error) {
		console.error(error); // Log the error for debugging
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(req) {
	connect();
	try {
		const id = await req.nextUrl.searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "event id not found " }, { status: 404 });
		}

		const event = await Event.findByIdAndDelete(id);

		if (!event) {
			return NextResponse.json({ error: "event not found " }, { status: 404 });
		}

		return NextResponse.json({ success: true, event }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(req) {
	connect();
	try {
		const EventID = req.nextUrl.searchParams.get("eventID");

		const formData = await req.formData();

		const data = {};
		for (const [key, value] of formData.entries()) {
			data[key] = value;
		}

		const variants = [];
		Object.keys(data).forEach((key) => {
			if (key.startsWith("variants")) {
				const [, index, variantKey] = key.match(/variants\[(\d+)\]\[(\w+)\]/);
				const variantIndex = parseInt(index);
				const currentVariant = variants[variantIndex] || {};
				currentVariant[variantKey] = data[key];
				variants[variantIndex] = currentVariant;
			}
		});

		const existingEvent = await Event.findById(EventID);
		if (!existingEvent) {
			return NextResponse.json({ error: "Event not found" }, { status: 404 });
		}

		let updatedFlyerURLs = data.flyerURLs.split(",");

		for (const [key, value] of Object.entries(data)) {
			if (key.startsWith("image")) {
				const path = await HandleFile(value);
				updatedFlyerURLs.push(path.url);
			}
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			EventID,
			{
				...data,
				flyerURLs: updatedFlyerURLs,
				variants: variants,
			},
			{ new: true }
		);

		return NextResponse.json({ success: true, message: updatedEvent });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
