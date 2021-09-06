import { MongoClient } from 'mongodb';
import { Booking, Database, Listing, User } from '../lib/types';

const url = 'mongodb://127.0.0.1:27017/tinyhouse';

export const connectDatabase = async (): Promise<Database> => {
	const client = await MongoClient.connect(url);

	const db = client.db('tinyhouse');

	return {
		bookings: db.collection<Booking>('bookings'),
		listings: db.collection<Listing>('listings'),
		users: db.collection<User>('users')
	};
};
