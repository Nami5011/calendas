// function fetchData() {
// 	const data = {
// 		code: '123',
// 		title: 'Meeting',
// 		description: 'description here',
// 		duration: '30 minutes',
// 		confirmation_message: "Thanks [name],\nYou'll recieve a confirmation email shortly\nYour email address [email]",
// 		start_day_length: 2,
// 	};
// 	return data;
// }

import axios from "axios";
import { type Event } from '../types/event';

export async function getEvent(signal: AbortSignal, code: string): Promise<Event | null> {
	try {
		const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/event?code=${code}`,
			{
				signal: signal,
			});
		return data as Event;
	} catch (error) {
		console.error('error', error)
		return null;
	}
}
