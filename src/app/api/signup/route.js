import connect from '@/db/connect';
import User from '@/models/UserModel';
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export async function POST(req) {
    connect()
    try {
        const reqBody = await req.json()
        const { name, email, password, phone } = reqBody

        const isUser = await User.findOne({ email })

        if (isUser) {
            return NextResponse.json({ success: false, message: "Email address already in use!" }, { status: 409 })
        }


        if (!name || !email || !password || !phone) {
            return NextResponse.json({ error: "all fields required" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const saveData = new User({
            name,
            email,
            password: hashPassword,
            phone
        })
        const saveuser = await saveData.save()
        return NextResponse.json({ success: true, message: "signup successfully!", saveuser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}