import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';

function Calender() {
	const params = useParams<{ userCode: string }>();
	console.log(params)
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Calender {params.userCode}
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default Calender;
