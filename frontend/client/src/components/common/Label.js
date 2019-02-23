import React, { Component } from 'react';
import styled from 'styled-components';

const LabelStyles = styled.div`
	color: ${(props) => props.theme.colors.secondary};
	font: ${(props) => props.theme.typography.label};
	margin: ${(props) => props.theme.spacing.unit};
`;

class Label extends Component {
	render() {
		const { text } = this.props;
		return <LabelStyles>{text}</LabelStyles>;
	}
}

export default Label;
