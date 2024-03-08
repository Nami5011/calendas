export type CreateGoogleEvent = {
	event_code: string;
	summary: string;
	startDateTime: string;
	endDateTime: string;
	timeZone: string;
	description?: string;
	location?: string;
	attendeeEmailList: Array<string>;
}