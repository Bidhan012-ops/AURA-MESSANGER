"use client";
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
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
import Link from 'next/link';

const page = () => {
    const params=useParams<{username:string}>();
    const username=decodeURIComponent(params.username);
    
    const [errormessage, seterrormessage] = React.useState("");
    const [varifying, setvarifying] = React.useState(false);
    const router = useRouter();
    
    const form = useForm({
      resolver: zodResolver(varifySchema),
      defaultValues: {
        varifyCode: "",
      },
    });
    
    const onSubmit = async(data:z.infer<typeof varifySchema>)=>{
      try {
          setvarifying(true);
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
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 32px 32px;
        }
        .glass-panel {
            background: rgba(16, 20, 21, 0.4);
            backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        .input-trough {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
        }
        .input-trough:focus-within {
            border-color: rgba(255, 255, 255, 0.4);
            border-left: 2px solid #4edea3;
        }
        `
      }} />
      <div className="bg-[#050505] text-[#e0e3e5] font-['Plus_Jakarta_Sans'] min-h-screen flex flex-col relative overflow-hidden antialiased">
        
        {/* Back Button */}
        <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-gray-400 hover:text-[#4edea3] transition-colors font-['Plus_Jakarta_Sans'] text-sm font-medium">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back</span>
        </Link>

        {/* Atmospheric Background Washes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0d1c2f] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#004231] rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>

        {/* Main Content Area */}
        <main className="flex-grow flex items-center justify-center p-5 md:p-10 relative z-10 w-full max-w-screen-2xl mx-auto">
          <div className="w-full max-w-md glass-panel rounded-xl p-8 flex flex-col gap-8 relative">
            
            {/* Header */}
            <div className="flex flex-col gap-4 items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#1b1f20] flex items-center justify-center border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-2">
                <span className="material-symbols-outlined text-[#4edea3] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[24px] md:text-[32px] leading-[32px] md:leading-[40px] font-semibold text-white tracking-tight">Verify Your Account</h1>
              <p className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400">Please enter the verification code sent to your email.</p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                
                <FormField
                  control={form.control}
                  name="varifyCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 space-y-0">
                      <FormLabel className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-gray-400 uppercase">Verification Code</FormLabel>
                      <FormControl>
                        <div className="relative input-trough rounded-lg overflow-hidden flex items-center">
                          <input
                            {...field}
                            type="text"
                            maxLength={6}
                            placeholder="000000"
                            className="w-full bg-transparent border-none text-white font-['Plus_Jakarta_Sans'] text-[24px] leading-[32px] font-semibold text-center tracking-[0.5em] focus:ring-0 placeholder:text-gray-500/30 py-4 outline-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                      {errormessage && (
                        <p className="text-sm text-red-500">{errormessage}</p>
                      )}
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={varifying}
                  className="w-full bg-[#4edea3] text-[#050505] font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-bold py-6 rounded-lg hover:bg-[#4edea3]/90 hover:shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group uppercase cursor-pointer"
                >
                  {varifying ? (
                    <Loader2 className="animate-spin w-5 h-5"/>
                  ) : (
                    <>
                      Verify
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Support Link */}
            <div className="mt-2 text-center">
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium text-gray-400">
                Having trouble? <Link href="/contactSupport" className="text-[#4edea3] hover:underline underline-offset-4">Contact Support</Link>
              </p>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
export default page;
