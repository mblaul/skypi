import React, { Component } from 'react';
import styled from 'styled-components';
import { theme } from '../../constants/styledComponentsSettings';

const MapStyles = styled.div`
	height: 100%;
	border: 1px solid ${(props) => theme.colors.primary.light};
	border-radius: 5px;
	box-shadow: 0px 0px 2px ${(props) => theme.colors.primary.light};
	.content {
		margin: 10px;
	}
`;

class Map extends Component {
	render() {
		return (
			<MapStyles>
				<div className={'content'}>I'm a map!</div>
			</MapStyles>
		);
	}
}

export default Map;
