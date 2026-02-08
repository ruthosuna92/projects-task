"use client";

import { ViewOptions, useProjects } from "@/store/useProjectsStore";

import ProjectsTable from "./ProjectsTable/ProjectsTable";
import ProjectsMap from "./ProjectsMap/ProjectsMap";
import ProjectsGrid from "./ProjectsGrid/ProjectsGrid";

import styles from "./ProjectsView.module.css"

export default function ProjectsView() {
  const currentView = useProjects((state) => state.view);

  if (currentView === ViewOptions.Grid) return <ProjectsGrid />;
  if (currentView === ViewOptions.Map)
    return (
      <div className={styles.mapLayout}>
        <div className={styles.mapArea}>
          <ProjectsMap />
        </div>

        <div className={styles.tableArea}>
          <ProjectsTable />
        </div>
      </div>
    );

  return <ProjectsTable />;
}
