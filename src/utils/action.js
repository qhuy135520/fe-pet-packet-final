"use server";
import { signIn, signOut } from "@/auth";
import refreshSession from "@/library/refreshSession";

export async function unauthenticate() {
  await signOut({
    redirect: false,
  });
}

export async function authenticate(username, password) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    return r;
  } catch (error) {
    if (error.name === "InvalidUsernamePasswordError") {
      return {
        error: error.type,
        code: 1,
      };
    } else if (error.name === "InactiveAccountError") {
      return {
        error: error.type,
        code: 2,
      };
    } else {
      return {
        error: "Internal Server Error",
        code: 0,
      };
    }
    // if (error.cause.err instanceof InvalidLoginError) {
    //   return { error: "Incorrect username or password" };
    // } else {
    //   throw new Error("Failed to authenticate");
    // }
  }
}
