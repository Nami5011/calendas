import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
// import getCalenderList from '../models/calender';
// import { startOfToday } from 'date-fns';
import CalendarMonth from '../components/CalendarMonth';
import { addDays, endOfMonth, format, parse, startOfMonth, startOfToday } from 'date-fns';
import EventCard from '../components/EventCard';
import { removeSession, setSession } from '../utils/session';
import { classNames } from '../utils/cssClassName';
import { useQuery } from '@tanstack/react-query';
import { getAvailableList } from '../models/calendar';
import { type Event } from '../types/event';
import { getEvent } from '../models/event';
import { type TimeRange, type AvailableFlgList, type AvailableList } from '../types/calendar';

const SkeletonLoader: React.FC = () => {
	return (
		<div className="animate-pulse flex space-x-4">
			<div className="flex-1 space-y-6 py-1">
				<div className="space-y-3">
					<div className="h-2 py-7 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
					<div className="h-2 py-7 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
				</div>
			</div>
		</div>
	);
}
function Calendar() {
	const today = startOfToday();
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const code = queryString.get('code') || '' as string | '';
	// yyyy-MM-dd
	const date = queryString.get('date')?.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) ? queryString.get('date') : null;
	const [selectedDay, set_selectedDay] = useState<Date | null>(date ? parse(date, 'yyyy-MM-dd', new Date()) : null);
	const [monthlyAvailableTimeList, set_monthlyAvailableTimeList] = useState<AvailableList | null>(null);
	const [monthlyAvailableFlgList, set_monthlyAvailableFlgList] = useState<AvailableFlgList | null>(null);
	const [availableTimeList, set_availableTimeList] = useState<Array<TimeRange> | null>(null);
	const [event, set_event] = useState<Event | null>(null);
	const [selectedMonth, set_selectedMonth] = useState<Date>(selectedDay || today);

	const handleGetEventQuery = async (signal: AbortSignal) => {
		// console.log('called get event', code)
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

	// Init
	useEffect(() => {
		removeSession('event');
		getEventQuery.refetch();
		availableListQuery.refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// available days list query
	const availableListQuery = useQuery({
		queryKey: ['availableList' + format(startOfMonth(selectedMonth), 'yyyy-MM-dd') + format(endOfMonth(selectedMonth), 'yyyy-MM-dd')],
		queryFn: ({ signal }) => handleGetAvailableList(signal),
		staleTime: 1000 * 60 * 10, //fetch again after 10 minutes
		enabled: false,
	});

	// set available days list
	const handleGetAvailableList = async (signal: AbortSignal) => {
		let start = format(startOfMonth(selectedMonth), 'yyyy-MM-dd');
		let end = format(endOfMonth(selectedMonth), 'yyyy-MM-dd');
		let newAvailableList = await getAvailableList(signal, code, start, end) || null as AvailableList | null;
		set_monthlyAvailableTimeList(newAvailableList);
		handleSetmonthlyAvailableFlgList(newAvailableList);
		let prevAvailableList = monthlyAvailableTimeList ? monthlyAvailableTimeList : [];
		newAvailableList = newAvailableList ? newAvailableList : [];
		handleAvailableTimeList([...prevAvailableList, ...newAvailableList]);
		return newAvailableList;
	}

	// set available time list
	const handleAvailableTimeList = (newAvailableList: AvailableList | null) => {
		if (!selectedDay || !newAvailableList) {
			set_availableTimeList(null);
			return;
		}
		let formatDate = format(selectedDay, 'yyyy-MM-dd') as keyof AvailableList;
		// console.log('formatDate', formatDate)
		// console.log('newAvailableList', newAvailableList)
		let newTimeList = newAvailableList.find((obj) => {
			return obj.date === formatDate
		})?.availableTimeList;
		set_availableTimeList(newTimeList && newTimeList.length > 0 ? newTimeList : null);
	}

	// selectedDay change event
	useEffect(() => {
		handleAvailableTimeList(monthlyAvailableTimeList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDay]);

	// selectedMonth change event
	useEffect(() => {
		availableListQuery.refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedMonth]);

	// navigate Confirm page
	const handleSelectTime = (time: TimeRange) => {
		let date = format(selectedDay || new Date(), 'yyyy-MM-dd');
		setSession('event', event || {});
		navigate(`/confirm?code=${code}&date=${date}&start=${time.start}&end=${time.end}`);
	}

	const handleSetmonthlyAvailableFlgList = (newMonthlyAvailableTimeList: AvailableList | null) => {
		let flgList = null;
		if (newMonthlyAvailableTimeList) {
			flgList = newMonthlyAvailableTimeList.map((obj) => {
				return {
					date: obj.date,
					isAvailable: obj.availableTimeList && obj.availableTimeList.length > 0 ? true : false,
				}
			});
		}
		set_monthlyAvailableFlgList(flgList);
	}

	// const userLanguage = navigator.language;
	return (
		<div className="grid grid-cols-12 lg:grid-cols-8 gap-4">
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<EventCard parentProps={event} isLoading={getEventQuery.isFetching} />
			</div>
			<div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-4">
				<div className="w-auto flex flex-wrap md:flex-nowrap items-stretch justify-center">
					<CalendarMonth
						parentProps={{
							selectedDay: selectedDay,
							set_selectedDay: set_selectedDay,
							selectedMonth: selectedMonth,
							set_selectedMonth: set_selectedMonth,
							selectableStartDay: addDays(today, event?.start_day_length || 0),
							monthlyAvailableFlgList: monthlyAvailableFlgList,
						}}
					/>
					<div className="w-full lg:min-w-80 py-3 px-4 md:p-8 lg:px-12 dark:bg-gray-700 bg-gray-50 md:rounded-r md:rounded-l-none">
						<div className="px-2">
							{selectedDay &&
								<div className="border-b pb-4 border-gray-400 border-dashed text-center">
									<p className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">{format(selectedDay, 'EEEE, LLLL do')}</p>
								</div>
							}
							<div className={classNames("pb-4 pt-5 px-6 border-gray-400 border-dashed flex flex-col", selectedDay && "border-b")}>
								{(!availableListQuery.isFetching && !selectedDay) &&
									<p className="text-center">Select a date</p>
								}
								{
									availableListQuery.isFetching && <SkeletonLoader />
								}
								{
									(!availableListQuery.isFetching && availableTimeList) && availableTimeList.map((time, index) => (
										<button
											key={index} onClick={() => handleSelectTime(time)}
											disabled={getEventQuery.isFetching}
											className="px-4 py-3 my-2 dark:text-gray-50 font-semibold rounded-full
										dark:bg-[#7F27FF] border border-[#9F70FD] dark:border-[#7F27FF]
										hover:text-white hover:bg-[#7F27FF] dark:hover:bg-[#9F70FD] hover:border-transparent 
										focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:bg-gray-700"
										>{time.start} - {time.end}</button>
									))
								}
								{(!availableListQuery.isFetching && selectedDay && !availableTimeList) &&
									<p className="text-center">Try another day</p>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Calendar;
