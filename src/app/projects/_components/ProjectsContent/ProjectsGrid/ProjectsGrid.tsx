"use client";

import styles from "./ProjectsGrid.module.css";
import { useProjects } from "@/store/useProjectsStore";
import { selectVisibleProjects } from "@/lib/projectSelectors/projectSelectors";
import ProjectsGridItem from "./ProjectsGridItem";

export default function ProjectsGrid() {
   const projectsState = useProjects();

  const page = useProjects((s) => s.page);
  const pageSize = useProjects((s) => s.pageSize);


  const projects = selectVisibleProjects(
    projectsState,
    page,
    pageSize
  );

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectsGridItem
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}