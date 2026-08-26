"use client";

import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";

export const ADMIN_FILTER_KEYS = {
	categories: "admin.filters.categories",
	subcategories: "admin.filters.subcategories",
	products: "admin.filters.products",
} as const;

const SESSION_FILTER_EVENT = "admin-session-filters-change";

function subscribe(onStoreChange: () => void) {
	window.addEventListener("storage", onStoreChange);
	window.addEventListener(SESSION_FILTER_EVENT, onStoreChange);

	return () => {
		window.removeEventListener("storage", onStoreChange);
		window.removeEventListener(SESSION_FILTER_EVENT, onStoreChange);
	};
}

function notifyFiltersChanged() {
	window.dispatchEvent(new Event(SESSION_FILTER_EVENT));
}

function readRaw(key: string) {
	try {
		return sessionStorage.getItem(key);
	} catch {
		return null;
	}
}

function parseFilters<T extends Record<string, string>>(raw: string | null, defaults: T): T {
	if (!raw) {
		return defaults;
	}

	try {
		const parsed = JSON.parse(raw) as Record<string, unknown>;
		const result = { ...defaults };

		for (const key of Object.keys(defaults) as Array<keyof T>) {
			const value = parsed[String(key)];
			if (typeof value === "string") {
				result[key] = value as T[keyof T];
			}
		}

		return result;
	} catch {
		return defaults;
	}
}

export function matchesText(value: string | null | undefined, query: string) {
	const term = query.trim().toLowerCase();
	if (!term) {
		return true;
	}

	return (value ?? "").toLowerCase().includes(term);
}

export function useSessionFilters<T extends Record<string, string>>(key: string, defaults: T) {
	const defaultsRef = useRef(defaults);
	defaultsRef.current = defaults;

	const getSnapshot = useCallback(() => readRaw(key), [key]);
	const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
	const applied = useMemo(() => parseFilters(raw, defaultsRef.current), [raw]);

	const apply = useCallback(
		(values: T) => {
			try {
				sessionStorage.setItem(key, JSON.stringify(values));
			} catch {
				// Ignore quota / private-mode failures.
			}
			notifyFiltersChanged();
		},
		[key],
	);

	const clear = useCallback(() => {
		try {
			sessionStorage.removeItem(key);
		} catch {
			// Ignore storage failures.
		}
		notifyFiltersChanged();
	}, [key]);

	return { applied, apply, clear };
}
