import { FC } from 'react';
import { server } from '../../lib/api';

const LISTINGS = `
	query  {
		listings {
			id
			title
			image
		
		}
	}
`;

interface Props {
	title: string;
}

export const Listings: FC<Props> = ({ title, children }) => {
	const fetchListings = async () => {
		const listings = await server.fetch({ query: LISTINGS });
	};

	return (
		<div>
			<h2>Hello listings</h2>
			<button onClick={fetchListings}>Fetch listingss</button>
		</div>
	);
};
