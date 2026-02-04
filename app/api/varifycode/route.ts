import { NextResponse,NextRequest } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { ApiResponse } from "@/types/Apiresponce";
import { check } from "zod";
export async function POST(request: NextRequest) {
    await dbConnect();
    const { username, varifyCode } = await request.json();
    try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found."
            }, { status: 404 });
        }
        if (user.isVerified) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User is already verified."
            }, { status: 400 });
      
        }
        const checkvarifycode=varifyCode===user.varifyCode;
        const isCodeExpired = user.varifyCodeExpire > new Date();
        if(checkvarifycode && isCodeExpired){
            user.isVerified=true;
            await user.save();
            return NextResponse.json<ApiResponse>({
                success: true,
                message: "User verified successfully."
            }, { status: 200 });
        } else {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Invalid or expired verification code."
            }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Internal server error."
        }, { status: 500 });
    }
}