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
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-muted-foreground">Please login to view this page.</p>
    </div>
  );

  const { username } = session.user as User;
  const baseurl = `${window.location.protocol}//${window.location.host}`;
  const profileurl = `${baseurl}/u/${username}`;

  const copyToClickboard = () => {
    navigator.clipboard.writeText(profileurl);
    toast.success("URL copied to clipboard", { position: "top-center" });
  };

  return (
    <div className="container mx-auto my-10 px-4 max-w-5xl">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your anonymous messages and settings.</p>
        </div>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={getmesseges}
          disabled={isloading}
          className="w-fit cursor-pointer"
        >
          {isloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Link Copy Section */}
        <section className="p-6 bg-card border rounded-xl shadow-sm">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Your Public Link
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileurl}
              disabled
              className="flex-1 bg-muted p-2.5 rounded-lg text-sm border font-mono"
            />
            <Button onClick={copyToClickboard} className="shrink-0 cursor-pointer">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </section>

        {/* Controls Section */}
        <section className="flex items-center justify-between p-6 bg-card border rounded-xl shadow-sm">
          <div className="space-y-0.5">
            <h3 className="text-lg font-semibold">Accepting Messages</h3>
            <p className="text-sm text-muted-foreground">
              {isacceptingMessages 
                ? "People can currently send you anonymous messages." 
                : "Your inbox is currently closed."}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-muted/50 px-4 py-2 rounded-full border">
             <span className="text-sm font-medium">
              {isacceptingMessages ? "Enabled" : "Disabled"}
            </span>
            <Switch
              {...register("isaccepting")}
              checked={isacceptingMessages}
              onCheckedChange={togglestate}
              disabled={isswitching}
              className="data-[state=checked]:bg-green-500 cursor-pointer"
            />
          </div>
        </section>

        <Separator className="my-4" />

        {/* Messages Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Messages</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-primary/20">
              {messages.length} Total
            </span>
          </div>

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
            <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/20">
              <p className="text-muted-foreground">No messages to display yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Page;