import React, { useEffect } from 'react';
import '../App.css';
import { useLocation, useParams } from 'react-router-dom';
// import getCalenderList from '../models/calender';

// type Post = {
// 	message: string
// }
type Params = {
	userCode: string
}
// type OauthUrl = {
// 	url: string
// }
function Calender() {
	const params = useParams<Params>();
	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const code = queryString.get('code') as string | null;
	console.log('params', code)
	useEffect(() => {
		const controller = new AbortController();
		// const fetchGet = async () => {
		// 	try {
		// 		const response = await fetch('https://calendas-laravel-api.fly.dev/api/v1/googleOauth', {
		// 			signal: controller.signal,
		// 		});
		// 		console.log(response);

		// 		const oauthUrl = (await response.json()) as OauthUrl;
		// 		window.location.href = oauthUrl.url;
		// 	} catch (e: any) {
		// 		console.error(e);
		// 	}
		// }
		// fetchGet();
		// const fetchPost = async () => {
		// 	try {
		// 		const response = await getCalenderList();
		// 		console.log(response);
		// 	} catch (e: any) {
		// 		console.error(e);
		// 	}

		// }
		// fetchPost();
		return () => controller.abort();
	}, []);

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
