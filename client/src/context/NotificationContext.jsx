import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const notify = (message, type = "info") => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const confirmAction = (message, options = {}) => {
    return new Promise((resolve) => {
      setConfirmation({
        message,
        title: options.title || "Are you sure?",
        confirmText: options.confirmText || "Continue",
        cancelText: options.cancelText || "Cancel",
        onConfirm: () => {
          setConfirmation(null);
          resolve(true);
        },
        onCancel: () => {
          setConfirmation(null);
          resolve(false);
        },
      });
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notify,
        confirmAction,
      }}
    >
      {children}

      {/* =========================
          NOTIFICATION
      ========================= */}
      {notification && (
        <div className="fixed top-6 right-6 z-[9999] w-[calc(100%-2rem)] max-w-sm">
          <div
            className={`rounded-2xl border bg-white shadow-2xl p-4 flex items-start gap-3 ${
              notification.type === "success"
                ? "border-green-200"
                : notification.type === "error"
                ? "border-red-200"
                : notification.type === "warning"
                ? "border-yellow-200"
                : "border-blue-200"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                notification.type === "success"
                  ? "bg-green-100 text-green-600"
                  : notification.type === "error"
                  ? "bg-red-100 text-red-600"
                  : notification.type === "warning"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {notification.type === "success"
                ? "✓"
                : notification.type === "error"
                ? "!"
                : notification.type === "warning"
                ? "!"
                : "i"}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`font-semibold ${
                  notification.type === "success"
                    ? "text-green-700"
                    : notification.type === "error"
                    ? "text-red-700"
                    : notification.type === "warning"
                    ? "text-yellow-700"
                    : "text-blue-700"
                }`}
              >
                {notification.type === "success"
                  ? "Success"
                  : notification.type === "error"
                  ? "Something went wrong"
                  : notification.type === "warning"
                  ? "Warning"
                  : "Information"}
              </p>

              <p className="mt-1 text-sm text-slate-600 leading-5 break-words">
                {notification.message}
              </p>
            </div>

            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* =========================
          CONFIRMATION MODAL
      ========================= */}
      {confirmation && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
                !
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-800">
                  {confirmation.title}
                </h2>

                <p className="mt-2 text-slate-500 leading-6">
                  {confirmation.message}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                onClick={confirmation.onCancel}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
              >
                {confirmation.cancelText}
              </button>

              <button
                onClick={confirmation.onConfirm}
                className="px-5 py-2.5 rounded-xl bg-[#5B21B6] text-white font-semibold hover:bg-[#4C1D95] transition shadow-md"
              >
                {confirmation.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
}