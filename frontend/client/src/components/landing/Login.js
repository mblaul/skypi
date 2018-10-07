import React, { Component } from 'react';
import Navbar from './Navbar';

class Login extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="ContentContainer">
          <div className="FormControl">
            <h2>Login</h2>
            <form name="LoginForm" action="DataBasePost">
              <div className="UserInput">
                <label htmlFor="username">
                  Username
                  <input type="text" name="username" value="" />
                </label>
              </div>
              <div className="PassInput">
                <label htmlFor="password">
                  Password
                  <input type="password" name="password" value="" />
                </label>
              </div>
              <div className="btn">
                <button className="btn btn-primary">Login</button>
                <a
                  className="btn btn-link"
                  href="/MyCreatedFiles/RegisterPage.js"
                >
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
