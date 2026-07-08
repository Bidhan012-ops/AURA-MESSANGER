"use client";
import {
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schema/MessageSchema";
import * as z from "zod";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import Messege from "@/components/Messege";
import { Loader2 } from "lucide-react";
import Skiliton from "@/components/Skiliton";
import { demoMessages } from "@/helper/suggestmessages";
import Link from "next/link";

const Page = () => {
    const param=useParams<{username:string}>();
    const username=decodeURIComponent(param.username);
    
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });
  
  const [isloading,setIsloading]=useState(false);
  const [messages,setmesseges]=useState(demoMessages);
  const [issuggesting,setIssuggesting]=useState(false);
  
  const onSubmit = async(data: z.infer<typeof messageSchema>) => {
    setIsloading(true);
    try {
        const responce=await axios.post(`/api/isacceptingmessage`,{username:username});
        if(!responce.data.isAccepting){
         toast.error('The user can not receive the message');
         return;  
        }
        const res=await axios.post(`/api/sendmessege`,{
            username:username,
            content:data.message
        })
        if(res.data.success){
            toast.success('The messege send successfully');
            form.setValue("message", "", { shouldValidate: false });
        }
    } catch (error) {
        const err=error as AxiosError;
        toast.error('Failed to send message');
    } finally {
        setIsloading(false);
    }
  };

  const handlesuggest=async ()=>{
    setIssuggesting(true);
    try{
        const responce=await axios.get(`/api/suggestMesseges`);
        if(responce.data.success){
            setmesseges(responce.data.text.split('||'));
        }
    }
    catch{
      toast.error('can not suggest messages');
    }
    finally{
        setIssuggesting(false)
    }
  }

  const handlemessegeclick=(message:string)=>{
   form.setValue("message", message, { shouldValidate: true });
   // Auto focus isn't strictly necessary but matching design
   document.getElementById('anonymous_message')?.focus();
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        body {
            background-color: #050505;
            background-image: 
                linear-gradient(rgba(78, 222, 163, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(78, 222, 163, 0.03) 1px, transparent 1px);
            background-size: 32px 32px;
            background-attachment: fixed;
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: #e0e3e5;
        }
        
        .glass-panel {
            background: rgba(16, 20, 21, 0.6);
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }

        .glass-input {
            background: rgba(11, 15, 16, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-left: 2px solid #4edea3;
            transition: all 0.3s ease;
        }

        .glass-input:focus {
            border-color: rgba(255, 255, 255, 0.4);
            border-left-color: #4edea3;
            outline: none;
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 0 15px rgba(78, 222, 163, 0.1);
        }

        .glow-btn {
            transition: all 0.3s ease;
        }
        
        .glow-btn:hover {
            box-shadow: 0 0 20px rgba(78, 222, 163, 0.4);
        }
        
        .bg-wash {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            background: radial-gradient(circle at 10% 20%, rgba(78, 222, 163, 0.05) 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, rgba(13, 28, 47, 0.4) 0%, transparent 50%);
        }
        `
      }} />

      <div className="text-white min-h-screen flex flex-col antialiased selection:bg-[#4edea3]/30 selection:text-[#4edea3]">
        <div className="bg-wash"></div>
        
        {/* Header (Brand Anchor) */}
        <header className="w-full flex justify-center items-center h-20 glass-panel border-b-0 border-x-0 border-t-0 fixed top-0 z-50">
          <Link href="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#4edea3] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[24px] leading-[32px] font-semibold text-[#4edea3] font-bold tracking-tight">Aura Messenger</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center px-5 md:px-10 pt-32 pb-24 relative z-10">
          <div className="text-center mb-10 w-full max-w-2xl">
            <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] font-bold text-white mb-2 tracking-tight drop-shadow-lg">Public Profile</h1>
            <p className="font-['Plus_Jakarta_Sans'] text-[18px] leading-[28px] font-normal text-gray-400">Share your thoughts with <span className="font-semibold text-[#4edea3]">@{username}</span>, securely and anonymously.</p>
          </div>

          <div className="w-full max-w-2xl space-y-8">
            {/* Message Input Card */}
            <div className="glass-panel rounded-xl p-6 md:p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4edea3]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-[#4edea3]/10 transition-colors duration-700"></div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Write a message</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            id="anonymous_message"
                            className="glass-input w-full rounded-lg p-4 font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] text-white placeholder:text-gray-500 resize-none"
                            placeholder="Write a message..."
                            required
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2 text-gray-500 font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      <span>End-to-end encrypted</span>
                    </div>
                    <button 
                      type="submit"
                      disabled={isloading}
                      className="glow-btn bg-[#4edea3] text-[#002113] font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] font-bold tracking-[0.05em] px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#4edea3]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    >
                      {isloading ? (
                         <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Send</span>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Form>
            </div>

            {/* AI Suggestions Section */}
            <div className="glass-panel rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] leading-[32px] font-semibold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4edea3]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  AI Suggestions
                </h2>
                <button 
                  onClick={handlesuggest} 
                  disabled={issuggesting}
                  className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium px-3 py-1 rounded-full bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20 hover:bg-[#4edea3]/20 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1"
                >
                  {issuggesting && <Loader2 className="w-3 h-3 animate-spin" />}
                  Refresh
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!issuggesting ? (
                  messages.map((message, ind) => (
                    <Messege 
                      key={ind} 
                      message={message} 
                      handlemessegeclick={handlemessegeclick} 
                    />
                  ))
                ) : (
                  <>
                    <Skiliton />
                    <Skiliton />
                  </>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-gray-600 font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium">
          <p>© 2024 Aura Messenger. Secure, Anonymous Feedback.</p>
        </footer>
      </div>
    </>
  );
};

export default Page;
