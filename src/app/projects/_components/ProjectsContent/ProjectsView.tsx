"use client";

import { ViewOptions, useProjects } from "@/store/useProjectsStore";

import ProjectsTable from "./ProjectsTable/ProjectsTable";
import ProjectsMap from "./ProjectsMap/ProjectsMap";
import ProjectsGrid from "./ProjectsGrid/ProjectsGrid";

export default function ProjectsView() {
  const currentView = useProjects((state) => state.view);

  if (currentView === ViewOptions.Grid) return <ProjectsGrid />;
  if (currentView === ViewOptions.Map)
    return (
      <div>
        <ProjectsMap />
        <ProjectsTable />
      </div>
    );

  return <ProjectsTable />;
}
