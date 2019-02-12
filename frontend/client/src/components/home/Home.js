import React, { Component } from 'react';
import styled from 'styled-components';

const HomeStyles = styled.div`
	width: 100vw;
	display: grid;
	grid-template-columns: 33.3% 66.6%;
`;

class Home extends Component {
	render() {
		return <HomeStyles>Hello</HomeStyles>;
	}
}

export default Home;
