import React from 'react';
import styled from 'styled-components';
import { theme } from '../../constants/styledComponentsSettings';

const NavBarStyles = styled.div`
	display: inline-grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	align-items: center;
	text-align: center;
	padding: 1vh 0 1vh 0;
	width: 100%;
	font: ${(props) => theme.colors.primary.dark};
`;

const NavLinkStyles = styled.div`
	padding: 1rem;
	margin: 0 10rem;
	background-color: ${(props) => theme.colors.primary.dark};
	font: ${(props) => theme.typography.label};
	font-size: 20px;
	text-shadow: 0px 0px 3px ${(props) => theme.colors.primary.dark};
	color: ${(props) => theme.colors.white};
	border-radius: 8px;
	border: 2px solid ${(props) => theme.colors.primary.dark};
	:hover {
		background-color: ${(props) => theme.colors.primary.light};
	}
`;

const NavBar = (props) => {
	return (
		<NavBarStyles>
			<NavLinkStyles>Home</NavLinkStyles>
			<NavLinkStyles>Locations</NavLinkStyles>
			<NavLinkStyles>About</NavLinkStyles>
			<NavLinkStyles>Contact</NavLinkStyles>
		</NavBarStyles>
	);
};

export default NavBar;
