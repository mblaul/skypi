import React, { Component } from 'react';
import styled from 'styled-components';

// Import layout components
import NavBar from './nav/NavBar';

import Register from './auth/Register';
import Login from './auth/Login';

const AppStyles = styled.div`color: black;`;

class App extends Component {
	render() {
		return (
			<AppStyles>
				<NavBar />
				<Register />
				<Login />
			</AppStyles>
		);
	}
}

export default App;
