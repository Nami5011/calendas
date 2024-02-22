import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Calender from './pages/Calender';
import Confirm from './pages/Confirm';
import NotFoundPage from './pages/NotFoundPage';
import App from './App';
import Login from './pages/Login';
import Mypage from './pages/Mypage';

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
		path: '/calender/:userCode',
		element: <Calender />,
	},
	{
		path: '/confirm',
		element: <Confirm />,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();