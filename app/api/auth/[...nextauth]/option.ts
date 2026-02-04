import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { loginSchema } from "@/schema/loginSchema";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        
       const { email, password } = credentials as { email: string; password: string };
        await dbConnect();
        user = await UserModel.findOne({ email: email });
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        if(!user.isVerified){
          throw new Error("Please verify your email before logging in.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  // ADD THESE TWO SECTIONS:
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only available the very first time the user logs in
      if (user) {
        token.id = user._id?.toString(); // Add your MongoDB ID to the token
        token.email = user.email;
        token.isAccepting = user.isaccepting;
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token.id as string; // Make ID available in the UI
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAccepting = token.isAccepting as boolean;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Required for Credentials provider
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
});
