"use client";

import { useRouter } from "next/navigation";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const onClose = () => {
    router.back(); // regresa a la ruta previa
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40"
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
        >
          {children}
        </div>
      </div>
    </>
  );
}
