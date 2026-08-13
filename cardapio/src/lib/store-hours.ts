type StoreHoursRow = {
	dayOfWeek: number;
	openTime: string | null;
	closeTime: string | null;
	isClosed: boolean;
};

export type StoreHoursDisplayGroup = {
	label: string;
	hours: string;
};

const DAY_NAMES = [
	"Domingo",
	"Segunda",
	"Terça",
	"Quarta",
	"Quinta",
	"Sexta",
	"Sábado",
] as const;

const DAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

/** Seg–Sex, Sábado, Domingo */
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

function scheduleKey(row: StoreHoursRow) {
	return `${row.isClosed}|${row.openTime ?? ""}|${row.closeTime ?? ""}`;
}

function formatDayRange(start: number, end: number) {
	if (start === end) {
		if (start === 6) return "Sábado";
		if (start === 0) return "Domingo";
		return DAY_NAMES[start];
	}

	if (start === 1 && end === 5) return "Seg–Sex";

	return `${DAY_SHORT[start]}–${DAY_SHORT[end]}`;
}

export function formatStoreTime(time: string) {
	const [hours, minutes] = time.split(":");
	const hour = parseInt(hours, 10);

	if (!minutes || minutes === "00") {
		return `${hour}h`;
	}

	return `${hour}h${minutes}`;
}

export function formatHoursRange(openTime: string, closeTime: string) {
	return `${formatStoreTime(openTime)} – ${formatStoreTime(closeTime)}`;
}

export function groupStoreHoursForDisplay(
	hours: StoreHoursRow[],
): StoreHoursDisplayGroup[] {
	const byDay = new Map(hours.map((row) => [row.dayOfWeek, row]));
	const groups: StoreHoursDisplayGroup[] = [];

	let index = 0;

	while (index < DISPLAY_ORDER.length) {
		const startDay = DISPLAY_ORDER[index];
		const startRow = byDay.get(startDay);

		if (!startRow) {
			index += 1;
			continue;
		}

		const key = scheduleKey(startRow);
		let endIndex = index;

		while (endIndex + 1 < DISPLAY_ORDER.length) {
			const nextDay = DISPLAY_ORDER[endIndex + 1];
			const nextRow = byDay.get(nextDay);

			if (!nextRow || scheduleKey(nextRow) !== key) {
				break;
			}

			endIndex += 1;
		}

		const endDay = DISPLAY_ORDER[endIndex];
		const label = formatDayRange(startDay, endDay);

		const hoursLabel = startRow.isClosed
			? "Fechado"
			: startRow.openTime && startRow.closeTime
				? formatHoursRange(startRow.openTime, startRow.closeTime)
				: "—";

		groups.push({ label, hours: hoursLabel });
		index = endIndex + 1;
	}

	return groups;
}

function parseTimeToMinutes(time: string) {
	const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
	return hours * 60 + (minutes || 0);
}

export function isStoreOpenNow(hours: StoreHoursRow[], now = new Date()) {
	const today = hours.find((row) => row.dayOfWeek === now.getDay());

	if (!today || today.isClosed || !today.openTime || !today.closeTime) {
		return false;
	}

	const currentMinutes = now.getHours() * 60 + now.getMinutes();
	const openMinutes = parseTimeToMinutes(today.openTime);
	const closeMinutes = parseTimeToMinutes(today.closeTime);

	return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}
