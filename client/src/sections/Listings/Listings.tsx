import { FC } from 'react';
import { server, useMutation, useQuery } from '../../lib/api';
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
	const { data, loading, refetch } = useQuery<ListingsData>(LISTINGS);

	const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<
		DeleteListingData,
		DeleteListingVariables
	>(DELETE_LISTING);

	const handleDeleteListing = async (id: string) => {
		await deleteListing({ id });
	};

	const listingsList = data ? (
		<ul>
			{data.listings.map(({ id, title }: Listing) => {
				return <li key={id}>{title}</li>;
			})}
		</ul>
	) : null;

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<div>
			<h2>Hello listings</h2>
			{listingsList}
			<button onClick={refetch}>Fetch listingss</button>
			<button onClick={() => handleDeleteListing('123')}>Delete listingss</button>
		</div>
	);
};
