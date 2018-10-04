import React, { Component } from 'react'

export default class footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
            <div className="container-fluid">
                <nav className="pull-left">
                    <ul>
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>

                    </ul>
                </nav>
                <p class="copyright pull-right">
                    &copy; <script>document.write(new Date().getFullYear())</script> <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                </p>
            </div>
        </footer>
      </div>
    )
  }
}
