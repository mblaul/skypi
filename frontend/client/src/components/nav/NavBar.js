import React from 'react';
import styled from 'styled-components';

const NavBarStyles = styled.div`
	display: inline-grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-auto-rows: auto;
	align-items: center;
	text-align: center;
	padding: 1vh 0 1vh 0;
	width: 100%;
`;

const NavLinkStyles = styled.div`padding: 1rem;`;

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
