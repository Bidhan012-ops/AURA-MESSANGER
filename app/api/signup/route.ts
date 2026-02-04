import {dbConnect} from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { sendVarificationEmail } from "@/helper/sendvarificationemail";
import { ApiResponse } from "@/types/Apiresponce";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
    await dbConnect();
    const { username, email, password } = await request.json();
    console.log("The signup data received is ", {username,email,password});
    const varifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const varifyCodeExpire = new Date(Date.now() + 10 * 60 * 1000); 
    try {
        const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] }); 
        let savedUser = existingUser;  
        if (existingUser && existingUser.isVerified) {  
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User with this email or username already exists."
            }, { status: 400 });
        }
        else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const passwordToStore = hashedPassword;
             const newUser = new UserModel({
            username,
            email,
            password: passwordToStore,
            varifyCode,
            varifyCodeExpire,
            isVarified: false
        });
         savedUser = await newUser.save();
        }
        const emailResponse = await sendVarificationEmail(email, username, varifyCode);
        if (!emailResponse.success) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Failed to send verification email."
            }, { status: 500 });
        }
        return NextResponse.json<ApiResponse>({
            success: true,
            message: "User created successfully.",
            data:savedUser
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Internal server error."
        }, { status: 500 });
    }
}
