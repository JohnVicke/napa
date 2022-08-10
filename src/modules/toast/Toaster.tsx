import React, { useEffect } from "react";
import { Toast } from "./toastStore";
import { Icon } from "@/components/icon/Icon";

const getTailwindAlertType = (type: Toast["type"]) => {
  switch (type) {
    case "info":
      return "alert-info";
    case "error":
      return "alert-error";
    case "warning":
      return "alert-error";
    case "success":
      return "alert-success";
    default:
      return "alert-info";
  }
};

interface ToastProps extends Toast {
  removeToast: () => void;
}

const TOASTER_DURATION = 5000;

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
    }, TOASTER_DURATION);

    return () => {
      clearTimeout(timeout);
    };
  }, [sticky, removeToast]);

  const alertType = getTailwindAlertType(type);

  return (
    <div className={`alert ${alertType}`}>
      <span className="font-medium">{message}</span>
      <button onClick={removeToast}>
        <Icon icon="ri-close-circle-fill" />
      </button>
    </div>
  );
};
