import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { success } from "zod";
import { ApiResponse } from "@/types/Apiresponce";
export async function POST(request:NextRequest){
    const {username}= await request.json();
    await dbConnect();
    const user=await UserModel.findOne({username:username});
    if(!user){
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"The user not found",
            isAccepting:false
        },{status:404});
    }
    return NextResponse.json<ApiResponse>({
        success:true,
        message:"The user is found",
        isAccepting:user.isaccepting
    },{status:200})
}