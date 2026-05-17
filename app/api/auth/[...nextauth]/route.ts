import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";

import User from "@/models/User";

const handler = NextAuth({

  providers: [

    // GOOGLE
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // CREDENTIALS LOGIN
    CredentialsProvider({

      name: "credentials",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(
        credentials
      ) {

        await connectDB();

        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const user =
          await User.findOne({
            email:
              credentials.email,
          });

        if (!user) {
          return null;
        }

        const isMatch =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!isMatch) {
          return null;
        }

        return {
          id:
            user._id.toString(),

          name:
            user.name,

          email:
            user.email,

          role:
            user.role,
        };
      },
    }),
  ],

  callbacks: {

    // GOOGLE LOGIN
    async signIn({
      user,
      account,
    }) {

      await connectDB();

      if (!user.email)
        return false;

      // ONLY FOR GOOGLE USERS
      if (
        account?.provider ===
        "google"
      ) {

        const existingUser =
          await User.findOne({
            email:
              user.email,
          });

        if (!existingUser) {

          await User.create({
            email:
              user.email,

            name:
              user.name,

            image:
              user.image,

            provider:
              "google",

            role: null,
          });
        }
      }

      return true;
    },

    // JWT
    async jwt({
      token,
    }) {

      await connectDB();

      if (token.email) {

        const dbUser =
          await User.findOne({
            email:
              token.email,
          });

        if (dbUser) {

          token.id =
            dbUser._id.toString();

          token.role =
            dbUser.role;
        }
      }

      return token;
    },

    // SESSION
    async session({
      session,
      token,
    }) {

      if (session.user) {

        session.user.id =
          token.id as string;

        session.user.role =
          token.role as any;
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

  secret:
    process.env.NEXTAUTH_SECRET,
});

export {
  handler as GET,
  handler as POST,
};