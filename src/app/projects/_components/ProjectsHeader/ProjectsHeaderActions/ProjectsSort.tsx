"use client";

import { ArrowDownNarrowWide } from "lucide-react";
import Select from "@/components/ui/Select";
import { SortOptions, useProjects } from "@/store/useProjectsStore";

type SortItem = {
  value: string;
  label: string;
};

const SORT_ITEMS: SortItem[] = [
  { value: SortOptions.Alphabetical, label: "Orden alfabético" },
  { value: SortOptions.Incident, label: "Número de Incidencias" },
  { value: SortOptions.RFI, label: "Número de RFI" },
  { value: SortOptions.Task, label: "Número de Tareas" },
];

export default function ProjectsSort() {
  const currentSort = useProjects((state) => state.sort);
  const setSortOption = useProjects((state) => state.setSort);

  return (
    <Select
      items={SORT_ITEMS}
      value={String(currentSort)}
      onValueChange={(nextValue) => setSortOption(nextValue as SortOptions)}
      trigger={<ArrowDownNarrowWide size={18} aria-hidden="true" />}
      ariaLabel="Ordenar proyectos"
    />
  );
}