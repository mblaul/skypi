import React from 'react';
import styled from 'styled-components';

const NavBarStyles = styled.div`
	display: inline-grid;
	grid-template-columns: repeat(5, 1fr);
	position: absolute;
	top: 0;
	left: 0;
	padding: 1vh 1vw;
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
