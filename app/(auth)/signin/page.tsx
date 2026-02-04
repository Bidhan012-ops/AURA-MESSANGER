"use client"; // 1. Changed from "use server"
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { loginSchema } from "@/schema/loginSchema";
// 2. Import from the client-side library
import { signIn } from "next-auth/react"; 
// 3. Correct import for App Router
import { useRouter } from "next/navigation"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { set } from "mongoose";
import { Loader2 } from "lucide-react";

const LoginPage = () => { // 4. Capitalized Component Name
  const router = useRouter();
  const [ischecking, setischecking] = React.useState(false);
  const [showPassword, setshowPassword] = React.useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // 5. Added await to the signIn call
    setischecking(true);
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    console.log("The response object is:", response);
    setischecking(false);
    if (!response?.error) {
      toast.success("Signin successful",{position:"top-center"});
      router.replace('/dashboard');
    } else {
      toast.error("Signin failed. Check your credentials.",{position:"top-center"});
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-6 text-center">
            login to Aura Messenger
          </h1>
          <p className="mb-4">Sign in to start sending messages!</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <Button type="submit" className="w-full cursor-pointer" disabled={ischecking}>
              {ischecking ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="text-center">
          Create new account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;