import styles from "./Ring.module.css";
import { clampNumber } from "@/lib/numberUtils";

type RingProps = {
  value: number;
  percent: number; 
  label?: string;
  size?: number; 
};

export default function Ring({ value, percent, label, size = 44 }: RingProps) {
  const safePercent = clampNumber(percent, 0, 100);

  return (
    <div className={styles.ringWrap} aria-label={label}>
      <div
        className={styles.ring}
        style={{ ["--percentage" as string]: String(safePercent), width: size, height: size }}
        aria-hidden="true"
      >
        <div className={styles.inner}>
          <span className={styles.value}>{value}</span>
        </div>
      </div>
    </div>
  );
}