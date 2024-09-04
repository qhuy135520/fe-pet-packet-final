import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InvalidUsernamePasswordError, CustomAuthError } from "@/utils/error";
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

        if (!res.statusCode) {
          console.log("check res: ", res);
          return {
            token: res.token,
            type: res.type,
            userId: res.userResponse.userId,
            username: res.userResponse.username,
            email: res.userResponse.email,
            address: res.userResponse.address,
            fullName: res.userResponse.fullName,
            gender: res.userResponse.gender,
            phone: res.userResponse.phone,
            status: res.userResponse.status,
            role: res.userResponse.role,
            image: res.userResponse.image,
          };
        } else if (+res.statusCode === 423) {
          // Wrong password 401
          throw new InvalidUsernamePasswordError();
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
    jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
