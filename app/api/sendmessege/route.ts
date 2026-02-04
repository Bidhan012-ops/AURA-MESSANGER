import { dbConnect } from "@/lib/dbConnect"
import UserModel from "@/model/user";
import { ApiResponse } from "@/types/Apiresponce";
import { auth } from "../auth/[...nextauth]/option";
import { NextRequest, NextResponse } from "next/server";
import  {Messege} from "@/model/user";
export async function POST(request: NextRequest) {
    try {
        const {username,content}=await request.json();
        await dbConnect();
        const acceptinguser=await UserModel.findOne({username:username,isaccepting:true});
        if(!acceptinguser){
            return NextResponse.json<ApiResponse>({
                success:false,
                message:"User is not accepting messages or does not exist"
            },{status:404});
        }
        const newMessage={content:content,createdAt:new Date()};
        acceptinguser.messeges.push(newMessage as Messege);
        await acceptinguser.save();
        return NextResponse.json<ApiResponse>({
            success:true,
            message:"Message sent successfully"
        });
    } catch (error) {
        return NextResponse.json<ApiResponse>({
            success:false,
            message:"Error sending message"
        },{status:500});
    }
}