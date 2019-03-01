import React, { Component } from 'react';
import styled from 'styled-components';

const LabelStyles = styled.div`
	color: ${(props) => props.theme.colors.secondary};
	font: ${(props) => props.theme.typography.label};
	margin: ${(props) => props.theme.spacing.unit};
`;

class Label extends Component {
	render() {
		const { text, style } = this.props;
		return <LabelStyles style={{ ...style }}>{text}</LabelStyles>;
	}
}

export default Label;
