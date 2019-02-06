import gql from 'graphql-tag';

export const REGISTER_USER_MUTATION = gql`
	mutation REGISTER_USER_MUTATION($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
		registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
			id
			email
		}
	}
`;

export const LOGIN_USER_MUTATION = gql`
	mutation LOGIN_USER_MUTATION($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
		}
	}
`;
