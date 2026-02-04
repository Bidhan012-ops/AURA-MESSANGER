import {z} from "zod";

export const acceptMessagesSchema = z.object({ 
isaccepting: z.boolean()
});