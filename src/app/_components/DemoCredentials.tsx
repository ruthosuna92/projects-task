"use client";

import { useState } from "react";
import styles from "./DemoCredentials.module.css";

type CopyState = "idle" | "copied";

export default function DemoCredentials() {
  const [emailState, setEmailState] = useState<CopyState>("idle");
  const [passwordState, setPasswordState] = useState<CopyState>("idle");

  const copy = async (
    value: string,
    setState: (s: CopyState) => void,
  ) => {
    await navigator.clipboard.writeText(value);
    setState("copied");
    setTimeout(() => setState("idle"), 1500);
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>Credenciales de prueba</div>

      <button
        type="button"
        className={styles.credential}
        onClick={() => copy("demo@spybee.com", setEmailState)}
      >
        <span className={styles.label}>Email</span>
        <span className={styles.value}>demo@spybee.com</span>
        <span className={styles.action}>
          {emailState === "copied" ? "Copiado ✓" : "Copiar"}
        </span>
      </button>

      <button
        type="button"
        className={styles.credential}
        onClick={() => copy("demo1234", setPasswordState)}
      >
        <span className={styles.label}>Contraseña</span>
        <span className={styles.value}>demo1234</span>
        <span className={styles.action}>
          {passwordState === "copied" ? "Copiado ✓" : "Copiar"}
        </span>
      </button>
    </div>
  );
}