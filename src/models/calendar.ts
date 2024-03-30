import { type CreateGoogleEvent } from "../types/googleCalendar";

export async function getCalendarList() {
	try {
		const response = await fetch('https://calendas-api.fly.dev/post-hello',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: 'success' }),
			});
		const post = await response.json();
		console.log(post);
		return post;
	} catch (e: any) {
		return e;
	}
}

// function fetchData() {
// 	const data = [
// 		{
// 			date: '2024-03-28',
// 			availableTimeList: [
// 				{
// 					start: '11:00',
// 					end: '11:30',
// 				},
// 				{
// 					start: '12:00',
// 					end: '12:30',
// 				},
// 			],
// 		},
// 		{
// 			date: '2024-03-29',
// 			availableTimeList: [
// 				{
// 					start: '11:30',
// 					end: '12:00',
// 				},
// 				{
// 					start: '13:00',
// 					end: '13:30',
// 				},
// 			],
// 		},
// 	];
// 	return data;
// }
export async function getAvailableList(signal: AbortSignal | null, code: string, start: string, end: string) {
	const fetchdata = await fetch(process.env.REACT_APP_API_URI + '/api/v1/googleCalendarList',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				event_code: code,
				timeMin: start,
				timeMax: end,
			}),
			signal: signal,
		});
	const data = await fetchdata.json();
	// let result = fetchData();
	return data;
}

export async function createEvent(signal: AbortSignal, googleEvent: CreateGoogleEvent) {
	const fetchdata = await fetch(process.env.REACT_APP_API_URI + '/api/v1/googleCalendar',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(googleEvent),
			signal: signal,
		});
	const data = await fetchdata.json();
	return data;
}
