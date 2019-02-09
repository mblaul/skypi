import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_USER_MUTATION } from '../../resolvers/mutations/authMutations';
import styled from 'styled-components';

import Input from '../common/Input';
import Button from '../common/Button';

const LoginStyles = styled.div`
	width: 25vw;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 15px;
	justify-items: center;
	h2 {
		font: ${(props) => props.theme.typography.header};
		color: ${(props) => props.theme.colors.white};
		text-shadow: -1px -1px 0 ${(props) => props.theme.colors.primary.main},
			1px -1px 0 ${(props) => props.theme.colors.primary.main},
			-1px 1px 0 ${(props) => props.theme.colors.primary.main},
			1px 1px 0 ${(props) => props.theme.colors.primary.main};
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
	background-color: ${(props) => props.theme.colors.primary.light};
	padding: ${(props) => props.theme.spacing.unit};
	border-radius: 3px;
	border: 3px solid ${(props) => props.theme.colors.primary.main};
	transform: skew(25deg, 0deg);
	h2 {
		text-align: center;
		transform: skew(-25deg, 0deg);
	}
`;

class Login extends Component {
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
		const { email, password } = this.state;
		return (
			<Mutation mutation={LOGIN_USER_MUTATION} variables={this.state}>
				{(loginUser, { data, error, loading }) => {
					return (
						<LoginStyles>
							<form
								method="post"
								onSubmit={(e) => {
									e.preventDefault();
									loginUser().then((result) => {
										const { token } = result.data.loginUser;
										localStorage.setItem('token', token);
									});
								}}
							>
								<HeaderStyles>
									<h2>Login</h2>
								</HeaderStyles>

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
								<Button type={'submit'} label={'Log In'} />
							</form>
						</LoginStyles>
					);
				}}
			</Mutation>
		);
	}
}

export default Login;
