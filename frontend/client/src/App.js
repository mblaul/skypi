import React, { Component } from 'react';

//Import components that are a part of the layout
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

//Import components that have functionality
import Login from './components/Login';
import Register from './components/Register';

//Component to test styling
import Test from './components/Test';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Sidebar />
          <div className="main-panel">
            <Navbar />
            {/* <Login /> */}
            <Register />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
