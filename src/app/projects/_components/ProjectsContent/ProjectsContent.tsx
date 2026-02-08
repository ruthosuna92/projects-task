"use client";

import { ChevronLeft, ChevronRight, Presentation } from "lucide-react";
import ProjectsView from "./ProjectsView";
import styles from "./ProjectsContent.module.css";
import ProjectsSidebar from "./ProjectsSidebar/ProjectsSidebar";
import { useState } from "react";

import Pagination from "@/components/ui/Pagination";
import { useProjects } from "@/store/useProjectsStore";
import { selectTotalPages } from "@/lib/projectSelectors/projectSelectors";

export default function ProjectsContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const projectState = useProjects()
  const page = useProjects((s) => s.page);
  const setPage = useProjects((s) => s.setPage);
  const totalPages = selectTotalPages(projectState);

  return (
    <section className={styles.container} data-sidebar-open={isSidebarOpen ? "true" : "false"}>
      <div className={styles.main}>
        <ProjectsView />

        <div className={styles.paginationWrapper}>
          <Pagination page={page} pageCount={totalPages} onPageChange={setPage} />
        </div>
      </div>

      <aside className={styles.sidebar} data-open={isSidebarOpen ? "true" : "false"}>
        <button
          type="button"
          className={styles.sidebarToggle}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          aria-label={isSidebarOpen ? "Cerrar resumen" : "Abrir resumen"}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <ChevronRight size={18} aria-hidden="true" /> : <ChevronLeft size={18} aria-hidden="true" />}
        </button>

        {isSidebarOpen ? <ProjectsSidebar /> : null}
      </aside>
       {!isSidebarOpen && (
    <button
      type="button"
      className={styles.sidebarTab}
      onClick={() => setIsSidebarOpen(true)}
      aria-label="Abrir resumen"
    >
      <Presentation size={18} />
    </button>
  )}
    </section>
  );
}