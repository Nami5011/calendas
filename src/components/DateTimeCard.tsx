import { format } from "date-fns";
import { ReactComponent as Edit } from '../images/edit.svg';
import { classNames } from "../utils/cssClassName";

type Card = {
	parentProps: {
		edit: boolean;
		goBack?: () => void;
		parseDate: Date | null;
		start: string | null;
		end: string | null;
	}
}
function DateTimeCard({ parentProps }: Card) {
	const handleGoBack = () => {
		if (parentProps.edit && parentProps.goBack) {
			parentProps.goBack();
		}
	}
	return (<div className={classNames(parentProps.edit && "cursor-pointer hover:bg-[#9F70FD]",
		"w-full my-2 p-3 md:px-8 border border-gray-500 dark:border-gray-200 rounded-lg")}
		onClick={() => handleGoBack()}>
		{parentProps.edit && <Edit className="svg-black dark:svg-white w-4 h-4 float-right" />}
		<p>{parentProps.parseDate && format(parentProps.parseDate, 'EEEE, LLLL do')}</p>
		<p>{parentProps.start} - {parentProps.end}</p>
	</div>);
}
export default DateTimeCard;
