"use client";

import { List, Grid2x2, MapPin } from "lucide-react";
import { useProjects, ViewOptions } from "@/store/useProjectsStore";
import styles from "./ProjectsViewToggle.module.css";


export default function ProjectsViewToggle() {
  const currentView = useProjects((state) => state.view);
  const setView = useProjects((state) => state.setView);

  return (
    <div className={styles.viewToggle} role="group" aria-label="Cambiar vista de proyectos">
      <button
        type="button"
        aria-pressed={currentView === ViewOptions.Table}
        onClick={() => setView(ViewOptions.Table)}
        className={styles.viewToggleButton}
      >
        <List size={18} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-pressed={currentView === ViewOptions.Grid}
        onClick={() => setView(ViewOptions.Grid)}
        className={styles.viewToggleButton}
      >
        <Grid2x2 size={18} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-pressed={currentView === ViewOptions.Map}
        onClick={() => setView(ViewOptions.Map)}
        className={styles.viewToggleButton}
      >
        <MapPin size={18} aria-hidden="true" />
      </button>
    </div>
  );
}