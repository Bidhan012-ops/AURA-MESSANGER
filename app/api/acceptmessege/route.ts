import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { ApiResponse } from "@/types/Apiresponce";
import { auth } from "../auth/[...nextauth]/option";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";
export async function POST(request: NextRequest) {
    const {acceptmesseges} = await request.json();
    await dbConnect();
    const session=await auth();
    const user=session?.user;
    if(!user || !session){
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"Unauthorized"
        },{status:401});
    }
    if(!user){
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"User not found in session"
        },{status:404});
    }
    const updatedUser = await UserModel.findByIdAndUpdate(user._id,{
        isaccepting:acceptmesseges}
    ,{new:true});
    if(!updatedUser){
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"User not found"
        },{status:404});
    }
    return NextResponse.json<ApiResponse>({
        success:true,
        message:"User status updated successfully"
    });
}
export async function GET(request:NextRequest){
     await dbConnect();
    const session=await auth();
    const user=session?.user;
    if(!user || !session){
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"Unauthorized"
        },{status:401});
    }
    if(!user){
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"User not found in session"
        },{status:404});
    }
    const databaseuser=await UserModel.findOne({email:user.email});
    if(databaseuser){
         return NextResponse.json<ApiResponse>({
            success:true,
            message:"User found",
            isAccepting:databaseuser.isaccepting
        },{status:200});
    }
    else{
         return NextResponse.json<ApiResponse>({
            success:false,
            message:"User not found in database"
        },{status:404});
    }
}