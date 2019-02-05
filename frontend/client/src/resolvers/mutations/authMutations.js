import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
	mutation REGISTER_MUTATION($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
		createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
			id
			email
		}
	}
`;
