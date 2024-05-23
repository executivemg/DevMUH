const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
	product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
	customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
	items: [orderItemSchema],
	totalPrice: { type: Number, required: true },
	status: { type: String, enum: ["Pending", "Delivered", "Cancelled"], default: "Pending" },
	payment_status: { type: String, enum: ["paid", "unpaid", "Cancelled"], default: "unpaid" },
	createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
