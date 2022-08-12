import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React from "react";
import { Toaster } from "./Toaster";
import { Toast, useToastStore } from "./toastStore";

interface ToastControllerProps {}

export const ToastController = ({}: ToastControllerProps) => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="avoid-nav toast toast-end toast-top w-full max-w-xs">
      <LayoutGroup>
        <AnimatePresence>
          {toasts.map((toast: Toast) => (
            <motion.div
              exit={{
                opacity: 0,
                x: -20,
              }}
              key={toast.id}
              layoutId={`toast-${toast.id}`}
            >
              <Toaster {...toast} removeToast={() => removeToast(toast.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
