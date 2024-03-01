import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { getSession, setSession } from '../utils/session';
import EventCard from '../components/EventCard';
import { useState } from 'react';
import { parse } from 'date-fns';
import { isValidEmail, isValidRequiredInput } from '../utils/validations';
import DateTimeCard from '../components/DateTimeCard';
type FormInput = {
	name?: string | null;
	email?: string | null;
}
function Confirm() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const code = queryString.get('code') as string | null;
	const date = queryString.get('date')?.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) ? queryString.get('date') : null;
	const parseDate = date ? parse(date, 'yyyy-MM-dd', new Date()) : null;
	const start = queryString.get('start') as string | null;
	const end = queryString.get('end') as string | null;
	var editAddress = `/calendar?code=${code}`;
	if (date) editAddress += `&date=${date}`;
	const formInput = getSession('formInput') ? getSession('formInput') : null as FormInput | null;
	const [email, set_email] = useState(formInput?.email ? formInput.email : '');
	const [name, set_name] = useState(formInput?.name ? formInput.name : '');
	const [event, set_event] = useState(getSession('event') ? getSession('event') : null);
	if (!event) {
		set_event({
			code: '123',
			title: 'Title',
			description: 'description here',
			duration: '30 minutes',
			confirmation_message: "Thanks [name],\nYou'll recieve a confirmation email shortly\nYour email address [email]",
		});
	}
	const goBack = () => {
		setSession('formInput', {
			email: email,
			name: name,
		} as FormInput);
		navigate(editAddress);
	}

	const submitForm = () => {
		let state = {
			code: code,
			title: event.title,
			date: date,
			start: start,
			end: end,
			confirmation_message: event.confirmation_message,
			name: name,
			email: email,
		};
		navigate('/complete', { state });
	}

	return (
		<div className="grid grid-cols-12 lg:grid-cols-8 gap-4">
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<EventCard parentProps={event} />
			</div>
			<div className="mx-2 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<div className="w-full md:w-auto md:p-8 p-4 dark:bg-gray-600 md:dark:bg-gray-800 bg-gray-50 md:rounded">
					<div className="border-b pb-3 px-4 grid grid-cols-12">
						<div className="col-span-1 flex items-center">
							<button onClick={() => goBack()} aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<polyline points="15 6 9 12 15 18" />
								</svg>
							</button>
						</div>
						<span className="col-span-10 focus:outline-none text-base font-medium text-center
						 text-gray-800 dark:text-gray-100">Confim Booking</span>
					</div>
					<div className="pt-3">
						<DateTimeCard parentProps={{ edit: true, goBack: goBack, parseDate: parseDate, start: start, end: end }} />
						{/* Name */}
						<label className="mx-2">Name <span className="text-red-700">*</span></label>
						<input type="text" className="my-2 p-3 w-full border border-gray-500 text-black font-medium rounded-lg"
							value={name} onChange={e => set_name(e.target.value)} />
						{!isValidRequiredInput(name) && <div className="error text-red-700 dark:text-red-400">Name is required</div>}
						{/* Email */}
						<label className="mx-2">Email <span className="text-red-700">*</span></label>
						<input type="email" className="my-2 p-3 w-full border border-gray-500 text-black font-medium rounded-lg"
							value={email} onChange={e => set_email(e.target.value)} />
						{(email !== '' && !isValidEmail(email)) && <div className="error text-red-700 dark:text-red-400">Invalid email address</div>}
						{!isValidRequiredInput(email) && <div className="error text-red-700 dark:text-red-400">Email is required</div>}

						<div className="mt-4 flex flex-col md:flex-row-reverse md:justify-between font-medium">
							<button type="button" className="py-3 px-6 w-full md:w-auto my-1.5 cursor-pointer flex justify-center items-center
							text-white bg-[#7F27FF] hover:bg-[#9F70FD] rounded-lg"
								onClick={() => submitForm()}>Confirm Booking</button>
							<button type="button" className="py-3 px-6 w-full md:w-auto my-1.5 cursor-pointer flex justify-center items-center 
								border border-[#9F70FD] hover:bg-[#9F70FD] hover:text-white rounded-lg"
								onClick={() => goBack()}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Confirm;
