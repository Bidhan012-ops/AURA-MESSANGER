"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/schema/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/Apiresponce";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const page = () => {
  const [username, setusername] = React.useState("");
  const [usernamemessage, setusernamemessage] = React.useState("");
  const [ischecking, setischecking] = React.useState(false);
  const [issubmitting, setissubmitting] = React.useState(false);
  const [showPassword, setshowPassword] = React.useState(false);
  const debounced = useDebounceCallback(setusername, 300);
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
        toast.error(response.data.message, { position: "top-center" });
        return;
      }
      toast.success("Signup successful", { position: "top-center" });
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.error("Signup error: ", error);
      toast.error("Error signing up", { position: "top-center" });
    } finally {
      setissubmitting(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        body {
            background-color: #050505;
            color: #e0e3e5;
            font-family: 'Plus Jakarta Sans', sans-serif;
            overflow-x: hidden;
        }

        .glass-panel {
            background-color: rgba(16, 20, 21, 0.4);
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-input {
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        .glass-input:focus-within {
            background-color: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.4);
            border-left: 2px solid #4edea3;
        }
        
        .emerald-glow {
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        
        .btn-emerald {
            background-color: #4edea3;
            color: #002113;
            transition: all 0.3s ease;
        }
        
        .btn-emerald:hover {
            box-shadow: 0 0 15px rgba(78, 222, 163, 0.4);
            transform: translateY(-1px);
        }

        .tech-bg {
            background-image: url('https://lh3.googleusercontent.com/aida/AP1WRLupwhd6nsbKIKfPeQ1gPS9VGBkRRdxUUeubg32MhpGMNz4_0HyXgJQUTKn-9BqWApEjMPXBWYD_CfFSIRMlQ_qIzUjTDFDifX-1ZzepUfm3qDrDu-UsbVimunR_wMzzmky6cGouOIrb2WtP-E4SunLmTlPTnOiidijC5sD73SNb8TGnIrpCdum9dwM06wfKk8GANTJjdejUuGA-u4x8apKu6rgbsu_CGhp8J_99AeP7SLKHY5OhrbgRwj4');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -2;
        }
        
        .tech-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle at center, transparent 0%, #050505 100%);
            z-index: -1;
            pointer-events: none;
        }
        
        .scanlines {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 0) 50%,
                rgba(0, 0, 0, 0.1) 50%,
                rgba(0, 0, 0, 0.1)
            );
            background-size: 100% 4px;
            z-index: -1;
            pointer-events: none;
            opacity: 0.3;
        }
        `
      }} />
      <div className="bg-background text-[#e0e3e5] antialiased min-h-screen flex items-center justify-center font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px]">
        {/* Background Images */}
        <div className="tech-bg"></div>
        <div className="tech-overlay"></div>
        <div className="scanlines"></div>

        {/* Main Container */}
        <div className="w-full max-w-[440px] px-5 md:px-0 z-10 mt-8">

          {/* Brand Header */}
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-[48px] text-[#4edea3] mb-2" style={{ fontVariationSettings: "'FILL' 1", filter: "drop-shadow(0 0 10px rgba(78,222,163,0.3))" }}>
              shield_lock
            </span>
            <h1 className="font-['Plus_Jakarta_Sans'] text-[24px] md:text-[32px] leading-[32px] md:leading-[40px] font-semibold tracking-[-0.01em] text-white">
              Create Secure Access
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400 mt-2">
              Aura Messenger Identity Initialization
            </p>
          </div>

          {/* Glass Form Container */}
          <div className="glass-panel rounded-xl p-8 emerald-glow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4edea3]/50 to-transparent"></div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel className="block font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium text-gray-400 uppercase tracking-widest">
                          Username
                        </FormLabel>
                        {ischecking && <Loader2 className="w-4 h-4 animate-spin text-[#4edea3]" />}
                      </div>
                      <FormControl>
                        <div className="glass-input rounded flex items-center h-12 px-4 group">
                          <span className="material-symbols-outlined text-gray-500 group-focus-within:text-[#4edea3] text-[20px] mr-2 transition-colors">
                            person
                          </span>
                          <input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              debounced(e.target.value);
                            }}
                            type="text"
                            placeholder="Enter your identity"
                            className="w-full bg-transparent border-none text-white focus:ring-0 focus:outline-none font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal placeholder:text-gray-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {usernamemessage && (
                        <p className={`text-sm mt-1 font-['Plus_Jakarta_Sans'] ${usernamemessage.includes("available") ? "text-[#4edea3]" : "text-red-500"}`}>
                          {usernamemessage}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className="block font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium text-gray-400 uppercase tracking-widest mb-2 mt-4">
                        Secure Email
                      </FormLabel>
                      <FormControl>
                        <div className="glass-input rounded flex items-center h-12 px-4 group">
                          <span className="material-symbols-outlined text-gray-500 group-focus-within:text-[#4edea3] text-[20px] mr-2 transition-colors">
                            mail
                          </span>
                          <input
                            {...field}
                            type="email"
                            placeholder="communications@domain.com"
                            className="w-full bg-transparent border-none text-white focus:ring-0 focus:outline-none font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal placeholder:text-gray-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Passphrase Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className="block font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium text-gray-400 uppercase tracking-widest mb-2 mt-4">
                        Passphrase
                      </FormLabel>
                      <FormControl>
                        <div className="glass-input rounded flex items-center h-12 px-4 group">
                          <span className="material-symbols-outlined text-gray-500 group-focus-within:text-[#4edea3] text-[20px] mr-2 transition-colors">
                            key
                          </span>
                          <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            className="w-full bg-transparent border-none text-white focus:ring-0 focus:outline-none font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal placeholder:text-gray-500 font-mono tracking-widest"
                          />
                          <button
                            type="button"
                            onClick={() => setshowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                            className="ml-2 text-gray-500 hover:text-white focus:outline-none transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={issubmitting}
                    className="btn-emerald w-full rounded h-12 font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold flex items-center justify-center relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {issubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          Initialize Access
                          <span className="material-symbols-outlined ml-2 text-[18px]">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </Form>

            {/* Secondary Action */}
            <div className="mt-4 text-center">
              <p className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400">
                Identity already established?{" "}
                <Link href="/signin" className="text-[#4edea3] hover:text-[#78f1bc] transition-colors border-b border-[#4edea3]/30 hover:border-[#4edea3] pb-[1px]">
                  Signin
                </Link>
              </p>
            </div>

            {/* Technical Status Footer */}
            <div className="mt-8 pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full mr-2 shadow-[0_0_5px_#4edea3]"></span>
                Node Active
              </span>
              <span>E2E Encrypted</span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default page;
