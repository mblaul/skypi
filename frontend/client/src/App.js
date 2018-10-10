import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//Import components that are a part of the layout
import Navbar from './components/dashboard/Navbar';
import Sidebar from './components/dashboard/Sidebar';
import Footer from './components/dashboard/Footer';

// import landing
import Landing from './components/landing/Landing';
import Login from './components/landing//Login';
import Register from './components/landing/Register';

//Component to test styling
//import Test from './components/Test';

// import Dashboard
import Dashboard from './components/dashboard/Dashboard';

// Check for token
if (localStorage.jwtToken) {
  // Set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode the token and get user info and expiration
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenicated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
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
      </Provider>
    );
  }
}

export default App;
