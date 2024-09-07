import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InvalidUsernamePasswordError,
  CustomAuthError,
  InactiveAccountError,
} from "@/utils/error";
import { sendRequest } from "./utils/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const res = await sendRequest({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
          body: {
            ...credentials,
          },
        });

        if (res.statusCode === 200) {
          return {
            access_token: res.data.access_token,
            type: res.data.type,
            userId: res.data.user.userId,
            username: res.data.user.username,
            email: res.data.user.email,
            address: res.data.user.address,
            name: res.data.user.name,
            gender: res.data.user.gender,
            phone: res.data.user.phone,
            status: res.data.user.status,
            role: res.data.user.role,
            picture: res.data.user.userPicture,
          };
        } else if (+res.statusCode === 423) {
          // Wrong password 401
          throw new InactiveAccountError();
        } else if (+res.statusCode === 401) {
          throw new InvalidUsernamePasswordError();
        } else {
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
