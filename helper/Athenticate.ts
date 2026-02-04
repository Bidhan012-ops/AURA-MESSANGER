"use server"
import { signIn } from "@/app/api/auth/[...nextauth]/option";
import { AuthError } from "next-auth";

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const responce=await signIn("credentials", formData);
    console.log("The responce is here",responce);
  } catch (error) {
    if (error instanceof AuthError) {
        console.log("The error is come from the given data",error.message);
      return "Invalid credentials.";
    }
    throw error;
  }
}