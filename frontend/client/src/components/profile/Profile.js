import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../resolvers/queries/profileQueries';
class Profile extends Component {
	render() {
		return (
			<Query query={CURRENT_USER_QUERY}>
				{({ data, error, loading }) => {
					console.log(data);
					return <div>hello</div>;
				}}
			</Query>
		);
	}
}

export default Profile;
