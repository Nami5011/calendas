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
export async function getEvent(signal: AbortSignal | null, code: string) {
	const fetchdata = await fetch(`http://127.0.0.1:8000/api/v1/event?code=${code}`,
		{
			signal: signal,
		});
	let result = await fetchdata.json();
	// let result = fetchData();
	// console.log(result)
	return result;
}