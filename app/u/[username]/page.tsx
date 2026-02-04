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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import Messege from "@/components/Messege";
import { Loader2 } from "lucide-react";
import Skiliton from "@/components/Skiliton";
import { demoMessages } from "@/helper/suggestmessages";
const Page = () => {
    const param=useParams<{username:string}>();
    const username=decodeURIComponent(param.username);
    console.log("The username is",username);
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
        console.log('the erro object is',err);
        toast.error('error come');
    }finally{
        setIsloading(false);
    }
  };
  const handlesuggest=async ()=>{
    setIssuggesting(true);
    try{
    const responce=await axios.get(`/api/suggestMesseges`);
    if(responce.data.success){
        setmesseges(responce.data.text.split('||'));
        console.log(messages);
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
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 min-h-screen">
      {/* Header Section */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Public Profile
        </h1>
        <p className="text-muted-foreground">
          Share your thoughts with the world.
        </p>
      </header>

      {/* Input Section */}
      <section className="bg-card border rounded-xl p-6 shadow-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-4 items-start"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel className="sr-only">Message</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Write a message..."
                      className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-12 px-8 w-full md:w-auto font-semibold cursor-pointer"
            >
              Send
            </Button>
          </form>
        </Form>
      </section>

      <Separator className="my-8" />

      {/* Messages Display Section */}
      <Card className="border-2 shadow-md overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl font-bold">Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-6 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-4 relative">
            {/* Sample Message Bubble */}
            {
             !issuggesting?messages.map((message,ind)=>(
                <Messege key={ind} message={message} handlemessegeclick={handlemessegeclick}/>
             )):<Skiliton/>
            }
          </div>

          <div className="flex justify-end mt-6">
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              onClick={handlesuggest}
            >
              AI suggestion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
