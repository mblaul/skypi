import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './constants/apolloSettings';

import App from './components/App';

class AppContainer extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		);
	}
}

export default AppContainer;
