"use client";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { loginSchema } from "@/schema/loginSchema";
import { signIn } from "next-auth/react";
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
import { Loader2 } from "lucide-react";

const LoginPage = () => {
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
    setischecking(true);
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    console.log("The response object is:", response);
    setischecking(false);
    if (!response?.error) {
      toast.success("Signin successful", { position: "top-center" });
      router.replace('/dashboard');
    } else {
      toast.error("Signin failed. Check your credentials.", { position: "top-center" });
    }
  }

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
            background: rgba(16, 20, 21, 0.4);
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(16, 185, 129, 0.2);
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .glass-input {
            background: rgba(36, 42, 44, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }

        .glass-input:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.4);
            border-left: 2px solid #4edea3;
            background: rgba(36, 42, 44, 0.5);
        }

        .btn-primary {
            background-color: #4edea3;
            color: #002113;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            box-shadow: 0 0 15px rgba(78, 222, 163, 0.4);
            transform: translateY(-1px);
        }

        .btn-secondary {
            background: rgba(16, 20, 21, 0.4);
            border: 1px solid rgba(78, 222, 163, 0.3);
            color: #4edea3;
            transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
            background: rgba(78, 222, 163, 0.1);
            border-color: rgba(78, 222, 163, 0.6);
        }

        .bg-technical {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            background-image: url('https://lh3.googleusercontent.com/aida/AP1WRLupwhd6nsbKIKfPeQ1gPS9VGBkRRdxUUeubg32MhpGMNz4_0HyXgJQUTKn-9BqWApEjMPXBWYD_CfFSIRMlQ_qIzUjTDFDifX-1ZzepUfm3qDrDu-UsbVimunR_wMzzmky6cGouOIrb2WtP-E4SunLmTlPTnOiidijC5sD73SNb8TGnIrpCdum9dwM06wfKk8GANTJjdejUuGA-u4x8apKu6rgbsu_CGhp8J_99AeP7SLKHY5OhrbgRwj4');
            background-size: cover;
            background-position: center;
            opacity: 0.6;
        }
        `
      }} />
      <div className="min-h-screen flex flex-col antialiased relative">
        <div className="bg-technical"></div>
        
        <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-gray-400 hover:text-[#4edea3] transition-colors font-['Plus_Jakarta_Sans'] text-sm font-medium">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back</span>
        </Link>

        <main className="flex-grow flex items-center justify-center p-5 md:p-10 relative z-10">
          <div className="glass-panel w-full max-w-[480px] rounded-xl p-8 md:p-10 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-50"></div>

            <div className="flex flex-col gap-2 items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-[#2b2d31] flex items-center justify-center border border-white/10 mb-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="material-symbols-outlined text-[#4edea3]" style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}>lock</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#e0e3e5]">Aura Messenger</h1>
              <p className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400">Secure access protocol</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 space-y-0">
                      <div className="flex justify-between w-full">
                        <FormLabel className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#e0e3e5]">Identifier</FormLabel>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none">person</span>
                          <input
                            {...field}
                            type="email"
                            placeholder="Enter your username or email"
                            className="glass-input w-full h-12 pl-10 pr-4 rounded-lg font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-white placeholder:text-gray-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 space-y-0">
                      <div className="flex justify-between w-full">
                        <FormLabel className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#e0e3e5]">Passphrase</FormLabel>
                        <Link href="#" className="text-[#4edea3] hover:text-[#78f1bc] transition-colors font-['Plus_Jakarta_Sans'] text-[14px]">Recover</Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none">key</span>
                          <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            className="glass-input w-full h-12 pl-10 pr-10 rounded-lg font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-white placeholder:text-gray-500 tracking-widest"
                          />
                          <button
                            type="button"
                            onClick={() => setshowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined select-none">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4 mt-2">
                  <button type="submit" disabled={ischecking} className="btn-primary w-full h-12 rounded-lg font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold flex items-center justify-center gap-2">
                    {ischecking ? <Loader2 className="animate-spin" /> : (
                      <>Authenticate <span className="material-symbols-outlined text-[18px]">arrow_forward</span></>
                    )}
                  </button>
                </div>
              </form>
            </Form>

            <div className="text-center mt-2">
              <p className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400">
                New to Aura? <Link href="/signup" className="text-[#4edea3] hover:text-[#78f1bc] transition-colors font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Signup</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginPage;