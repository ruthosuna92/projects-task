"use client";

import Header from "@/components/layout/Header";
import ProjectsHeader from "./_components/ProjectsHeader/ProjectsHeader";
import { projects } from "@/lib/dataAdapters";
import { useEffect } from "react";
import { useProjects } from "@/store/useProjectsStore";

export default function ProjectsPage() {
  const setProjects = useProjects((s) => s.setProjects);

  useEffect(() => {
    setProjects(projects);
  }, [setProjects]);

  return (
    <main>
      <Header />
      <ProjectsHeader />
    </main>
  );
}