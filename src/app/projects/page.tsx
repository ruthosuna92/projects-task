"use client";

import Header from "@/components/layout/Header";
import ProjectsHeader from "./_components/ProjectsHeader/ProjectsHeader";
import { projects } from "@/lib/dataAdapters";
import { useEffect } from "react";
import { useProjects } from "@/store/useProjectsStore";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const setProjects = useProjects((s) => s.setProjects);

  useEffect(() => {
    setProjects(projects);
  }, [setProjects]);

  return (
    <main >
      <Header />
      <section className={styles.section}>
      <ProjectsHeader />
      </section>
    </main>
  );
}