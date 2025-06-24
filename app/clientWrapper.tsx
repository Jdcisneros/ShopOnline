"use client";

import ClientProvider from "./clientProvider";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientProvider>{children}</ClientProvider>;
}
