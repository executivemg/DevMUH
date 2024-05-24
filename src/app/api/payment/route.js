/* import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
        let data = await request.json();
        let quantity = data.quantity
        let productName = data.productName
        let unitAmount = data.unitAmount

        const product = await stripe.products.create({
            name: productName,
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: unitAmount,
            currency: "usd",
        });

        const session = await stripe.checkout.sessions.create({

            line_items: [
                {
                    price: price.id,
                    quantity: quantity
                }
            ],
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
            // success_url: 'https://brilliant-rabanadas-72b100.netlify.app/',
            // cancel_url: 'https://brilliant-rabanadas-72b100.netlify.app/',
            
        })

        return NextResponse.json(session.url)
    } catch (error) {
        return NextResponse.json(error)
    }
} */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { doc, setDoc } from 'firebase/firestore'
import { db } from "@/app/firebase";

export async function POST(request) {
    try {

        function generateOrderId(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let orderId = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                orderId += characters.charAt(randomIndex);
            }
            return orderId;
        }
        // Use test mode keys
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);

        let data = await request.json();
        let quantity = data.quantity
        let productName = data.productName
        let unitAmount = data.unitAmount
        let userEmail = data.userEmail
        let username = data.username

        const product = await stripe.products.create({
            name: productName,
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: unitAmount,
            currency: "usd",
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: quantity
                }
            ],
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
            metadata: {
                productName,
                quantity,
                subbTotal: (unitAmount / 100),
                orderId: generateOrderId(12),
                userEmail,
                username
            }
        });

        // Pass public key along with the session URL
        const obj = {
            sessionId: session?.id,
            msgSent: false,
            timeStamp: new Date(),
        }

        await setDoc(doc(db, "orders", session?.id), obj)
        return NextResponse.json({ url: session.url, publicKey: process.env.STRIPE_TEST_PUBLIC_KEY, sesionId: session.id });
    } catch (error) {
        return NextResponse.json(error);
    }
}