import { Messege } from "@/model/user";
export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    isAccepting?: boolean;
    Messeges?: Messege[];
}