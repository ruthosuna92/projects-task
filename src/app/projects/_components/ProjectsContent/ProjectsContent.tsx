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
  const projectState = useProjects();
  const page = useProjects((s) => s.page);
  const setPage = useProjects((s) => s.setPage);
  const totalPages = selectTotalPages(projectState);
  const view = useProjects((s) => s.view);

  return (
    <section className={styles.container} data-view={view}>
      <div
        className={styles.main}
        data-sidebar-open={isSidebarOpen ? "true" : "false"}
      >
        <div className={styles.viewContainer}>
          <ProjectsView />
        </div>
        {isSidebarOpen && (
          <div
            className={styles.sidebarBackdrop}
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        <aside
          className={styles.sidebar}
          data-open={isSidebarOpen ? "true" : "false"}
        >
          <button
            type="button"
            className={styles.sidebarToggle}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            aria-label={isSidebarOpen ? "Cerrar resumen" : "Abrir resumen"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? (
              <ChevronRight size={18} aria-hidden="true" />
            ) : (
              <ChevronLeft size={18} aria-hidden="true" />
            )}
          </button>

          {isSidebarOpen ? <ProjectsSidebar /> : null}
        </aside>
      </div>

      <div className={styles.paginationWrapper}>
        <Pagination page={page} pageCount={totalPages} onPageChange={setPage} />
      </div>
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
