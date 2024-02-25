function CalendarWeekHeader() {
	const dates = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	return (
		<thead>
			<tr>
				{dates.map((date, index) => (
					<th key={index}>
						<div className="w-full flex justify-center pb-1 md:px-3">
							<p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">{date}</p>
						</div>
					</th>
				))}
			</tr>
		</thead>
	);
}
export default CalendarWeekHeader;
