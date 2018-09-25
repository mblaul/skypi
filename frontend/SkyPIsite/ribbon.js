import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AccountButtons extends React.Component {
	render() {
		return (
			<button
			className="AccountButtons"
			onClick={() => this.props.onClick({value: 'X'})}
			>
			{this.props.value}
			</button>
		);
	}
}

class Controls extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttons: Array(2).fill(null),
		};
	}
	handleClick(i) {
		const buttons = this.state.buttons.slice();
		buttons[i] = 'X';
		this.setState({buttons: buttons});
	}
	renderButtons(i) {
		return (
			<AccountButtons
			value={this.state.buttons[i]}
			onClick={() => this.handleClick(i)}
			/>
		);
	}
	render() {
		const title = 'Account?';
		
		return (
			<div>
				<div className="ribbon">
					<div className="title">{title}</div>
					<div className="buttonColumn">
						<div className="buttonRow">{this.renderButtons("0")}</div>
						<div className="buttonRow">{this.renderButtons("1")}</div>
					</div>
				</div>
			</div>
		);
	}
}

class HomePage extends React.Component {
	render() {
		return (
			<div className="homePage">
				<div className="topRibben">
					<Controls />
				</div>
				<div className="pageInfo">
					<div>{"This page is under construction."}</div>
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