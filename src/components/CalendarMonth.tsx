import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isBefore, isEqual, isSameMonth, isToday, startOfMonth, startOfToday, startOfWeek } from "date-fns";
import CalendarWeekHeader from "./CalendarWeekHeader";
import { classNames } from "../utils/cssClassName";
import { type AvailableFlgList } from "../types/calendar";

CalendarMonth.defaultProps = {
	parentProps: {
		selectedDay: null,
		set_selectedDay: () => { },
		selectableStartDay: startOfToday(),
	},
}
type CalendarMonthProps = {
	parentProps: {
		selectedDay: Date | null;
		set_selectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
		selectedMonth: Date;
		set_selectedMonth: React.Dispatch<React.SetStateAction<Date>>;
		selectableStartDay: Date;
		monthlyAvailableFlgList: AvailableFlgList | null;
	}
}
type WeeksChild = {
	day: Date;
	checkFlg: boolean;
}
function CalendarMonth({ parentProps }: CalendarMonthProps) {
	let firstDayCurrentMonth = startOfMonth(parentProps.selectedMonth);
	// List of days
	let newDays = eachDayOfInterval({
		start: startOfWeek(firstDayCurrentMonth),
		end: endOfWeek(endOfMonth(firstDayCurrentMonth))
	});

	var weeks = [] as any[];
	var weeksChild = [] as WeeksChild[];
	newDays.forEach((day, index) => {
		let dayString = format(day, 'yyyy-MM-dd');
		let availableFlg = parentProps.monthlyAvailableFlgList?.find((obj) => {
			return obj.date === dayString;
		})?.isAvailable;
		weeksChild.push({ day: day, checkFlg: availableFlg || false });
		if ((index + 1) % 7 === 0) {
			weeks.push(weeksChild);
			weeksChild = [];
		}
	});

	const changeMonth = (moveNumber: number) => {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: moveNumber });
		parentProps.set_selectedMonth(firstDayNextMonth);
	}

	const handleSelectDay = (day: Date) => {
		if (isBefore(day, parentProps.selectableStartDay)) return;
		if (!isSameMonth(day, firstDayCurrentMonth)) {
			parentProps.set_selectedMonth(startOfMonth(day));
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
									{week.map(({ day, checkFlg }: WeeksChild, dayIndex: number) => (
										<td key={weekIndex.toString() + dayIndex.toString()}>
											<button
												onClick={() => handleSelectDay(day)}
												className={classNames(
													isToday(day) && "underline underline-offset-4 decoration-[#FF8911]", // Underbar for today
													(parentProps.selectedDay && isEqual(day, parentProps.selectedDay)) && 'bg-[#7F27FF] text-white', // Selected day
													(isSameMonth(day, firstDayCurrentMonth) && !isBefore(day, parentProps.selectableStartDay)) && "text-gray-500 dark:text-gray-100", // Selectable day in the month
													(!isSameMonth(day, firstDayCurrentMonth) || isBefore(day, parentProps.selectableStartDay)) && "text-gray-300 dark:text-gray-500", // Other month or Before available day
													!isBefore(day, parentProps.selectableStartDay) && "hover:bg-[#9F70FD] hover:text-gray-100", // Selectable day
													(dayIndex !== 0 && dayIndex !== 6) && "font-medium", // Weekend
													(isSameMonth(day, firstDayCurrentMonth) && !isBefore(day, parentProps.selectableStartDay) && checkFlg) && "ring-1 ring-[#9F70FD]",
													"p-1.5 m-0.5 mx-auto cursor-pointer flex justify-center items-center rounded-full"
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
