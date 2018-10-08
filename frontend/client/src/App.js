import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import components that are a part of the layout
import Navbar from './components/dashboard/Navbar';
import Sidebar from './components/dashboard/Sidebar';
import Footer from './components/dashboard/Footer';

// import landing
import Landing from './components/landing/Main';
import Login from './components/landing//Login';
import Register from './components/landing/Register';

//Component to test styling
//import Test from './components/Test';

import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Dashboard" component={Dashboard} />
          {/* <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Footer />
            </div>
          </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
