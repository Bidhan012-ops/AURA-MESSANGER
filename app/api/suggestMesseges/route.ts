import { google } from '@ai-sdk/google'; 
import { streamText, UIMessage, convertToModelMessages, generateText } from 'ai';
import { NextResponse } from 'next/server';
import test from 'node:test';
import { success } from 'zod';

export async function GET(req: Request) {
  try {
     const prompt="Create a list of 6 open-ended and engaging questions formatted as a single string. Each question must be separated by the delimiter '||'. These questions are for an anonymous social messaging platform and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Ensure the questions are intriguing, foster curiosity, and contribute to a positive environment.CRITICAL INSTRUCTION: Output ONLY the questions and the delimiters. Do not include any introductory text, concluding remarks, or quotation marks around the entire string.For your example What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?"

 const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: prompt,
});
  return NextResponse.json({
    success:true,
    messege:"The messages are retrived succesfully",
    text:text
  });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return new Response('Error generating suggestions', { status: 500 });
  }
}