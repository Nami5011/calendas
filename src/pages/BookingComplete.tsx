import { useEffect, useState } from "react";
import DateTimeCard from "../components/DateTimeCard";
import { getSession, removeSession } from "../utils/session";
import { useLocation, useNavigate } from "react-router-dom";
import { parse } from "date-fns";
import check from "../images/check.svg";

function BookingComplete() {
	const navigate = useNavigate();
	const { state } = useLocation();
	console.log('state', state)
	const code = state.code || null as string | null;
	const date = state.date?.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) ? state.date : null;
	const parseDate = date ? parse(date, 'yyyy-MM-dd', new Date()) : null;
	var confirmation_message = state.confirmation_message || '' as string;
	if (state.name) {
		confirmation_message = confirmation_message.replace(/\[name\]/g, state.name || '');
	}
	if (state.email) {
		confirmation_message = confirmation_message.replace(/\[email\]/g, state.email || '');
	}
	if (!code) {
		console.error('no code');
		navigate('/');
	}

	// Init
	useEffect(() => {
		removeSession('event');
		removeSession('formInput');
	}, []);

	return (
		<div className="grid grid-cols-12 lg:grid-cols-8 gap-4">
			<div className="col-span-12 flex justify-center">
				<div className="mt-10 flex flex-col text-center items-center">
					<img src={check} className="svg-orange w-16 h-16" alt="timer" />
					<h1 className="text-2xl font-medium my-2">{state.title}</h1>
				</div>
			</div>
			<div className="mx-2 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<div className="w-full md:w-auto md:p-8 p-4 dark:bg-gray-600 md:dark:bg-gray-800 bg-gray-50 md:rounded">
					<div className="pt-3">
						<DateTimeCard parentProps={{ edit: false, parseDate: parseDate, start: state.start || '', end: state.end || '' }} />
						<p className="mx-2 whitespace-pre-wrap">{confirmation_message}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default BookingComplete;
