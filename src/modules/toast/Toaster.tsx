import React, { useEffect } from "react";
import { Toast } from "./toastStore";
import { Icon } from "@/components/icon/Icon";

interface ToastProps extends Toast {
  removeToast: () => void;
}

export const Toaster = ({
  message,
  removeToast,
  sticky,
  type = "info",
}: ToastProps) => {
  useEffect(() => {
    if (sticky) {
      return;
    }

    const timeout = setTimeout(() => {
      removeToast();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [sticky, removeToast]);

  const alertType = `alert-${type}`;

  return (
    <div className={`alert ${alertType}`}>
      <span className="font-medium">{message}</span>
      <button onClick={removeToast}>
        <Icon icon="ri-close-circle-fill" />
      </button>
    </div>
  );
};
