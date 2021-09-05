import { Home, Host, Listing, Listings, NotFound, User } from './sections';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/host' component={Host} />
				<Route exact path='/listing/:id' component={Listing} />
				<Route exact path='/listings/:location?' component={Listings} />
				<Route exact path='/user/:id' component={User} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
};
