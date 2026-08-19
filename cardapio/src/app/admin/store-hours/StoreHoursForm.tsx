"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin-form.module.css";

const DAY_LABELS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

type DayHours = {
  dayOfWeek: number;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

type StoreHoursFormProps = {
  hours: DayHours[];
};

function buildInitialState(hours: DayHours[]): DayHours[] {
  return DAY_LABELS.map((_, i) => {
    const existing = hours.find((h) => h.dayOfWeek === i);
    return existing ?? { dayOfWeek: i, openTime: "08:00", closeTime: "18:00", isClosed: false };
  });
}

export function StoreHoursForm({ hours }: StoreHoursFormProps) {
  const router = useRouter();
  const [days, setDays] = useState<DayHours[]>(() => buildInitialState(hours));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateDay(index: number, patch: Partial<DayHours>) {
    setDays((prev) =>
      prev.map((d, i) => (i === index ? { ...d, ...patch } : d)),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/store-hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(days),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setError(data?.message ?? "Não foi possível salvar os horários.");
        return;
      }

      router.refresh();
    } catch {
      setError("Algo deu errado. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid} style={{ gridTemplateColumns: "1fr" }}>
        {days.map((day, index) => (
          <div
            key={day.dayOfWeek}
            style={{
              display: "grid",
              gridTemplateColumns: "10rem 1fr 1fr auto",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span className={styles.label} style={{ marginBottom: 0 }}>
              {DAY_LABELS[day.dayOfWeek]}
            </span>

            <input
              type="time"
              className={styles.input}
              value={day.openTime ?? ""}
              onChange={(e) => updateDay(index, { openTime: e.target.value || null })}
              disabled={submitting || day.isClosed}
            />

            <input
              type="time"
              className={styles.input}
              value={day.closeTime ?? ""}
              onChange={(e) => updateDay(index, { closeTime: e.target.value || null })}
              disabled={submitting || day.isClosed}
            />

            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.88rem", fontWeight: 600, color: "var(--mamute-blue)" }}>
              <input
                type="checkbox"
                checked={day.isClosed}
                onChange={(e) => updateDay(index, { isClosed: e.target.checked })}
                disabled={submitting}
              />
              Fechado
            </label>
          </div>
        ))}
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => router.push("/admin")}
          disabled={submitting}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? "Salvando…" : "Salvar"}
        </button>
      </div>
    </form>
  );
}
