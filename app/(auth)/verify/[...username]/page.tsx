"use client";
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage,Form } from '@/components/ui/form';
import { varifySchema } from '@/schema/varifySchema';
import { ApiResponse } from '@/types/Apiresponce';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "sonner"
import * as z from "zod";
const page = () => {
    const params=useParams<{username:string}>();
    const username=decodeURIComponent(params.username);
    console.log("The username in verify page is kk",username);
    const [errormessage, seterrormessage] = React.useState("");
    const [varifying, setvarifying] = React.useState(false);
    const router = useRouter();
      const form = useForm({
        resolver: zodResolver(varifySchema),
        defaultValues: {
          varifyCode: "",
        },
      });
     const  onSubmit= async(data:z.infer<typeof varifySchema>)=>{
        try {
            setvarifying(true);
            console.log("The params object in verify page is ",params);
            const responce=await axios.post('/api/varifycode',{
                username:username,
                varifyCode:data.varifyCode
            })
            if(responce.data.success){
                toast.success(responce.data.message);
                router.replace('/signin');
            }
        } catch (error) {
            const err=error as AxiosError<ApiResponse>;
            seterrormessage(err.response?.data?.message || "Verification failed");
            toast.error(errormessage);
        }
        finally{
            setvarifying(false);
        }
      }
  return (
    <div className="flex justify-center items-center min-h-screen  bg-red-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Please enter the verification code sent to your email.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="varifyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your verification code"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                  {errormessage && (
                    <p className="text-sm text-red-500">{errormessage}</p>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit" disabled={varifying}>
              {varifying ? (<Loader2 className="animate-spin"/>) : "Verify"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page
