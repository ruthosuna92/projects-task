import styles from "./ProjectsTable.module.css";

export default function ProjectsTableHeader() {
  return (
    <thead className={styles.thead}>
      <tr className={styles.headerRow}>
        <th className={styles.th}>Proyecto</th>
        <th className={styles.th}>Plan</th>
        <th className={styles.th}>Estado</th>
        <th className={styles.th}>Equipo</th>
        <th className={styles.th}>Items por vencer</th>
      </tr>
    </thead>
  );
}