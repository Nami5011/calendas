import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { getSession, setSession } from '../utils/session';
import EventCard from '../components/EventCard';
import { useEffect, useRef, useState } from 'react';
import { parse } from 'date-fns';
import DateTimeCard from '../components/DateTimeCard';
import Input from '../components/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { type CreateGoogleEvent } from '../types/googleCalendar';
import { createEvent } from '../models/calendar';
import { useQuery } from '@tanstack/react-query';
import { getEvent } from '../models/event';
import { type Event } from '../types/event';
type FormInput = {
	name?: string | null;
	email?: string | null;
}
function Confirm() {
	const methods = useForm();
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const code = queryString.get('code') as string | '';
	const date = queryString.get('date')?.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) ? queryString.get('date') : null;
	const parseDate = date ? parse(date, 'yyyy-MM-dd', new Date()) : null;
	const start = queryString.get('start') as string | null;
	const end = queryString.get('end') as string | null;

	const [event, set_event] = useState<Event | null>(getSession('event') ? getSession('event') : null);
	const handleGetEventQuery = async (signal: AbortSignal) => {
		console.log('called get event')
		let newEvent = await getEvent(signal, code);
		if (!newEvent) {
			navigate('/notFound');
			return newEvent;
		}
		set_event(newEvent);
		return newEvent;
	}
	// get event query
	const getEventQuery = useQuery({
		queryKey: ['event' + code],
		queryFn: ({ signal }) => handleGetEventQuery(signal),
		staleTime: 1000 * 60 * 10, //fetch again after 10 minutes
		enabled: false,
	});

	useEffect(() => {
		// set form value
		let formInput = getSession('formInput') ? getSession('formInput') : null as FormInput | null;
		methods.setValue('name', formInput?.name ? formInput.name : '');
		methods.setValue('email', formInput?.email ? formInput.email : '');
		// get event
		if (!event) {
			getEventQuery.refetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const goBack = () => {
		if (googleEventQuery.isLoading) return;

		let editAddress = `/calendar?code=${code}`;
		if (date) editAddress += `&date=${date}`;

		setSession('formInput', {
			email: methods.getValues('email'),
			name: methods.getValues('name'),
		} as FormInput);
		navigate(editAddress);
	}

	// Google Create Event
	const googleEvent = useRef<CreateGoogleEvent | null>(null);
	const googleEventQuery = useQuery({
		queryKey: ['availableList'],
		queryFn: ({ signal }) => googleEvent.current && createEvent(signal, googleEvent.current),
		// staleTime: 1000 * 60 * 10, //fetch again after 10 minutes
		enabled: false, // Not to call on first render
	});

	const onSubmit = methods.handleSubmit(async (data) => {
		// Create Google Calendar Event
		googleEvent.current = {
			event_code: code,
			summary: event?.title,
			startDateTime: `${date} ${start}`,
			endDateTime: `${date} ${end}`,
			timeZone: 'Asia/Tokyo',
			description: `Meeting with ${data.name}`,
			location: 'Online',
			attendeeEmailList: [data.email],
		} as CreateGoogleEvent;
		const resultGoogleEventQuery = await googleEventQuery.refetch();
		// Created Google Calendar Event result
		const result = await resultGoogleEventQuery.data;
		if (resultGoogleEventQuery.isError) {
			console.error(resultGoogleEventQuery.error);
			return;
		}
		console.log('result', result);
		let state = {
			code: code,
			title: event?.title,
			date: date,
			start: start,
			end: end,
			confirmation_message: event?.confirmation_message,
			name: data.name,
			email: data.email,
		};
		navigate('/complete', { state });
	});

	return (
		<div className="grid grid-cols-12 lg:grid-cols-8 gap-4">
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<EventCard parentProps={event} isLoading={getEventQuery.isFetching} />
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
					<FormProvider {...methods}>
						<form className="pt-3"
							onSubmit={e => e.preventDefault()}
							noValidate
						>
							<DateTimeCard parentProps={{ edit: true, goBack: goBack, parseDate: parseDate, start: start, end: end }} />
							<Input label="Name" name="name" type="text" id="name" maxLength={30}
								validation={{
									required: {
										value: true,
										message: 'required',
									},
								}}
							/>
							<Input label="Email" name="email" type="email" id="email" maxLength={254}
								validation={{
									required: {
										value: true,
										message: 'required',
									},
								}}
							/>
							<div className="mt-4 flex flex-col md:flex-row-reverse md:justify-between font-medium">
								<button
									className="py-3 px-6 w-full md:w-auto my-1.5 cursor-pointer flex justify-center items-center
									text-white bg-[#7F27FF] hover:bg-[#9F70FD] rounded-lg disabled:opacity-75"
									onClick={() => onSubmit()} disabled={googleEventQuery.isLoading}
								>
									{googleEventQuery.isLoading &&
										<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
									}
									Confirm Booking
								</button>
								<button type="button"
									className="py-3 px-6 w-full md:w-auto my-1.5 cursor-pointer flex justify-center items-center 
									border border-[#9F70FD] hover:bg-[#9F70FD] hover:text-white rounded-lg disabled:opacity-75"
									disabled={googleEventQuery.isLoading}
									onClick={() => goBack()}
								>Cancel</button>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}

export default Confirm;
