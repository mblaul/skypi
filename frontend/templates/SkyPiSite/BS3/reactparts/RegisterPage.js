import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from '../serviceWorker';
//Import statements for class creation
import React, { Component } from 'react';
//import Statements for CSS and bootstrap
//import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
/*
Hello World Render code
    var element = React.createElement('h1', { classname: 'greeting' }, 'Hello World');
    ReactDOM.render(element, document.getElementById('root'));
*/

class Registration extends Component {
    render() {
        return (
            <div className="FormControl">
            <h2>Register Account</h2>
            <br />
            <form name="RegisterForm" action="DataBasePost">
                <label id="Name"> Enter Name:  
                <input type="text" name="name" defaultValue="" />
                </label>
                <br />
                <label id="Email"> Enter Email:  
                <input type="text" name="email" defaultValue="" />
                </label>
                <br />
                <label id="ConfirmEmail"> Confirm Email:  
                <input type="text" name="emailConfirm" defaultValue="" />
                </label>
                <br />
                <label id="Password"> Enter Password:  
                <input type="password" name="password" defaultValue="" />
                </label>
                <br />
                <label id="ConfirmPassword"> Confirm Password:  
                <input type="password" name="passwordConfirm" defaultValue="" />
                </label>
                <br />
                <button className="btn btn-primary"> Register </button>
            </form>
        </div>
        );
    }
}
ReactDOM.render(<Registration />, document.getElementById('root'));
serviceWorker.unregister();