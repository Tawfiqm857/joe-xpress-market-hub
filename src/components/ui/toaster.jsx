import { ToastProvider, ToastViewport } from "@/components/ui/toast";

function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  );
}

export { Toaster };