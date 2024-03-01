import { Link } from "react-router-dom";

function HeaderGuest() {
	return (
		<header>
			<p className="my-1 mx-2 w-auto flex justify-end">
				<Link className="hover:text-[#FF8911] focus:text-[#FF8911]"
					to="/">Powered by Calendas</Link>
			</p>
		</header>
	);
}
export default HeaderGuest;
