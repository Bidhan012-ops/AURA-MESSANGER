"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { X } from "lucide-react";
import { Messege } from "@/model/user";
import axios from "axios";
import { ApiResponse } from "@/types/Apiresponce";
type MessagecardProps = {
  message:Messege;
  onMessageDelete: (id:string) => void;
};
const Messagecard = ({message,onMessageDelete}:MessagecardProps) => {
    const date=new Date(message.createdAt);
    const messageid=message._id;
    const handlecotinue=()=>{
        const responce=axios.get<ApiResponse>(`/api/deletemessege?messageId=${messageid}`);
        onMessageDelete(messageid.toString());
    }
  return (
    <Card className="mx-auto w-full max-w-sm p-4">
      <div className="flex justify-between items-start gap-4">
      <div className="p-2">
        <CardTitle className="mb-2">{message.content}</CardTitle>
      <CardDescription>{date.toString()}</CardDescription>
      </div>
      <div className="">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="cursor-pointer"><X className=""/></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel >Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlecotinue}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </div>
    </Card>
  );
};

export default Messagecard;
