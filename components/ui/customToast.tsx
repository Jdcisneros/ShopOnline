import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        success: {
          icon: "✅",
        },
        error: {
          icon: "❌",
        },
      }}
    />
  );
}
