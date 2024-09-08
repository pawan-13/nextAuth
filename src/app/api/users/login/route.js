import userdb from "../../../../models/userSchema";
import Connection from '@/db/connection.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

Connection();
export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse('All field are required', { status: 400 });
        }

        const userCheck = await userdb.findOne({email});
        if (!userCheck) {
            return NextResponse('email does not match', { status: 400 });
        }

        const isMatch = await bcryptjs.compare('password',userCheck.password);
        if (!isMatch) {
            return NextResponse('password does not match', { status: 400 });
        }

        const tokenData = {
            email: userCheck.email,
            id: userCheck._id,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });
        const response = NextResponse.json({ message: 'Login successful', token });
        response.cookies.set("userCookie", token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true,
        });
        return response;

    } catch (error) {
        console.log('error', error.message);
        return NextResponse('something is wrong', { status: 400 });
    }
}