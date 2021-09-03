import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const url = 'mongodb://127.0.0.1:27017/tinyhouse';

export const connectDatabase = async (): Promise<Database> => {
	const client = await MongoClient.connect(url);

	const db = client.db('tinyhouse');

	return {
		listings: db.collection('test_listings')
	};
};
