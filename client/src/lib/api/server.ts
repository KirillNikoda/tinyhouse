import { Listing } from '../types';

interface Body {
	query: string;
}

export const server = {
	fetch: async (body: Body): Promise<Listing[]> => {
		const res = await fetch('http://localhost:8080/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return res.json();
	}
};
