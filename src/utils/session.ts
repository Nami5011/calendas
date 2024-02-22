export function setSession(key: string, value: string | number | Array<any> | object | boolean) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSession(key: string) {
	const storedData = sessionStorage.getItem(key);
	if (storedData) {
		// If user data exists, parse and set it in the state
		return JSON.parse(storedData);
	}
	return null;
}

export function removeSession(key: string) {
	sessionStorage.removeItem(key);
}
