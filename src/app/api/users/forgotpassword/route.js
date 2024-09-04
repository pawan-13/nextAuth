import { NextResponse } from "next/server";
const POST = async(NextRequest)=>{
    try {
        const body = await NextRequest.json();
        const{email} = body;
        if(!email){
            return NextResponse('All field are required', { status: 400 });
        }
    } catch (error) {
        console.log('error',error.message);
        return NextResponse('something is wrong',{status:400});
    }
}