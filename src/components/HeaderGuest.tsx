import { Link } from "react-router-dom";

function HeaderGuest() {
	return (
		<header>
			<Link className="hover:text-[#FF8911] focus:text-[#FF8911]" to="/">
				<p className="my-1 mx-2 text-right">
					Powered by Calendas
				</p>
			</Link>
		</header>
	);
}
export default HeaderGuest;
