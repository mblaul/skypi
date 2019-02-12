import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

// Import layout components
import NavBar from './nav/NavBar';

// Import content components
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './profile/Profile';
import Home from './home/Home';

const AppStyles = styled.div`
	width: 100vw;
	height: 100vh;
`;

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<AppStyles>
					<NavBar />
					<Route exact path="/" component={Home} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/profile" component={Profile} />
				</AppStyles>
			</BrowserRouter>
		);
	}
}

export default App;
