import { Link } from 'react-router-dom';
import '../App.css';

function NotFoundPage() {
	return (
		<div className="App">
			<header className="flex flex-col gap-2">
				<p>
					404 Not Found
				</p>
				<Link to="/">Home from Link</Link>
				<a href="/">Home from Link</a>
			</header>
		</div>
	);
}

export default NotFoundPage;