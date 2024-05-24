import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
	type: {
		type: String,
	},
	price: {
		type: String,
	},
	v_description: {
		type: String,
	},
});

const EventSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
	},
	phoneNumber: {
		type: String,
		required: [true, "Phone Number is required"],
	},
	eventVenue: {
		type: String,
		required: [true, "Event Venue is required"],
	},
	eventTitle: {
		type: String,
		required: [true, "Event Title is required"],
		unique: true,
	},
	addressOfVenue: {
		type: String,
		required: [true, "Address of the Venue is required"],
	},
	dateOfEvent: {
		type: Date,
		required: [true, "Date of the Event is required"],
	},
	startTime: {
		type: String,
		required: [true, "Event Start Time is required"],
	},
	endTime: {
		type: String,
		required: [true, "Event End Time is required"],
	},
	ticketPrice: {
		type: String,
		required: [true, "Ticket Price is required"],
	},
	description: {
		type: String,
		required: [true, "Description of Event is required"],
	},
	interestedInCustomDomain: {
		type: String,
		required: true,
		unique: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	flyerURLs: {
		type: [String], // Array of strings
	},
	variants: [VariantSchema],
	interestedInCustomSpaces: {
		type: Boolean,
		required: true
	},
	seatImage: {
		type: "String"
	}
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
