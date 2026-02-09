"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

import styles from "./page.module.css";
import DemoCredentials from "./_components/DemoCredentials";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/projects",
    });

    setIsSubmitting(false);
    console.log(res);
    if (res?.error) {
      setError("Email o contraseña inválidos.");
      return;
    }

    if (res?.url) window.location.href = res.url;
  };

  return (
    <section className={styles.page_container}>
      <div className={styles.container}>
        <div className={styles.logo_container}>
          <Image
            alt="Logo"
            src="/images/logo-gray.svg"
            width={180}
            height={80}
            className={styles.logo}
            priority
          />
        </div>

        <div className={styles.text_container}>
          <h2>
            Ingresa a la prueba tecnica de <br /> Alejandra Osuna
          </h2>
        </div>

        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.form_item}>
              <label htmlFor="login_email" className={styles.label}>
                Email
              </label>
              <input
                id="login_email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.form_item}>
              <label htmlFor="login_password" className={styles.label}>
                Contraseña
              </label>
              <input
                id="login_password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? <p className={styles.error}>{error}</p> : null}

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
        <DemoCredentials />
      </div>
    </section>
  );
}
