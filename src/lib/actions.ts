import { signIn, signOut } from "@/auth";
import { SIGNIN_ERROR_URL } from "@/constants/next-auth";
import { IProvider } from "@/types/next-auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const signInAction = async (provider: IProvider) => {
  "use server";
  try {
    await signIn(provider.id, {
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
};

export const signOutAction = async () => {
  "use server";
  try {
    await signOut();
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
};
