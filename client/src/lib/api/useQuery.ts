import { useCallback, useEffect, useState } from 'react';
import { server } from '.';

interface State<TData> {
	data: TData | null;
	loading: boolean;
	error: boolean;
}

interface QueryResult<TData> extends State<TData> {
	refetch: () => void;
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
	const [state, setState] = useState<State<TData>>({
		data: null,
		loading: false,
		error: false
	});

	const fetchApi = useCallback(async () => {
		try {
			setState({ ...state, loading: true, error: false });
			const { data } = await server.fetch<TData>({ query });
			setState({ data, loading: false, error: false });
		} catch (e) {
			setState({ ...state, error: true });
			console.error(e);
		}
	}, [state, query]);

	useEffect(() => {
		fetchApi();
	}, [fetchApi]);

	console.log('hello world');

	return { ...state, refetch: fetchApi };
};
