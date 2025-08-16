"use client";

import { Button } from "@/components/ui/button";
import { IProvider } from "@/types/next-auth";
import { useTransition } from "react";

interface ISignInButtonProps {
  provider: IProvider;
  signInAction: (provider: IProvider) => void;
}

export function SignInButton({ provider, signInAction }: ISignInButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => {
          signInAction(provider);
        });
      }}
    >
      <Button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : `Sign in with ${provider.name}`}
      </Button>
    </form>
  );
}
