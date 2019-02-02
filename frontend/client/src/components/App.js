import React, { Component } from 'react';
import styled from 'styled-components';

// Import layout components
import NavBar from './nav/NavBar';

const AppStyles = styled.div`color: black;`;

class App extends Component {
	render() {
		return (
			<AppStyles>
				<NavBar />
			</AppStyles>
		);
	}
}

export default App;
