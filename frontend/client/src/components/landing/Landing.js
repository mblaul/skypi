import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import Label from '../common/Label';

const LandingStyles = styled.div`
	height: 80vh;
	background-color: ${(props) => props.theme.colors.primary.main};
	display: grid;
	.centered {
		margin: auto;
	}
`;

export default class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: ''
		};
	}

	render() {
		const { location } = this.state;
		const labelText = 'Please enter a location to get your locally-sourced weather!';

		return (
			<LandingStyles>
				<div className="centered">
					<Label text={labelText} />
					<Input
						name={'location'}
						value={location}
						type={'text'}
						placeHolder={'90210'}
						onChange={this.handleChange}
					/>
				</div>
			</LandingStyles>
		);
	}
}
