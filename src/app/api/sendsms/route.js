import { db, storage } from "@/app/firebase";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import QRCode from "qrcode";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import nodemailer from 'nodemailer'
import confirmationEmail from "./confirmationEmail";

export async function GET(request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);
        const q = query(collection(db, 'orders'), orderBy('timeStamp', 'desc'));

        const fetchData = new Promise((resolve, reject) => {
            const tempArr = [];
            onSnapshot(q, doc => {
                tempArr.length = 0;
                doc.forEach(data => {
                    tempArr.push({ ...data.data(), id: data.id });
                });
                resolve(tempArr);
            });
        });

        const data = await fetchData;

        const latestObject = data[0];

        const session = await stripe.checkout.sessions.retrieve(latestObject?.sessionId)

        if (!latestObject?.msgSent) {
            async function generateAndUploadQRCode(metadata, fileName) {
                try {
                    // Generate QR code as data URL
                    const qrData = JSON.stringify(metadata);
                    const qrDataURL = await QRCode.toDataURL(qrData);

                    // Convert data URL to Blob
                    const response = await fetch(qrDataURL);
                    const blob = await response.blob();

                    // Upload Blob to Firebase Storage
                    const storageRef = ref(storage, 'QRcodes/' + fileName);
                    const snapshot = await uploadBytes(storageRef, blob);

                    // Get download URL of the uploaded image
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    console.log('File uploaded successfully. Download URL:', downloadURL);
                    return downloadURL;
                } catch (error) {
                    console.error('Error generating and uploading QR code:', error);
                    throw error;
                }
            }

            if (session.payment_status === "paid") {
                const { username } = session?.metadata
                const { productName } = session?.metadata
                const { quantity } = session?.metadata
                const { subbTotal } = session?.metadata
                const { orderId } = session?.metadata
                const { userEmail } = session?.metadata

                const metadata = {
                    customer: username,
                    productName,
                    quantity,
                    subbTotal,
                    orderId,
                }

                const fileName = metadata.orderId + '.png';
                const qrcode = await generateAndUploadQRCode(metadata, fileName)

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    port: 587,
                    secure: true,
                    auth: {
                        user: "huzaifahabib311@gmail.com",
                        pass: "prho sxke wmpc ijqj",
                    },
                })

                await transporter.sendMail({
                    from: "huzaifahabib311@gmail.com",
                    to: userEmail,
                    subject: "Order Confirmation",
                    html: confirmationEmail(username, productName, quantity, subbTotal, qrcode, orderId),
                })

                await updateDoc(doc(db, "orders", latestObject?.sessionId), {
                    msgSent: true
                })

                return NextResponse.json({ msg: "Message Sent Successfully" })
            }
        } else {
            return NextResponse.json({ msg: "Message already Sent" })
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(error);
    }
}