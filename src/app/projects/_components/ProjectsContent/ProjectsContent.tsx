"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectsView from "./ProjectsView";
import styles from "./ProjectsContent.module.css";
import ProjectsSidebar from "./ProjectsSidebar/ProjectsSidebar";
import { useState } from "react";

export default function ProjectsContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <ProjectsView />
      </div>

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
    </section>
  );
}