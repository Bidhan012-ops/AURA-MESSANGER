import { dbConnect } from "@/lib/dbConnect";

import UserModel from "@/model/user";
import { ApiResponse } from "@/types/Apiresponce";
import { auth } from "../auth/[...nextauth]/option";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
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
    const foundUser = await UserModel.findById(user._id);
    if(!foundUser){
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"User not found"
        },{status:404});
    }
    const result= await UserModel.aggregate([
        { $match: { _id: foundUser._id } },
        { $unwind: "$messeges" },
        { $sort: { "messeges.createdAt": -1 } },
        { $group: {
            _id: "$_id",
            messeges: { $push: "$messeges" }
        }}
    ]);
    const messeges =result.length >0 ? result[0].messeges : [];
    return NextResponse.json<ApiResponse>({
        success:true,
        message:"Messeges retrieved successfully",
        Messeges:messeges
    });
}