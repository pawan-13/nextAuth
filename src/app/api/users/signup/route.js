import userdb from "../../../../models/userSchema";
import Connection from '@/db/connection.js';
import bcryptjs from 'bcryptjs';
import { NextResponse } from "next/server";

Connection();
export const POST = async(NextRequest)=>{
    try {
        const body = await NextRequest.json();
        const{username,email,password} = body;

        if(!username || !email || !password){
            return NextResponse('All field are required',{status:400});
        }

        const userCheck = await userdb.findOne({email});
        if(userCheck){
            return NextResponse('email already exit', {status:400});
        }

        const salt = await bcryptjs.genSalt(12);
        const hashPassword = await bcryptjs.hash('password',salt);
        const newUser = new userdb({
            username,
            email,
            password:hashPassword,
        });
        await newUser.save();
        return NextResponse('user save successfully',{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse('something is wrong',{status:400});
    }
}