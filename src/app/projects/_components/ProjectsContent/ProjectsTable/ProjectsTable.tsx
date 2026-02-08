"use client";

import styles from "./ProjectsTable.module.css";
import { useProjects } from "@/store/useProjectsStore";
import { selectVisibleProjects } from "@/lib/projectSelectors/projectSelectors";
import ProjectsTableHeader from "./ProjectsTableHeader";
import ProjectsTableRow from "./ProjectsTableRow";


export default function ProjectsTable() {
  const projectsState = useProjects();

  const page = 1;
  const pageSize = 10;

  const visibleProjects = selectVisibleProjects(
    projectsState,
    page,
    pageSize
  );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <ProjectsTableHeader />
        <tbody>
          {visibleProjects.map((project) => (
            <ProjectsTableRow key={project.id} project={project} />
          ))}
        </tbody>
      </table>
    </div>
  );
}