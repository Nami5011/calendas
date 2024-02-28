import timer from '../images/timer.svg';

type Event = {
	parentProps: {
		title: string;
		description: string;
		duration: string;
	}
}
EventCard.defaultProps = {
	parentProps: {
		title: '',
		description: '',
		duration: '',
	},
}
function EventCard({ parentProps }: Event) {
	return (
		<div className="mx-2 mt-4 p-3 md:mt-8 md:px-8 bg-[#FDBF60] dark:bg-gray-700 rounded-r border-l-4 border-[#FF8911] text-gray-900 dark:text-gray-50">
			<h1 className='text-2xl font-semibold'>{parentProps.title}</h1>
			<p>{parentProps.description}</p>
			<span className="inline-flex">
				<img src={timer} className="svg-black dark:svg-white mr-1 " alt="timer" />
				<span>{parentProps.duration}</span>
			</span>
		</div>
	);
}
export default EventCard;
