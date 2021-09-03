// env loading
import dotenv from 'dotenv';
dotenv.config();

// etc
import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { connectDatabase } from './database';
import { resolvers, typeDefs } from './graphql';

const start = async (app: Express) => {
	const db = await connectDatabase();

	const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });

	await server.start();
	server.applyMiddleware({ app, path: '/api' });
	app.listen(process.env.PORT || 8080);

	const listings = await db.listings.find({}).toArray();
	console.log(listings[0]);
};

start(express());
