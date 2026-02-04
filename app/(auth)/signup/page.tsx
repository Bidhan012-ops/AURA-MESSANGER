"use client";
import React, { use, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/dist/client/components/navigation";
import { signupSchema } from "@/schema/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/Apiresponce";
import { set } from "mongoose";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
const page = () => {
  const [username, setusername] = React.useState("");
  const [usernamemessage, setusernamemessage] = React.useState("");
  const [ischecking, setischecking] = React.useState(false);
  const [issubmitting, setissubmitting] = React.useState(false);
  const [showPassword, setshowPassword] = React.useState(false);
  const debounced= useDebounceCallback(setusername, 300);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkusernameuniqueness = async () => {
      if (username) {
        setischecking(true);
        setusernamemessage("");
        try {
          const response = await axios.get(
            `/api/checkunique?username=${username}`,
          );
          console.log("The axios response object is ", response);
          setusernamemessage(response.data.message);
        } catch (error) {
          const err = error as AxiosError<ApiResponse>;
          setusernamemessage(
            err.response?.data?.message ?? "Error checking username uniqueness",
          );
        } finally {
          setischecking(false);
        }
      }
    };
    checkusernameuniqueness();
  }, [username]);
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setissubmitting(true);
    try {
      const response = await axios.post("/api/signup", data);
      console.log("Signup response: ", response);
      if (!response.data.success) {
        toast.error(response.data.message,{position:"top-center"});
        return;
      }
      toast.success("Signup successful",{position:"top-center"});
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.error("Signup error: ", error);
      toast.error("Error signing up",{position:"top-center"});
    } finally {
      setissubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen  bg-red-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Aura Messenger
          </h1>
          <p className="mb-4">Sign up to start sending anonymous messages!</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                  {ischecking && <Loader2 className="animate-spin" />}
                  {usernamemessage && (
                    <p className={`text-sm ${usernamemessage.includes("available") ? "text-green-500" : "text-red-500"}`}>
                      {usernamemessage}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type={showPassword?"text":"password"}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                   {
                    showPassword ? (<Eye className="absolute right-3 top-9 cursor-pointer" onClick={() => setshowPassword(!showPassword)}/>) : (
                    <EyeOff className="absolute right-3 top-9 cursor-pointer" onClick={() => setshowPassword(!showPassword)}/>
                    )
                  }
                </FormItem>
              )}
            />
            <Button type="submit" disabled={issubmitting}>
              {issubmitting ? (<Loader2 className="animate-spin"/>) : "Sign up"}
            </Button>
          </form>
        </Form>
         allready have an account?{" "}
      <Link href="/signin" className="text-blue-500 hover:underline">
        Log in
      </Link>
      </div>
    </div>
  );
};
export default page;
