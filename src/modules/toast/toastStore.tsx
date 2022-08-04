import { v4 } from "uuid";
import create, { StateCreator } from "zustand";

export type Toast = {
  id: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  sticky?: boolean;
};

type ToastState = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast: Omit<Toast, "id">) => {
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: v4() }],
    }));
  },
  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
