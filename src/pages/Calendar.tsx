import React, { useState } from 'react';
import '../App.css';
import { useLocation, useParams } from 'react-router-dom';
// import getCalenderList from '../models/calender';
// import { startOfToday } from 'date-fns';
import CalendarMonth from '../components/CalendarMonth';

// type Post = {
// 	message: string
// }
type Params = {
	userCode: string
}
// type OauthUrl = {
// 	url: string
// }
function Calendar() {
	const params = useParams<Params>();
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
		<div className="App">
			<header>
				<p>
					Calender {params.userCode}
				</p>
			</header>
			<div className="w-full py-8">

				<div className="w-auto flex flex-wrap md:flex-nowrap items-stretch justify-center">
					<CalendarMonth parentProps={{ selectedDay: selectedDay, set_selectedDay: set_selectedDay }} />
					<div className="w-full md:w-auto md:py-8 py-5 md:px-16 px-4 dark:bg-gray-700 bg-gray-50 md:rounded-r md:rounded-l-none">
						<div className="px-4">
							<div className="border-b pb-4 border-gray-400 border-dashed">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
								<p className="text-sm pt-2 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
							</div>
							<div className="border-b pb-4 border-gray-400 border-dashed pt-5">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">10:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Orientation session with new hires</a>
							</div>
							<div className="border-b pb-4 border-gray-400 border-dashed pt-5">
								<p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
								<a href="https://tailwindcomponents.com" tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
								<p className="text-sm pt-2 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Calendar;
