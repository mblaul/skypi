import React, { Component } from 'react';
import styled from 'styled-components';
import { theme } from '../../constants/styledComponentsSettings';
import Map from '../common/Map';

const HomeStyles = styled.div`
	max-width: 100vw;
	padding: 2.5% 1% 2.5% 1%;
	min-height: 45vh;
	display: grid;
	grid-template-columns: 30% auto;
	.mvp-container {
		padding: ${(props) => theme.spacing.unit};
	}
	.map-container {
		padding: ${(props) => theme.spacing.unit};
		border-left: 2px solid ${(props) => theme.colors.primary.dark};
	}
`;

class Home extends Component {
	render() {
		return (
			<HomeStyles>
				<div className={'mvp-container'}>
					<Map />
				</div>
				<div className={'map-container'}>
					<Map />
				</div>
			</HomeStyles>
		);
	}
}

export default Home;
