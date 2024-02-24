import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { jwtDecode } from 'jwt-decode';
import { getSession, setSession } from '../utils/session';
import { useNavigate, useLocation } from 'react-router-dom';

type OauthUrl = {
	url: string
}

type User = {
	user_id?: number
	token_id?: number
	email?: string
	picture?: string
	locale?: string
}

const googleUserSessionKey = 'googleUser';

function Login() {
	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const googleOauthCode = useRef(queryString.get('code') as string | null);

	// google signin (no refresh token)
	const googleSignInButton = useRef(null);
	const [signedUser, set_signedUser] = useState(getSession(googleUserSessionKey) ? getSession(googleUserSessionKey) : {});
	const [callGoogleAuthFlg, set_callGoogleAuthFlg] = useState(false);
	const [signupFlg, set_signupFlg] = useState(false);
	const navigate = useNavigate();

	const handleGoogleOauth = async () => {
		try {
			const response = await fetch(process.env.REACT_APP_API_URI + '/api/v1/googleOauth');
			console.log(response);
			const oauthUrl = (await response.json()) as OauthUrl;
			window.location.href = oauthUrl.url;
		} catch (e: any) {
			console.error(e);
		}
	}

	useEffect(() => {
		console.log('callstoretoken')
		if (!googleOauthCode.current) return;
		console.log(googleOauthCode)

		// Store token after Oauth callback
		async function storeToken() {
			try {
				const response = await fetch(process.env.REACT_APP_API_URI + '/api/v1/googleOauth', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						code: googleOauthCode.current
					}),
				});
				const userProfile = await (response.json()) as User;
				console.log(userProfile);
				if (userProfile.user_id && userProfile.token_id) {
					setSession(googleUserSessionKey, userProfile);
					navigate('/mypage');
				}
			} catch (e: any) {
				console.error(e);
			}
		};
		storeToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// Google signin callback
		async function handleGoogleSigninCallBackResponse(res: CredentialResponse) {
			const decodedUser = jwtDecode<any>(res.credential || '');
			setSession('googleSignin', decodedUser);
			set_signedUser(decodedUser);
			// base64 encode
			var encodedEmail = encodeURIComponent(window.btoa(decodedUser?.email || ''));
			const response = await fetch(process.env.REACT_APP_API_URI + '/api/v1/user?key=' + encodedEmail);
			const userProfile = (await response.json()) as User;
			console.log('userProfile', userProfile);
			if (!userProfile.user_id) {
				// no user
				set_signupFlg(true);
			}
			if (!userProfile.user_id || !userProfile.token_id) {
				// display auth button
				set_callGoogleAuthFlg(true);
			}
			if (userProfile.user_id && userProfile.token_id) {
				// logined
				setSession(googleUserSessionKey, userProfile);
				navigate('/mypage');
			}
		}
		if (window.google && googleSignInButton.current) {
			// Signin
			window.google.accounts.id.initialize({
				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
				callback: handleGoogleSigninCallBackResponse
			});
			// Shortcut Signin
			window.google.accounts.id.prompt();
			// Render Google signin button
			window.google.accounts.id.renderButton(
				googleSignInButton.current,
				{ theme: 'outline', size: 'large' }
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [googleSignInButton]);

	return (
		<div className="App">
			<header className="App-header">
				<p>
					Login
				</p>
				{
					Object.keys(signedUser).length === 0 &&
					<div ref={googleSignInButton}></div>
				}
				{
					signupFlg &&
					<>
						<h3>WELCOME 🥳🎉</h3>
						<p>Create your account and make your own meeting form ✨</p>
					</>
				}
				{
					(signedUser && callGoogleAuthFlg) &&
					<button onClick={() => handleGoogleOauth()}>Google Oauth</button>
				}
			</header>
		</div>
	);
}

export default Login;
