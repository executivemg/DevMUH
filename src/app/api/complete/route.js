import connect from "@/db/connect";
import Order from "@/models/CompleteorderModel";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	connect();
	try {
		const reqBody = await req.json();
		const { customer, items, totalPrice, status, payment_status } = reqBody;

		const isCustomer = await User.findById(customer);

		if (!isCustomer) {
			return NextResponse.json({ error: "user not found" }, { status: 404 });
		}

		const order = new Order({
			customer: customer,
			items: items,
			totalPrice: totalPrice,
			status: status,
			payment_status: payment_status,
		});
		const SaveOrder = await order.save();

		return NextResponse.json({ success: true, order_details: SaveOrder }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
