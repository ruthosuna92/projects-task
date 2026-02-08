"use client";

import styles from "./ProjectsSidebar.module.css";

export default function ProjectsSidebar() {
    // todo: implement real logic
  return (
    <div className={styles.sidebar}>
      <header className={styles.header}>
        <h2 className={styles.title}>Resumen</h2>
      </header>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Próximos vencimientos</h3>

        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span>Proyecto A</span>
            <span className={styles.meta}>2 días</span>
          </li>
          <li className={styles.listItem}>
            <span>Proyecto B</span>
            <span className={styles.meta}>5 días</span>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Totales</h3>

        <div className={styles.stats}>
          <div>
            <strong>12</strong>
            <span>Incidencias</span>
          </div>
          <div>
            <strong>8</strong>
            <span>RFI</span>
          </div>
          <div>
            <strong>4</strong>
            <span>Tareas</span>
          </div>
        </div>
      </section>
    </div>
  );
}