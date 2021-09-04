import { Divider, Skeleton } from 'antd';
import './styles/ListingSkeleton.css';

interface Props {
	title: string;
}

export const ListingSkeleton = ({ title }: Props) => {
	return (
		<div className='listings-skeleton'>
			<h2>{title}</h2>
			<Skeleton active paragraph={{ rows: 1 }} />
			<Divider />
			<Skeleton active paragraph={{ rows: 1 }} />
			<Divider />
			<Skeleton active paragraph={{ rows: 1 }} />
		</div>
	);
};
