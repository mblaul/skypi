import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { REGISTER_MUTATION } from '../../resolvers/mutations/authMutations';
import styled from 'styled-components';

const RegisterStyles = styled.div`
	width: 50vw;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(1fr);
	grid-column-gap: 15px;
	label {
		display: block;
	}
	input {
		display: block;
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
			<Mutation mutation={REGISTER_MUTATION} variables={this.state}>
				{(createUser, { error, loading }) => {
					return (
						<RegisterStyles>
							<form
								method="post"
								onSubmit={(e) => {
									e.preventDefault();
									createUser();
								}}
							>
								<h2>Register</h2>
								<label htmlFor={firstName}>
									First name
									<input
										type="text"
										name="firstName"
										value={firstName}
										onChange={this.handleChange}
									/>
								</label>
								<label htmlFor={lastName}>
									Last name
									<input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
								</label>

								<label htmlFor={email}>
									Email
									<input type="text" name="email" value={email} onChange={this.handleChange} />
								</label>
								<label htmlFor={password}>
									Password
									<input type="text" name="password" value={password} onChange={this.handleChange} />
								</label>
								<button type="submit">Register!</button>
							</form>
						</RegisterStyles>
					);
				}}
			</Mutation>
		);
	}
}

export default Register;
