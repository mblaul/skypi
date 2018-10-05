import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import components that are a part of the layout
import Navbar from './components/dashboard/Navbar';
import Sidebar from './components/dashboard/Sidebar';
import Footer from './components/dashboard/Footer';
import Landing from './components/Landing';

//Import components that have functionality
import Login from './components/Login';
import Register from './components/Register';

//Component to test styling
import Test from './components/Test';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
