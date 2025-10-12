// components/ui/CustomToast.tsx
import React from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "./CustomToast.module.css";

export const showCustomToast = (
  message: string,
  type: "success" | "error" = "success"
) => {
  toast.custom(
    (t) => (
      <div
        className={`${styles.toastContainer} ${
          t.visible ? "" : styles.fadeOut
        }`}
      >
        <div
          className={
            styles.iconWrapper +
            " " +
            (type === "success" ? styles.iconSuccess : styles.iconError)
          }
        >
          {type === "success" ? (
            <FaCheckCircle size={24} />
          ) : (
            <FaExclamationCircle size={24} />
          )}
        </div>
        <p className={styles.message}>{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className={`${styles.okButton} ${
            type === "success" ? styles.okButtonSuccess : styles.okButtonError
          }`}
        >
          OK
        </button>
      </div>
    ),
    {
      duration: Infinity, // 🚀 Keep it showing until dismissed
    }
  );
};
