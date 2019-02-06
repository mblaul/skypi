import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './constants/apolloSettings';

import { ThemeProvider } from 'styled-components';
import { theme } from './constants/styledComponentsSettings';

import App from './components/App';

class AppContainer extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</ApolloProvider>
		);
	}
}

export default AppContainer;
