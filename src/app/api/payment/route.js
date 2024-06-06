import axios from "../../../axios";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    try {
        let data = await request.json();
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);
        let { cartItems, email, phone, token } = data
        console.log(token);

        const objToSend = {
            event_id: cartItems?.map(item => item.id),
            status: 0,
            qty: cartItems?.map(item => item.quantity),
            email,
            phone
        }

        const res = await axios.post("/store/order", objToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        console.log(res?.data);

        const { id } = res?.data?.data

        const lineItems = await Promise.all(cartItems.map(async (item) => {
            const product = await stripe.products.create({
                name: item.name,
            });

            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: Math.round(item.price * 100),
                currency: "usd",
            });

            return {
                price: price.id,
                quantity: item.quantity,
            };
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `http://localhost:3000/success/${id}`,
            cancel_url: `http://localhost:3000/cancel/${id}`,
        });

        return NextResponse.json({ url: session.url, publicKey: process.env.STRIPE_TEST_PUBLIC_KEY, sessionId: session.id });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}