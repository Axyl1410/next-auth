"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface ISignOutButtonProps {
  signOutAction: () => void;
}

export default function SignOutButton({ signOutAction }: ISignOutButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => {
          signOutAction();
        });
      }}
    >
      <Button type="submit" disabled={isPending}>
        {isPending ? "Signing out..." : "Sign out"}
      </Button>
    </form>
  );
}
