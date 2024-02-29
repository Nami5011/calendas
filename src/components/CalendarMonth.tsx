import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameMonth, isToday, parse, startOfMonth, startOfToday, startOfWeek } from "date-fns";
import { useState } from "react";
import CalendarWeekHeader from "./CalendarWeekHeader";
import { classNames } from "../utils/cssClassName";

CalendarMonth.defaultProps = {
	parentProps: {
		selectedDay: null,
		set_selectedDay: () => { },
	},
}
type CalendarMonthProps = {
	parentProps: {
		selectedDay: Date | null;
		set_selectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
	}
}
function CalendarMonth({ parentProps }: CalendarMonthProps) {
	// const today = startOfToday();
	const [currentMonth, set_currentMonth] = useState(format(parentProps.selectedDay || startOfToday(), 'MMM-yyyy'));
	let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

	// List of days
	let newDays = eachDayOfInterval({
		start: startOfWeek(firstDayCurrentMonth),
		end: endOfWeek(endOfMonth(firstDayCurrentMonth))
	});

	var weeks = [] as any[];
	var weeksChild = [] as Date[];
	newDays.forEach((day, index) => {
		weeksChild.push(day);
		if ((index + 1) % 7 === 0) {
			weeks.push(weeksChild);
			weeksChild = [];
		}
	});

	const changeMonth = (moveNumber: number) => {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: moveNumber });
		set_currentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
	}

	const handleSelectDay = (day: Date) => {
		if (!isSameMonth(day, firstDayCurrentMonth)) {
			set_currentMonth(format(startOfMonth(day), 'MMM-yyyy'));
		}
		parentProps.set_selectedDay(day);
	}

	return (
		<>
			<div className="w-full md:w-auto md:p-8 p-4 dark:bg-gray-600 md:dark:bg-gray-800 bg-white md:rounded-l md:rounded-r-none">
				<div className="border-b pb-3 px-4 flex items-center justify-between">
					<span tabIndex={0} className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{format(firstDayCurrentMonth, 'MMM yyyy')}</span>
					<div className="flex items-center">
						<button onClick={() => changeMonth(-1)} aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
							<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="15 6 9 12 15 18" />
							</svg>
						</button>
						<button onClick={() => changeMonth(1)} aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100">
							<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>

					</div>
				</div>
				<div className="flex items-center justify-between pt-3 overflow-x-auto">
					<table className="w-full">
						<CalendarWeekHeader />
						<tbody>
							{weeks.map((week, weekIndex) => (
								<tr key={weekIndex.toString()}>
									{week.map((day: any, dayIndex: number) => (
										<td key={weekIndex.toString() + dayIndex.toString()}>
											<button
												onClick={() => handleSelectDay(day)}
												className={classNames(
													(parentProps.selectedDay && isEqual(day, parentProps.selectedDay)) && 'bg-[#7F27FF]',
													isToday(day) && "text-[#FF8911]",
													(!isToday(day) && !isEqual(day, parentProps.selectedDay || startOfToday()) && isSameMonth(day, firstDayCurrentMonth)) && "text-gray-500 dark:text-gray-100 hover:text-gray-100",
													(!isToday(day) && !isEqual(day, parentProps.selectedDay || startOfToday()) && !isSameMonth(day, firstDayCurrentMonth)) && "text-gray-300 dark:text-gray-500",
													(!isToday(day) && isEqual(day, parentProps.selectedDay || startOfToday())) && "text-white",
													(dayIndex !== 0 && dayIndex !== 6) && "font-medium",
													false && "ring-1 ring-[#7F27FF]",
													"p-1.5 m-0.5 mx-auto cursor-pointer flex justify-center items-center hover:bg-[#9F70FD] rounded-full"
												)}
											>
												<div className="text-base w-[24px] h-[24px] text-center">
													<time dateTime={format(day, 'yyyy-MM-dd')}>
														{format(day, 'd')}
													</time>
												</div>
											</button>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default CalendarMonth;
