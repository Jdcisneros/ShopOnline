import ClientWrapper from "./clientWrapper";
import "./globals.css";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ClientWrapper>
          {children}
          {modal}
        </ClientWrapper>
      </body>
    </html>
  );
}
