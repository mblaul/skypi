import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Controls extends React.Component {
	handleClick(i) {
		const buttons = this.state.buttons.slice();
		buttons[i] = 'X';
		this.setState({buttons: buttons});
	}
	render() {
		const title = 'Account?';
		
		return (
			<div>
				<div className="ribbon">
					<img className="logo" src={require("./img/cloud.jpg")}></img>
					<div className="title">{title}</div>
					<div className="buttonColumn">
						<but onclick="logInButton()" className="btn btn-primary">Log In</but>
						<but onclick="signUpButton()" className="btn btn-primary">Sign up</but>
					</div>
					<div className="overlay"></div>
				</div>
			</div>
		);
	}
}

class HomePage extends React.Component {
	render() {
		const disp = 'This page is currently undergoing construction.';
		return (
			<div className="homePage">
				<div className="topRibben">
					<Controls />
				</div>
				<div className="pageInfo">
					<div>{disp}</div>
					<ol>{"What is \"ol\" for?"}</ol>
				</div>
			</div>
		);
	}
}

// =============================================

ReactDOM.render(
	<HomePage />,
	document.getElementById('root')
);