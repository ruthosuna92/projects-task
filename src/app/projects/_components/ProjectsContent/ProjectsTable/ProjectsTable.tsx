"use client";

import styles from "./ProjectsTable.module.css";
import { useProjects } from "@/store/useProjectsStore";
import { selectVisibleProjects } from "@/lib/projectSelectors/projectSelectors";
import ProjectsTableHeader from "./ProjectsTableHeader";
import ProjectsTableRow from "./ProjectsTableRow";
import ProjectsTableRowSkeleton from "./ProjectsTableRowSkeleton";


export default function ProjectsTable() {
  const projectsState = useProjects();

  const page = useProjects((s) => s.page);
  const pageSize = useProjects((s) => s.pageSize);
  const isLoading = useProjects((s) => s.isLoading);

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
           {isLoading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <ProjectsTableRowSkeleton key={i} />
              ))
            : visibleProjects.map((project) => (
                <ProjectsTableRow key={project.id} project={project} />
              ))}
        </tbody>
      </table>
    </div>
  );
}