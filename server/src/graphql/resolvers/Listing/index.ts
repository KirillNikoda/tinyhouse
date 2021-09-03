import { ObjectId } from 'mongodb';
import { Database, Listing } from '../../../lib/types';

export const listingsResolver = {
	Query: {
		listings: async (
			_root: undefined,
			_args: Record<string, unknown>,
			{ db }: { db: Database }
		) => {
			return await db.listings.find({}).toArray();
		}
	},
	Mutation: {
		deleteListing: async (_root: undefined, { id }: { id: ObjectId }, { db }: { db: Database }) => {
			const deleteRes = await db.listings.findOneAndDelete({
				_id: id
			});

			if (!deleteRes.value) {
				throw new Error();
			}

			return deleteRes.value;
		}
	},
	Listing: {
		id: (listing: Listing): string => listing._id.toString()
	}
};
