import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import Label from '../common/Label';

const LandingStyles = styled.div`
	height: 80vh;
	background-color: ${(props) => props.theme.colors.primary.main};
	display: grid;
	.centered {
		margin: auto auto;
		text-align: center;
	}
`;

export default class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: ''
		};

		this.handleChange = (e) => {
			this.setState({ [e.target.name]: e.target.value });
		};
	}

	render() {
		const { location } = this.state;
		const labelText = 'Please enter a location to get your locally-sourced weather!';

		return (
			<LandingStyles>
				<div className="centered">
					<Label text={labelText} style={{ color: 'white', fontSize: 24 }} />
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
