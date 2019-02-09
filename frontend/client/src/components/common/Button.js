import React, { Component } from 'react';
import styled from 'styled-components';

const ButtonStyles = styled.button`
	outline: none;
	color: ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.primary.main};
	:focus,
	:hover {
		border: ${(props) => props.theme.colors.secondary} solid 2px;
	}
`;

class Button extends Component {
	render() {
		const { label, size, type } = this.props;

		return (
			<ButtonStyles type={type} className={size}>
				{label}
			</ButtonStyles>
		);
	}
}

Button.defaultProps = {
	size: 'medium'
};

export default Button;
