import crypto from 'crypto';
import { Google } from '../../../google/Google';
import { Database, User, Viewer } from '../../../lib/types';
import { LogInArgs } from './types';

const logInViaGoogle = async (code: string, token: string, db: Database): Promise<User | void> => {
	const { user } = await Google.logIn(code);

	if (!user) {
		throw new Error('Google log in error');
	}

	const userNamesList = user.names && user.names.length ? user.names : null;
	const userPhotosList = user.photos && user.photos.length ? user.photos : null;
	const userEmailsList =
		user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null;

	const userName = userNamesList ? userNamesList[0].displayName : null;

	const userId =
		userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source
			? userNamesList[0].metadata.source.id
			: null;

	const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

	const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

	if (!userId || !userName || !userAvatar || !userEmail) {
		throw new Error('Google log in error');
	}

	const updateRes = await db.users.findOneAndUpdate(
		{ _id: userId },
		{
			$set: {
				name: userName,
				avatar: userAvatar,
				contact: userEmail,
				token
			}
		}
	);

	const viewer = updateRes.value;

	if (!viewer) {
		const insertResult = await db.users.insertOne({
			_id: userId,
			token,
			name: userName,
			avatar: userAvatar,
			contact: userEmail,
			income: 0,
			bookings: [],
			listings: []
		});
	}
};

export const viewerResolvers = {
	Query: {
		authUrl: (): string => {
			try {
				return Google.authUrl;
			} catch (e) {
				throw new Error(`Failed to query Google Auth Url ${e}`);
			}
		}
	},
	Mutation: {
		logIn: async (_root: undefined, { input }: LogInArgs, { db }: { db: Database }) => {
			try {
				const code = input ? input.code : null;
				const token = crypto.randomBytes(16).toString('hex');
				const viewer = code ? await logInViaGoogle(code, token, db) : undefined;

				if (!viewer) {
					return { didRequest: true };
				}

				const { _id, token: viewerToken, avatar, walletId, didRequest } = viewer;

				return {
					_id,
					token: viewerToken,
					avatar,
					walletId,
					didRequest: true
				};
			} catch (e) {
				throw new Error(`Failed to log in: ${error}`);
			}
		},
		logOut: () => {
			return {
				didRequest: true
			};
		}
	},
	Viewer: {
		id: (viewer: Viewer) => viewer._id,
		hasWallet: (viewer: Viewer): boolean | undefined => (viewer.walletId ? true : undefined)
	}
};
