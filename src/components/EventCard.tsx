import { ReactComponent as Timer } from '../images/timer.svg';
import { type Event } from '../types/event';

type Props = {
	parentProps: Event | null
	isLoading: boolean
}
EventCard.defaultProps = {
	parentProps: {
		title: '',
		description: '',
		duration: '',
	},
	isLoading: false
}
const SkeletonLoader: React.FC = () => {
	return (
		<div className="animate-pulse flex space-x-4">
			<div className="flex-1 space-y-6 py-1">
				<div className="h-2 bg-gray-400 dark:bg-gray-500 rounded"></div>
				<div className="space-y-3">
					<div className="grid grid-cols-3 gap-4">
						<div className="h-2 bg-gray-400 dark:bg-gray-500 rounded col-span-2"></div>
						<div className="h-2 bg-gray-400 dark:bg-gray-500 rounded col-span-1"></div>
					</div>
					<div className="h-2 bg-gray-400 dark:bg-gray-500 rounded"></div>
				</div>
			</div>
		</div>
	);
}

function EventCard({ parentProps, isLoading }: Props) {
	return (
		<div className="mx-2 mt-4 p-3 md:mt-8 md:px-8 bg-[#FDBF60] dark:bg-gray-700 rounded-r border-l-4 border-[#FF8911] text-gray-900 dark:text-gray-50">
			{isLoading ?
				(
					<SkeletonLoader />
				) : (
					<>
						<h1 className='text-2xl font-semibold'>{parentProps?.title}</h1>
						<p>{parentProps?.description}</p>
						<span className="inline-flex">
							<Timer className="svg-black dark:svg-white mr-1 my-auto" />
							<span>{parentProps?.duration} minutes</span>
						</span>
					</>
				)
			}
		</div>
	);
}
export default EventCard;
