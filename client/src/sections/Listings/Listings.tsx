import { FC, useCallback, useEffect, useState } from 'react';
import { server, useQuery } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, Listing, ListingsData } from '../../lib/types';

const LISTINGS = `
	query  {
		listings {
			id
			title
			image
		
		}
	}
`;

const DELETE_LISTING = `
	mutation DeleteListing($id: ID!) {
		deleteListing(id: $id) {
			id
		}
	}
`;

interface Props {
	title: string;
}

export const Listings: FC<Props> = ({ title, children }) => {
	const { data, refetch } = useQuery<ListingsData>(LISTINGS);

	const deleteListing = async () => {
		await server.fetch<DeleteListingData, DeleteListingVariables>({
			query: DELETE_LISTING,
			variables: {
				id: '61324c19a529422b3832453b'
			}
		});

		refetch();
	};

	const listingsList = data ? (
		<ul>
			{data.listings.map(({ id, title }: Listing) => {
				return <li key={id}>{title}</li>;
			})}
		</ul>
	) : null;

	return (
		<div>
			<h2>Hello listings</h2>
			{listingsList ? listingsList : 'Loading...'}
			<button onClick={refetch}>Fetch listingss</button>
			<button onClick={deleteListing}>Delete listingss</button>
		</div>
	);
};
