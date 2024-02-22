
export default async function getCalenderList() {
	try {
		const response = await fetch('https://calendas-api.fly.dev/post-hello',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: 'success' }),
			});
		const post = await response.json();
		console.log(post);
		return post;
	} catch (e: any) {
		return e;
	}
}