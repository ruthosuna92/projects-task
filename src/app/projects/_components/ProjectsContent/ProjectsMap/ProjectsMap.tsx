"use client";

import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./ProjectsMap.module.css";
import { useProjects } from "@/store/useProjectsStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

export default function ProjectsMap() {
  const selectedProjectId = useProjects((s) => s.selectedProjectId);
  const projectsById = useProjects((s) => s.projectsById);

  const selectedProject = useMemo(() => {
    return selectedProjectId ? projectsById[selectedProjectId] ?? null : null;
  }, [projectsById, selectedProjectId]);

  const lat = selectedProject?.location?.lat ?? null;
  const lng = selectedProject?.location?.lng ?? null;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    if (!mapboxgl.accessToken) return;

    const initialCenter: [number, number] = [lng ?? 0, lat ?? 0];

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style:
        process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
      center: initialCenter,
      zoom: 9,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;

      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (lat == null || lng == null) {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    const nextCenter: [number, number] = [lng, lat];

    map.flyTo({
      center: nextCenter,
      zoom: 12,
      essential: true,
    });

    if (!markerRef.current) {
      markerRef.current = new mapboxgl.Marker().setLngLat(nextCenter).addTo(map);
    } else {
      markerRef.current.setLngLat(nextCenter);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.overlay}>
        <div className={styles.title}>
          {selectedProject ? selectedProject.name : "Selecciona un proyecto"}
        </div>

        <div className={styles.coords}>
          {lat != null && lng != null ? (
            <>
              <span>Lat: {lat}</span>
              <span>Lng: {lng}</span>
            </>
          ) : (
            <span>Sin coordenadas</span>
          )}
        </div>
      </div>

      <div ref={containerRef} className={styles.map} aria-label="Mapa" />
    </div>
  );
}