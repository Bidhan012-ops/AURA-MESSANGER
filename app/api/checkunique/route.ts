import {z} from 'zod';
import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/model/user';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/Apiresponce';
import { UsernameSchema } from '@/schema/signupSchema';
const usernametestschema = z.object({
    username: UsernameSchema
})
export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        const {searchParams} = new URL(request.url);
    const username= searchParams.get('username');
    console.log("The username to check is ", username);
    const existingvarifieduser = await UserModel.findOne({ username: username, isVerified: true });
    if (existingvarifieduser) {
        return NextResponse.json({
            success: false,
            message: "Username is already taken.",
        }, { status: 200 });
    } else {
        return NextResponse.json({
            success: true,
            message: "Username is available.",
        }, { status: 200 });
    }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message:"Internal server error",
        }, { status: 400 })
    }
}