export type Event = {
	user_id: number;
	title: string;
	description: string | null;
	duration: number;
	confirmation_message: string;
	start_day_length: number;
	available_datetime: JSON | null;
	count: number | null;
	send_email_flg: number;
}