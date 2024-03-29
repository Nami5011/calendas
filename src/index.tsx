import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from './pages/Calendar';
import Confirm from './pages/Confirm';
import NotFoundPage from './pages/NotFoundPage';
import App from './App';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import HeaderGuest from './components/HeaderGuest';
import BookingComplete from './pages/BookingComplete';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFoundPage />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/mypage',
		element: <Mypage />,
	},
	{
		path: '/calendar',
		// path: '/calendar/:userCode',
		element: <><HeaderGuest /><Calendar /></>,
	},
	{
		path: '/confirm',
		element: <><HeaderGuest /><Confirm /></>,
	},
	{
		path: '/complete',
		element: <><HeaderGuest /><BookingComplete /></>,
	},
	{
		path: '/notFound',
		element: <NotFoundPage />,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
	// <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
