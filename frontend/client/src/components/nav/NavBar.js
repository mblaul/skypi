import React from 'react';
import styled from 'styled-components';
import { theme } from '../../constants/styledComponentsSettings';

const NavBarStyles = styled.div`
	display: inline-grid;
	grid-template-columns: auto auto auto auto;
	align-items: center;
	text-align: center;
	padding: 1vh 0;
	width: 100%;
	font: ${(props) => theme.colors.primary.dark};
`;

const NavLinkStyles = styled.div`
	padding: 1rem;
	margin: 0 auto;
	min-width: 100px;
	background-color: ${(props) => theme.colors.white};
	font: ${(props) => theme.typography.label};
	font-size: 20px;
	color: ${(props) => theme.colors.primary.dark};
	border-radius: 4px;
	border: 2px solid ${(props) => theme.colors.primary.dark};
	transition: background-color 0.1s ease-in;
	:focus,
	:hover {
		background-color: ${(props) => theme.colors.primary.dark};
		color: ${(props) => theme.colors.white};
		box-shadow: 0px 0px 2px ${(props) => theme.colors.primary.light};
		cursor: pointer;
	}
`;

const NavBar = (props) => {
	return (
		<NavBarStyles>
			<NavLinkStyles tabIndex={0}>Home</NavLinkStyles>
			<NavLinkStyles tabIndex={0}>Locations</NavLinkStyles>
			<NavLinkStyles tabIndex={0}>About</NavLinkStyles>
			<NavLinkStyles tabIndex={0}>Contact</NavLinkStyles>
		</NavBarStyles>
	);
};

export default NavBar;
