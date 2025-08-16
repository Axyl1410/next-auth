import { auth, providerMap } from "@/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { signInAction, signOutAction } from "@/lib/actions";
import { IProvider } from "@/types/next-auth";
import { SignInButton } from "./components/signin-button";
import SignOutButton from "./components/signout-button";

export default async function SignInPage() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider: IProvider) => {
        return (
          <SignInButton
            key={provider.id}
            provider={provider}
            signInAction={signInAction}
          />
        );
      })}

      <SignOutButton signOutAction={signOutAction} />

      {session?.user?.image ? (
        <img
          className="h-10 w-10 rounded-full"
          src={session.user.image || ""}
          alt="User Avatar"
        />
      ) : (
        <Skeleton className="h-10 w-10 rounded-full" />
      )}
    </div>
  );
}
