import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      if (!user.email) return false;

      const existingUser = await User.findOne({
        email: user.email,
      });

      // CREATE USER ONLY IF NOT EXISTS
      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          provider: "google",

          // IMPORTANT
          role: null,
        });
      }

      return true;
    },

    // IMPORTANT
    async jwt({ token }) {
      await connectDB();

      if (token.email) {
        const dbUser = await User.findOne({
          email: token.email,
        });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };