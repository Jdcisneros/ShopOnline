"use client";

import { SessionProvider } from "next-auth/react";
import { usePageLoading } from "@/hooks/usePageLoading";
import CustomToaster from "@/components/ui/customToast";
import { Footer } from "@/components/footer";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loading = usePageLoading();

  return (
    <SessionProvider>
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/70 pointer-events-none flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      )}

      {children}
      <Footer />
      <CustomToaster />
    </SessionProvider>
  );
}
