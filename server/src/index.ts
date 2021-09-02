import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { resolvers, typeDefs } from './graphql';

const start = async () => {
	const app = express();

	const server = new ApolloServer({ typeDefs, resolvers });

	await server.start();
	server.applyMiddleware({ app, path: '/api' });
	app.listen(8080);
};

start();
