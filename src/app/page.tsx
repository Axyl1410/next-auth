import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage() {
  const session = await auth();
  return (
    <div className="flex flex-col gap-2">
      <form
        action={async () => {
          "use server";
          try {
            await signIn("github", {
              redirectTo: "/",
            });
          } catch (error) {
            // Signin can fail for a number of reasons, such as the user
            // not existing, or the user not having the correct role.
            // In some cases, you may want to redirect to a custom error
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }

            // Otherwise if a redirects happens Next.js can handle it
            // so you can just re-thrown the error and let Next.js handle it.
            // Docs:
            // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
            throw error;
          }
        }}
      >
        <button type="submit">
          <span>Sign in with Github</span>
        </button>
      </form>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
      <img
        className="h-10 w-10 rounded-full"
        src={session?.user?.image || ""}
        alt="User Avatar"
      />
    </div>
  );
}
