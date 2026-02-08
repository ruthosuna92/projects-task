"use client";

import { useMemo, useState } from "react";
import { Filter, Presentation, Clock } from "lucide-react";

import { useProjects } from "@/store/useProjectsStore";
import styles from "./ProjectsSidebar.module.css";
import Ring from "@/components/ui/Ring";
import { toPercent } from "@/lib/numberUtils";

type TabKey = "general" | "updates";

type ExpiringRow = {
  projectName: string;
  itemLabel: string;
  itemCount: number;
  dueLabel: string;
};

const formatDueLabel = (dateLabel?: string) => {
  if (!dateLabel) return "—";
  return dateLabel;
};

const getMainExpiringItem = (incidents: number, rfi: number, tasks: number) => {
  const entries = [
    { key: "Incidencia", value: incidents },
    { key: "RFI", value: rfi },
    { key: "Tarea", value: tasks },
  ];

  entries.sort((a, b) => b.value - a.value);
  return entries[0];
};

export default function ProjectsSidebar() {
  const [activeTab, setActiveTab] = useState<TabKey>("general");

  const projectsById = useProjects((s) => s.projectsById);
  const projectsIds = useProjects((s) => s.projectsIds);

 const { totals, expiringRows } = useMemo(() => {
  const projects = projectsIds
    .map((id) => projectsById[id])
    .filter(Boolean);

  const initial = {
    totals: { incidents: 0, rfi: 0, tasks: 0 },
    rows: [] as ExpiringRow[],
  };

  const result = projects.reduce((acc, project) => {
    const incidents = project.expiringItems?.incidents ?? 0;
    const rfi = project.expiringItems?.rfi ?? 0;
    const tasks = project.expiringItems?.tasks ?? 0;

    const mainItem = getMainExpiringItem(incidents, rfi, tasks);
    const totalForProject = incidents + rfi + tasks;

    const nextRow: ExpiringRow = {
      projectName: project.name,
      itemLabel: mainItem.key,
      itemCount: totalForProject,
      dueLabel: formatDueLabel(project.lastUpdated),
    };

    return {
      totals: {
        incidents: acc.totals.incidents + incidents,
        rfi: acc.totals.rfi + rfi,
        tasks: acc.totals.tasks + tasks,
      },
      rows: [...acc.rows, nextRow],
    };
  }, initial);

  const sortedRows = [...result.rows].sort((a, b) => b.itemCount - a.itemCount);

  return {
    totals: result.totals,
    expiringRows: sortedRows.slice(0, 3),
  };
}, [projectsById, projectsIds]);

  const totalAll = totals.incidents + totals.rfi + totals.tasks;

  const metricCards = [
    { label: "Incidencias", value: totals.incidents },
    { label: "RFI", value: totals.rfi },
    { label: "Tareas", value: totals.tasks },
  ];

  return (
    <div className={styles.sidebar}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Presentation size={18} aria-hidden="true" />
          <h2 className={styles.title}>Resumen</h2>
        </div>

        <button type="button" className={styles.filtersButton}>
          <Filter size={16} aria-hidden="true" />
          <span>Filtros</span>
        </button>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Resumen">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "general"}
          className={styles.tab}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "updates"}
          className={styles.tab}
          onClick={() => setActiveTab("updates")}
        >
          Mis actualizaciones
        </button>
      </div>

      {activeTab === "general" ? (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <Clock size={16} aria-hidden="true" />
                <h3 className={styles.sectionTitle}>Próximos a vencer</h3>
              </div>

              <button type="button" className={styles.linkButton}>
                Ver todos
              </button>
            </div>

            <div className={styles.metrics}>
              {metricCards.map((card) => {
                const percent = toPercent(card.value, totalAll);
                return (
                  <div key={card.label} className={styles.metricCard}>
                    <div className={styles.metricTop}>
                      <div className={styles.metricLabel}>{card.label}</div>
                      <div className={styles.metricValue}>{card.value}</div>
                      <div className={styles.metricSub}>Total Abiertas</div>
                    </div>

                     <Ring value={card.value} percent={percent} label={card.label} />
                  </div>
                );
              })}
            </div>

            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>Proyecto</span>
                <span>Item</span>
                <span>Fecha Límite</span>
              </div>

              <div className={styles.tableBody}>
                {expiringRows.map((row) => (
                  <div key={row.projectName} className={styles.tableRow}>
                    <div className={styles.projectCell}>
                      <div className={styles.projectName}>{row.projectName}</div>
                      <div className={styles.projectSub}>Revisar reportes del mié...</div>
                    </div>

                    <div className={styles.itemCell}>{row.itemLabel}</div>

                    <div className={styles.dueCell}>
                      <div className={styles.dueDate}>{row.dueLabel}</div>
                      <div className={styles.dueTime}>15:00</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <h3 className={styles.sectionTitle}>Próximos eventos</h3>
              </div>

              <button type="button" className={styles.linkButton}>
                Ver todos
              </button>
            </div>

            <div className={styles.placeholder}>
              <div className={styles.placeholderRow}>
                <span>Proyecto uno</span>
                <span className={styles.placeholderMeta}>15:00</span>
              </div>
              <div className={styles.placeholderRow}>
                <span>Proyecto dos</span>
                <span className={styles.placeholderMeta}>18:30</span>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Mis actualizaciones</h3>
          <div className={styles.placeholder}>Estas son las actualizaciones</div>
        </section>
      )}
    </div>
  );
}