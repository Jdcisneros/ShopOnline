"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UseRequireAuthProps = {
  adminOnly?: boolean;
  redirectTo?: string;
};

export function useRequireAuth({
  adminOnly = false,
  redirectTo = "/login",
}: UseRequireAuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // esperar
    if (!session) {
      router.push(redirectTo);
      return;
    }
    if (adminOnly && !session.user?.isAdmin) {
      router.push("/"); // usuario no admin intentando ruta admin
    }
  }, [session, status, router, adminOnly, redirectTo]);

  return { session, status };
}
