import { Suspense } from "react";
import LoginPage from "@/components/auth/loginPage";

export default function AdminLogin() {
  return (
    <Suspense fallback={<div>Cargando login...</div>}>
      <LoginPage redirectUrl="/admin" />
    </Suspense>
  );
}
