import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Import private routing for protected pages
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// Import components that are a part of the layout
import Navbar from './components/layout/Navbar';

// Import components that are used for authentication
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Verify from './components/authentication/Verify';

// Import components that are used to display content
import Landing from './components/content/Landing';
import Dashboard from './components/content/dashboard/Dashboard';
import Stations from './components/content/stations/Stations';

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
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* Switch allows redirects on private routes */}
            <Switch>
              <PrivateRoute exact path="/verify" component={Verify} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/stations" component={Stations} />
            </Switch>
            <Switch>
              <AdminRoute exact path="/admin" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
