import {z} from 'zod'; 
export const sendMessageSchema = z.object({
    content: z.string().min(1, { message: "Message content cannot be empty" }).max(100, { message: "Message content must be at most 1000 characters long" }),
});