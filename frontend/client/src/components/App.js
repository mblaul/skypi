import React, { Component } from 'react';
import styled from 'styled-components';

// Import layout components
import NavBar from './nav/NavBar';

import Register from './auth/Register';

const AppStyles = styled.div`color: black;`;

class App extends Component {
	render() {
		return (
			<AppStyles>
				<NavBar />
				<Register />
			</AppStyles>
		);
	}
}

export default App;
