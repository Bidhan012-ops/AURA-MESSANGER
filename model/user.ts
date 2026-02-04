import mongoose from "mongoose";
import { Schema,Document } from "mongoose";
export interface Messege extends Document {
    content: string;
    createdAt: Date;
}
const MessegeSchema: Schema<Messege> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const MessegeModel =   mongoose.models.Messege ||
  mongoose.model<Messege>("Messege", MessegeSchema);
 export interface User extends Document {
    username: string;
    email: string;
    password: string;
    varifyCode: string;
    varifyCodeExpire: Date;
    isVerified: boolean;
    isaccepting: boolean;
    messeges: Messege[];
}
const userSchema: Schema<User> = new Schema({
    username: { type: String, required: [true, "Username is required"], unique: true },
    email: { type: String, required: [true, "Email is required"], unique: true },          
    password: { type: String, required: [true, "Password is required"] },
    varifyCode: { type: String, required: [true, "Verify code is required"] },
    varifyCodeExpire: { type: Date, required: [true, "Verify code expiration date is required"] },
    isVerified: { type: Boolean, default: false },
    isaccepting: { type: Boolean, default: true },
    messeges:[MessegeSchema]
});
const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);
export default UserModel;