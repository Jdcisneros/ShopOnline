import ClientProvider from "./clientProvider";
import MainNavbarServer from "@/components/navbarServer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <MainNavbarServer />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
