"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SuccessModal from "./@modal/success/page";
import ModalLayout from "./@modal/layout";
import { usePageLoading } from "@/hooks/usePageLoading";
import CustomToaster from "@/components/ui/customToast";
import { Footer } from "@/components/footer";


export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");
  const loading = usePageLoading();
  return (
    <SessionProvider>
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/70 pointer-events-none flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full pointer-events-auto" />
        </div>
      )}
      {children}
      {modal === "success" && (
        <ModalLayout>
          <SuccessModal />
        </ModalLayout>
      )}
      <Footer />
      <CustomToaster />
    </SessionProvider>
  );
}
