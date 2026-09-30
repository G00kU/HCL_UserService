
import { createContext, useContext, useEffect, useState } from "react";
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Info,
    X,
} from "lucide-react";

const ToastContext = createContext(null);

const toastConfig = {
    success: {
        icon: CheckCircle2,
        title: "Success",
        iconClass: "text-emerald-500",
        progressClass: "bg-emerald-500",
    },
    error: {
        icon: XCircle,
        title: "Error",
        iconClass: "text-red-500",
        progressClass: "bg-red-500",
    },
    warning: {
        icon: AlertTriangle,
        title: "Warning",
        iconClass: "text-amber-500",
        progressClass: "bg-amber-500",
    },
    info: {
        icon: Info,
        title: "Info",
        iconClass: "text-blue-500",
        progressClass: "bg-blue-500",
    },
};

const Toast = ({ toast, onClose }) => {
    if (!toast) return null;

    const config = toastConfig[toast.type] || toastConfig.info;
    const Icon = config.icon;

    return (
        <div className="fixed right-5 top-5 z-[9999] w-[360px] max-w-[calc(100vw-2rem)]">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-[slideIn_0.25s_ease-out]">
                <div className="flex items-start gap-3 p-4">
                    <Icon
                        size={22}
                        className={`mt - 0.5 shrink - 0 ${config.iconClass} `}
                    />

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                            {config.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                            {toast.message}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={17} />
                    </button>
                </div>

                <div className="h-1 bg-slate-100">
                    <div
                        className={`h - full ${config.progressClass} animate - [toastProgress_${toast.duration}ms_linear]`}
                    />
                </div>
            </div>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        let timeoutId;
        const handleApiServerDown = () => {
            setToast({
                type: "error",
                message: "API Server Down",
                duration: 5000,
            });
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => setToast(null), 5000);
        };

        window.addEventListener("api-server-down", handleApiServerDown);
        return () => {
            window.removeEventListener("api-server-down", handleApiServerDown);
            window.clearTimeout(timeoutId);
        };
    }, []);

    const showToast = (type, message, duration = 3000) => {
        setToast({
            type,
            message,
            duration,
        });

        setTimeout(() => {
            setToast(null);
        }, duration);
    };

    const toastApi = {

        success: (message, duration) =>
            showToast("success", message, duration),

        error: (message, duration) =>
            showToast("error", message, duration),

        warning: (message, duration) =>
            showToast("warning", message, duration),

        info: (message, duration) =>
            showToast("info", message, duration),
    };

    return (
        <ToastContext.Provider value={toastApi}>
            {children}
            <Toast
                toast={toast}
                onClose={() => setToast(null)}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider"
        );
    }

    return context;
};
