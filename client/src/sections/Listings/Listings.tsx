import { Avatar, Button, List, Spin } from 'antd';
import { gql } from 'apollo-boost';
import { FC } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { DeleteListingData, DeleteListingVariables, ListingsData } from '../../types';
import { ListingSkeleton } from './components/ListingSkeleton';
import './styles/Listings.css';

const LISTINGS = gql`
	query Listings {
		listings {
			id
			title
			image
			address
			numOfGuests
			numOfBeds
			numOfBaths
			rating
		}
	}
`;

const DELETE_LISTING = gql`
	mutation DeleteListing($id: ID!) {
		deleteListing(id: $id) {
			id
		}
	}
`;

interface Props {
	title: string;
}

export const Listings: FC<Props> = () => {
	const { data, loading, refetch } = useQuery<ListingsData>(LISTINGS);

	const [deleteListing] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

	const handleDeleteListing = async (id: string) => {
		await deleteListing({ variables: { id } });
		refetch();
	};

	const listingsList = data ? (
		<List
			itemLayout='horizontal'
			dataSource={data.listings}
			renderItem={(listing) => (
				<List.Item
					actions={[
						<Button type='primary' onClick={() => handleDeleteListing(listing.id)}>
							Delete
						</Button>
					]}
				>
					<List.Item.Meta
						title={listing.title}
						description={listing.address}
						avatar={<Avatar src={listing.image} shape='square' size={64} />}
					/>
				</List.Item>
			)}
		/>
	) : null;

	if (loading) {
		return <ListingSkeleton title='Tinyhouse listings' />;
	}

	return (
		<div className='listings'>
			<Spin spinning={listingsList === null}>
				<h2>Hello listings</h2>
				{listingsList}
				<button onClick={refetch}>Fetch listingss</button>
				<button onClick={() => handleDeleteListing('123')}>Delete listingss</button>
			</Spin>
		</div>
	);
};
