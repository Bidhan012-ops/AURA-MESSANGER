import {z} from "zod"
export const  messageSchema=z.object({
    message:z.string().min(6,{message:"The input messege must be 2 charater long"})
})