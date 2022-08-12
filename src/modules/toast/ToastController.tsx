import React from "react";
import { Toaster } from "./Toaster";
import { Toast, useToastStore } from "./toastStore";

interface ToastControllerProps {}

export const ToastController = ({}: ToastControllerProps) => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="avoid-nav toast toast-end toast-top w-full max-w-xs">
      {toasts.map((toast: Toast) => (
        <Toaster
          key={toast.id}
          {...toast}
          removeToast={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
