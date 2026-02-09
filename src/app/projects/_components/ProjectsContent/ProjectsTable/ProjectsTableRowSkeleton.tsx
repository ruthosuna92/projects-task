import styles from "./ProjectsTable.module.css";

export default function ProjectsTableRowSkeleton() {
  return (
    <tr className={styles.skeletonRow}>
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className={styles.td}>
          <div className={styles.skeletonBlock} />
        </td>
      ))}
    </tr>
  );
}