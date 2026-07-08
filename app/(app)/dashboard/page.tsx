"use client";

import Messagecard from "@/components/Messagecard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Messege } from "@/model/user";
import { acceptMessagesSchema } from "@/schema/acceptMesseges";
import { ApiResponse } from "@/types/Apiresponce";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Copy, LayoutDashboard } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Page = () => {
  const [messages, setMessages] = useState<Messege[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [isswitching, setIsswitching] = useState<boolean>(false);

  const handleDeleteMessage = async (id: string) => {
    setMessages(messages.filter((msg) => msg._id.toString() !== id));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
    defaultValues: {
      isaccepting: false
    }
  });

  const { register, watch, setValue } = form;
  const isacceptingMessages = watch("isaccepting");

  const getmesseges = useCallback(async () => {
    setIsloading(true);
    try {
      const responce = await axios.get("/api/getmesseges");
      if (responce.data.success) {
        setMessages(responce.data.Messeges);
        toast.success("Messages retrieved successfully");
      }
    } catch (error) {
      const er = error as AxiosError<ApiResponse>;
      toast.error(er.response?.data.message || "Failed to retrieve messages");
    } finally {
      setIsloading(false);
    }
  }, []);

  const acceptmessagestate = useCallback(async () => {
    setIsswitching(true);
    try {
      const responce = await axios.get(`/api/acceptmessege`);
      if (responce.data.success) {
        setValue("isaccepting", responce.data.isAccepting);
      }
    } catch (error) {
      toast.error(`Error checking message state`);
    } finally {
      setIsswitching(false);
    }
  }, [setValue]);

  useEffect(() => {
    if (!session || !session.user) return;
    getmesseges();
    acceptmessagestate();
  }, [session, getmesseges, acceptmessagestate]);

  const togglestate = async () => {
    setIsswitching(true);
    try {
      const nextState = !isacceptingMessages;
      await axios.post(`/api/acceptmessege`, {
        acceptmesseges: nextState,
      });
      setValue("isaccepting", nextState);
      toast.success("Status updated", { position: "top-right" });
    } catch (error) {
      toast.error(`Failed to update status`, { position: "top-right" });
    } finally {
      setIsswitching(false);
    }
  };

  if (!session || !session.user) return (
    <div className="flex items-center justify-center min-h-[60vh] bg-[#050505] text-[#e0e3e5]">
      <p className="font-['Plus_Jakarta_Sans'] text-gray-400">Please login to view this page.</p>
    </div>
  );

  const { username } = session.user as User;
  const baseurl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
  const profileurl = `${baseurl}/u/${username}`;

  const copyToClickboard = () => {
    navigator.clipboard.writeText(profileurl);
    toast.success("URL copied to clipboard", { position: "top-center" });
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
            background-color: rgba(255, 255, 255, 0.05);
            color: #e0e3e5;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }

        .btn-secondary:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
        }
        `
      }} />

      <div className="bg-[#050505] text-[#e0e3e5] antialiased min-h-screen flex flex-col md:flex-row font-['Plus_Jakarta_Sans'] selection:bg-[#4edea3]/20 selection:text-white">

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/5 z-50">
          <div className="p-6 flex items-center gap-3 border-b border-white/5">
            <div className="w-10 h-10 rounded-lg bg-[#4edea3]/10 flex items-center justify-center border border-[#4edea3]/20">
              <span className="material-symbols-outlined text-[#4edea3]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
            </div>
            <div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-bold text-white tracking-tight">Aura Messenger</h1>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium text-gray-500 uppercase tracking-widest">Pro Node</p>
            </div>
          </div>
          <nav className="flex-1 p-4 flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#4edea3]/10 text-[#4edea3] transition-colors border border-[#4edea3]/20">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
              <span className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Dashboard</span>
            </Link>
            <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent">
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Account</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 md:ml-64 pt-8 md:pt-16 px-5 md:px-10 pb-24 md:pb-12 max-w-[1400px] mx-auto w-full">

          {/* Header Area */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/5 pb-8 relative">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#4edea3]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[#4edea3] text-3xl">grid_view</span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] font-bold tracking-[-0.02em] text-white">Dashboard</h2>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] font-normal text-gray-400">Manage your anonymous messages and settings.</p>
            </div>
            <button
              onClick={getmesseges}
              disabled={isloading}
              className="btn-secondary font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold py-2 px-4 rounded-lg flex items-center gap-2 self-start md:self-auto w-fit"
            >
              {isloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="material-symbols-outlined text-sm">refresh</span>}
              Refresh
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            {/* Left Column: Controls & Info */}
            <div className="flex flex-col gap-6 lg:col-span-12">

              {/* Public Link Panel */}
              <section className="glass-panel rounded-xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4edea3]/5 rounded-full blur-[50px] -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50"></div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-gray-400 uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4edea3] inline-block"></span> Your Public Link
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="glass-input flex-1 w-full rounded-lg px-4 py-3 font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-white flex items-center gap-3 cursor-text">
                    <span className="material-symbols-outlined text-gray-500 text-sm">link</span>
                    <span className="truncate select-all text-[#4edea3]">{profileurl}</span>
                  </div>
                  <button
                    onClick={copyToClickboard}
                    className="btn-primary font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-[0_0_10px_rgba(78,222,163,0.2)]"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span> Copy Link
                  </button>
                </div>
              </section>

              {/* Settings Toggle Panel */}
              <section className="glass-panel rounded-xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] leading-[32px] font-semibold tracking-tight text-white mb-1 flex items-center gap-2">
                    Accepting Messages
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400">
                    {isacceptingMessages ? "People can currently send you anonymous messages via your public link." : "Your inbox is currently closed."}
                  </p>
                </div>
                {/* Custom Toggle Switch */}
                <label className="flex items-center cursor-pointer gap-3 glass-panel px-4 py-2 rounded-full">
                  <span className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-white">
                    {isacceptingMessages ? 'Enabled' : 'Disabled'}
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register("isaccepting")}
                      checked={isacceptingMessages}
                      onChange={(e) => {
                        register("isaccepting").onChange(e);
                        togglestate();
                      }}
                      disabled={isswitching}
                    />
                    <div className={`block w-14 h-8 rounded-full border transition-colors ${isacceptingMessages ? 'bg-[#4edea3]/20 border-[#4edea3]/50' : 'bg-[#2b2d31] border-white/10'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-[#4edea3] w-6 h-6 rounded-full transition-transform transform flex items-center justify-center ${isacceptingMessages ? 'translate-x-6 shadow-[0_0_8px_rgba(78,222,163,0.8)]' : ''}`}>
                      <div className="w-2 h-2 bg-[#002113] rounded-full"></div>
                    </div>
                  </div>
                </label>
              </section>

              {/* Messages Feed */}
              <section className="mt-8">
                <div className="flex justify-between items-end mb-6 pb-2 border-b border-white/5">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] leading-[32px] font-semibold tracking-tight text-white">Your Messages</h3>
                  <span className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium bg-[#4edea3]/10 text-[#4edea3] px-3 py-1 rounded-full border border-[#4edea3]/20 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-pulse"></span> {messages.length} Total
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {messages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {messages.map((message) => (
                        <Messagecard
                          key={message._id.toString()}
                          message={message}
                          onMessageDelete={handleDeleteMessage}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass-panel rounded-xl p-12 flex flex-col items-center justify-center text-center border-dashed border-white/20">
                      <span className="material-symbols-outlined text-4xl text-gray-500 mb-4 opacity-50">inbox</span>
                      <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] leading-[32px] font-semibold tracking-tight text-white mb-2">No messages yet</h4>
                      <p className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400 max-w-md mx-auto">Share your public link to start receiving anonymous feedback securely.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden glass-panel fixed bottom-0 left-0 w-full h-16 flex justify-around items-center z-50 border-t border-white/10 shadow-none pb-safe">
          <Link href="/dashboard" className="flex flex-col items-center justify-center text-[#4edea3] active:scale-90 transition-transform p-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium mt-1">Dashboard</span>
          </Link>
          <Link href="/account" className="flex flex-col items-center justify-center text-gray-500 hover:text-[#4edea3] active:scale-90 transition-transform p-2">
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium mt-1">Account</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Page;