import { createContext, ReactNode, useState } from "react";
import { v4 } from "uuid";

interface IToastContext {
	toasts: Toast[];
	newToast: (toast: Omit<Toast, "id">) => void;
	deleteToast: (id: string) => void;
}

export const ToastContext = createContext<IToastContext>({
	toasts: [],
	newToast: () => {},
	deleteToast: () => {},
});

export type Toast = {
	id: string;
	type?: "error" | "info" | "success";
	message: string;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const newToast = (toast: Omit<Toast, "id">) => {
		setToasts([...toasts, { ...toast, id: v4() }]);
	};

	const deleteToast = (id: string) => {
		setToasts(toasts.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ toasts, newToast, deleteToast }}>
			{children}
		</ToastContext.Provider>
	);
};
