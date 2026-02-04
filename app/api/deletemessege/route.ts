import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/option";
import { dbConnect } from "@/lib/dbConnect";
import { ApiResponse } from "@/types/Apiresponce";
import UserModel from "@/model/user";

export async function GET(
    request: NextRequest, 
) {
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get("messageId");
    await dbConnect();
    const session = await auth();
    const user = session?.user;
   console.log("The messageid is the ",messageId,user);
    if (!session || !user) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Unauthorized"
        }, { status: 401 });
    }

    try {
        const updatedUser = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messeges: { _id: messageId } } }
        );

        if (updatedUser.modifiedCount === 0) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Message not found or already deleted"
            }, { status: 404 });
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Message deleted successfully"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Error deleting message"
        }, { status: 500 });
    }
}