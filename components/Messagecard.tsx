"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Messege } from "@/model/user";
import axios from "axios";
import { ApiResponse } from "@/types/Apiresponce";

type MessagecardProps = {
  message: Messege;
  onMessageDelete: (id: string) => void;
};

const Messagecard = ({ message, onMessageDelete }: MessagecardProps) => {
  const date = new Date(message.createdAt);
  const messageid = message._id;
  const handlecotinue = () => {
    const responce = axios.get<ApiResponse>(`/api/deletemessege?messageId=${messageid}`);
    onMessageDelete(messageid.toString());
  };

  return (
    <article className="bg-[#101415]/40 backdrop-blur-[32px] border border-white/10 rounded-xl p-6 relative group transition-all duration-300 hover:border-white/20">
      {/* Left accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4edea3] rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="font-['Plus_Jakarta_Sans'] text-[18px] leading-[28px] font-normal text-white mb-4 leading-relaxed pr-8">
            "{message.content}"
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <time className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium tracking-wider uppercase opacity-70">
              {date.toString()}
            </time>
          </div>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button 
              aria-label="Delete message" 
              className="w-10 h-10 rounded-full bg-red-900/20 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#050505] border border-white/10 text-white font-['Plus_Jakarta_Sans']">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                This action cannot be undone. This will permanently delete this message
                from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlecotinue} className="bg-red-500 hover:bg-red-600 text-white">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  );
};

export default Messagecard;
