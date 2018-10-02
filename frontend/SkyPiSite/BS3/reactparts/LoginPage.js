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

class LoginPageFull extends Component {
    render() {
        return (
            <div class="ContentContainer">
                <div class="FormControl">
                    <h2>Login</h2>
                    <form name="LoginForm" action="DataBasePost">
                        <div class="UserInput">
                            <label for="username">Username   
                            <input type="text" name="username" value="" />
                            </label>
                        </div>
                        <div class="PassInput">
                            <label for="password">Password   
                            <input type="password" name="password" value="" />
                            </label>
                        </div>
                        <div class="btn">
                            <button class="btn btn-primary">Login</button>
                            <a class="btn btn-link" href="/MyCreatedFiles/RegisterPage.js">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<LoginPageFull />, document.getElementById('root'));
serviceWorker.unregister();