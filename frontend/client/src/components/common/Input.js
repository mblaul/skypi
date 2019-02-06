import React, { Component } from 'react';
import styled from 'styled-components';

const Label = styled.label`
	color: ${(props) => props.theme.colors.secondary};
	font: ${(props) => props.theme.typography.label};
	margin: ${(props) => props.theme.spacing.unit};
`;

const NameLabel = styled.div`margin-bottom: .3rem;`;

const InputStyles = styled.input`
	color: ${(props) => props.theme.colors.black};
	font: ${(props) => props.theme.typography.input};
	padding-left: 0.4rem;
	outline: none;
	border: none;
	border-left: ${(props) => props.theme.colors.black} outset 3px;
	transition: border 0.25s ease;
	:focus {
		border-left: ${(props) => props.theme.colors.secondary} outset 10px;
	}
`;

class Input extends Component {
	render() {
		const {
			alt,
			autoComplete = 'off',
			label,
			name,
			placeHolder,
			type,
			value,
			onBlur,
			onChange,
			onFocus,
			onHover
		} = this.props;

		return (
			<Label htmlFor={name}>
				<NameLabel>{label}</NameLabel>
				<InputStyles
					alt={alt || name}
					autocomplete={autoComplete}
					type={type}
					name={name}
					value={value}
					placeholder={placeHolder}
					onBlur={onBlur}
					onChange={onChange}
					onFocus={onFocus}
					onHover={onHover}
				/>
			</Label>
		);
	}
}

export default Input;
