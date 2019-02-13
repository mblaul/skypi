import React, { Component } from 'react';
import styled from 'styled-components';
import { theme } from '../../constants/styledComponentsSettings';

const HomeStyles = styled.div`
	max-width: 100vw;
	padding: 2.5% 1% 2.5% 1%;
	min-height: 45vh;
	display: grid;
	grid-template-columns: 30% auto;
	.map {
		padding-top: ${(props) => theme.spacing.unit};
		padding-left: calc(${(props) => theme.spacing.unit} * 10);
		border-left: 3px solid ${(props) => theme.colors.secondary};
	}
`;

class Home extends Component {
	render() {
		return (
			<HomeStyles>
				<div>Lorem</div>
				<div className={'map'}>Stats</div>
			</HomeStyles>
		);
	}
}

export default Home;
