import React, { useState } from 'react';
import '../App.css';
import { useLocation, useParams } from 'react-router-dom';
// import getCalenderList from '../models/calender';
// import { startOfToday } from 'date-fns';
import CalendarMonth from '../components/CalendarMonth';
import timer from '../images/timer.svg';

// type Post = {
// 	message: string
// }
// type Params = {
// 	userCode: string
// }
// type OauthUrl = {
// 	url: string
// }
function Calendar() {
	// const params = useParams<Params>();
	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const code = queryString.get('code') as string | null;
	console.log('params', code)
	// calendar
	// const today = startOfToday();
	const [selectedDay, set_selectedDay] = useState<Date | null>(null);

	// const userLanguage = navigator.language;
	// console.log('userLanguage', userLanguage)
	return (
		<div className="grid grid-cols-12 lg:grid-cols-8 gap-4">
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<div className="mx-2 mt-4 p-3 md:mt-8 md:px-8 bg-[#FDBF60] dark:bg-gray-700 rounded-r border-l-4 border-[#FF8911] text-gray-900 dark:text-gray-50">
					<h1 className='text-2xl font-semibold'>Title</h1>
					<p>description</p>
					<span className="inline-flex">
						<img src={timer} className="svg-black dark:svg-white mr-1 " alt="timer" />
						<span>30 minutes</span>
					</span>
				</div>
			</div>
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<div className="w-auto flex flex-wrap md:flex-nowrap items-stretch justify-center">
					<CalendarMonth parentProps={{ selectedDay: selectedDay, set_selectedDay: set_selectedDay }} />
					<div className="w-full md:w-auto md:py-8 py-5 md:px-16 px-4 dark:bg-gray-700 bg-gray-50 md:rounded-r md:rounded-l-none">
						<div className="px-4">
							<div className="border-b pb-4 border-gray-400 border-dashed">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-50">9:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
								<p className="text-sm pt-2 leading-none text-gray-600 dark:text-gray-50">Discussion on UX sprint and Wireframe review</p>
							</div>
							<div className="border-b pb-4 border-gray-400 border-dashed pt-5">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-50">10:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Orientation session with new hires</a>
							</div>
							<div className="border-b pb-4 border-gray-400 border-dashed pt-5">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-50">9:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
								<p className="text-sm pt-2 leading-none text-gray-600 dark:text-gray-50">Discussion on UX sprint and Wireframe review</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Calendar;
