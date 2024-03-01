import React, { useEffect, useState } from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
// import getCalenderList from '../models/calender';
// import { startOfToday } from 'date-fns';
import CalendarMonth from '../components/CalendarMonth';
import { format, parse } from 'date-fns';
import EventCard from '../components/EventCard';
import { removeSession, setSession } from '../utils/session';
import { classNames } from '../utils/cssClassName';

type TimeRange = {
	start: string;
	end: string;
}
type AvailableList = {
	[date: string]: TimeRange[];
};

function Calendar() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const code = queryString.get('code') as string | null;
	const date = queryString.get('date')?.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) ? queryString.get('date') : null;
	// calendar
	// const today = startOfToday();
	const [selectedDay, set_selectedDay] = useState<Date | null>(date ? parse(date, 'yyyy-MM-dd', new Date()) : null);
	const [availableTimeList, set_availableTimeList] = useState<Array<TimeRange> | null>(null);
	const availableList = {
		'2024-02-29': [
			{
				'start': '11:00',
				'end': '11:30',
			},
			{
				'start': '12:00',
				'end': '12:30',
			},
		],
		'2024-03-01': [
			{
				'start': '11:30',
				'end': '12:00',
			},
			{
				'start': '13:00',
				'end': '13:30',
			},
		]
	} as AvailableList;
	const event = {
		code: '123',
		title: 'Title',
		description: 'description here',
		duration: '30 minutes',
		confirmation_message: "Thanks [name],\nYou'll recieve a confirmation email shortly\nYour email address [email]",
	}

	// Init
	useEffect(() => {
		removeSession('event');
	}, []);

	// selectedDay change evebt
	useEffect(() => {
		if (!selectedDay) {
			set_availableTimeList(null);
			return;
		}
		let key = format(selectedDay, 'yyyy-MM-dd') as keyof AvailableList;
		set_availableTimeList(availableList[key] || null);
		console.log(availableList[key])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDay]);

	// navigate Confirm page
	const handleSelectTime = (time: TimeRange) => {
		let date = format(selectedDay || new Date(), 'yyyy-MM-dd');
		setSession('event', event);
		navigate(`/confirm?code=${code}&date=${date}&start=${time.start}&end=${time.end}`);
	}

	// const userLanguage = navigator.language;
	return (
		<div className="grid grid-cols-12 lg:grid-cols-8 gap-4">
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<EventCard parentProps={event} />
			</div>
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<div className="w-auto flex flex-wrap md:flex-nowrap items-stretch justify-center">
					<CalendarMonth parentProps={{ selectedDay: selectedDay, set_selectedDay: set_selectedDay }} />
					<div className="w-full lg:min-w-80 py-3 px-4 md:p-8 lg:px-12 dark:bg-gray-700 bg-gray-50 md:rounded-r md:rounded-l-none">
						<div className="px-2">
							{selectedDay &&
								<div className="border-b pb-4 border-gray-400 border-dashed text-center">
									<p className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">{format(selectedDay, 'EEEE, LLLL do')}</p>
								</div>
							}
							<div className={classNames("pb-4 pt-5 px-6 border-gray-400 border-dashed flex flex-col", selectedDay && "border-b")}>
								{!selectedDay &&
									<p className="text-center">Select a date</p>
								}
								{
									availableTimeList && availableTimeList.map((time, index) => (
										<button key={index} onClick={() => handleSelectTime(time)}
											className="px-4 py-3 my-2 dark:text-gray-50 font-semibold rounded-full
										dark:bg-[#7F27FF] border border-[#9F70FD] dark:border-[#7F27FF]
										hover:text-white hover:bg-[#7F27FF] dark:hover:bg-[#9F70FD] hover:border-transparent 
										focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
										>{time.start} - {time.end}</button>
									))
								}
								{(selectedDay && !availableTimeList) &&
									<p className="text-center">Try another day</p>
								}
							</div>
							{/* <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-50">10:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Orientation session with new hires</a>
							</div>
							<div className="border-b pb-4 border-gray-400 border-dashed pt-5">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-50">9:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
								<p className="text-sm pt-2 leading-none text-gray-600 dark:text-gray-50">Discussion on UX sprint and Wireframe review</p>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Calendar;
