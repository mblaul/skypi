import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { REGISTER_USER_MUTATION } from '../../resolvers/mutations/authMutations';
import styled from 'styled-components';

import Input from '../common/Input';
import Button from '../common/Button';

const RegisterStyles = styled.div`
	width: 25vw;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 15px;
	justify-items: center;
	h2 {
		font: ${(props) => props.theme.typography.header};
		color: ${(props) => props.theme.colors.white};
	}
	label {
		display: block;
	}
	input {
		display: block;
	}
	font: ${(props) => props.theme.typography.main};
`;

const HeaderStyles = styled.div`
	width: 100%;
	background-color: ${(props) => props.theme.colors.primary.main};
	padding: ${(props) => props.theme.spacing.unit};
	border-radius: 3px;
	transform: skew(25deg, 0deg);
	h2 {
		text-align: center;
		transform: skew(-25deg, 0deg);
	}
`;

class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { firstName, lastName, email, password } = this.state;
		return (
			<Mutation mutation={REGISTER_USER_MUTATION} variables={this.state}>
				{(registerUser, { error, loading }) => {
					return (
						<RegisterStyles>
							<form
								method="post"
								onSubmit={(e) => {
									e.preventDefault();
									registerUser();
								}}
							>
								<HeaderStyles>
									<h2>Register</h2>
								</HeaderStyles>
								<Input
									label={'First Name'}
									name={'firstName'}
									value={firstName}
									type={'text'}
									placeHolder={'Mary'}
									onChange={this.handleChange}
								/>
								<Input
									label={'Last Name'}
									name={'lastName'}
									value={lastName}
									type={'text'}
									placeHolder={'Jane'}
									onChange={this.handleChange}
								/>
								<Input
									label={'Email'}
									name={'email'}
									value={email}
									type={'text'}
									placeHolder={'mary@jane.com'}
									onChange={this.handleChange}
								/>
								<Input
									label={'Password'}
									name={'password'}
									value={password}
									type={'text'}
									placeHolder={'Password'}
									onChange={this.handleChange}
								/>
								<Button type={'submit'} label={'Register!'} />{' '}
							</form>
						</RegisterStyles>
					);
				}}
			</Mutation>
		);
	}
}

export default Register;
