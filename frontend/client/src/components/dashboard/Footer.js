import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container-fluid">
            <nav className="pull-left">
              <ul>
                <li>
                  <a href="www.google.com">Home</a>
                </li>
              </ul>
            </nav>
            <p className="copyright pull-right">
              &copy; <script>document.write(new Date().getFullYear())</script>{' '}
              <a href="http://www.creative-tim.com">Creative Tim</a>, made with
              love for a better web
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
