export type TimeRange = {
	start: string;
	end: string;
}

export type AvailableList = {
	date: string; // Date in YYYY-MM-DD format
	availableTimeList: TimeRange[];
}[];

export type AvailableFlgList = {
	date: string; // Date in YYYY-MM-DD format
	isAvailable: boolean;
}[];
