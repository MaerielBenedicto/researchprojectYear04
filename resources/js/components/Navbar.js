import { nodeName } from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import '../../css/app.css';
import '../../css/style.css';

class Navbar extends Component {

  render(){
    const user = this.props.user;

    return (
      <div className="navbar-container">
      <nav className="navbar fixed-top navbar-expand-md">
          <div className="container">         
              <div className="ml-auto">
                <Link to="/" className="navbar-brand">
                      <span className="logo-site"> LOGO</span>
                  </Link>  
              </div>

              {/* <!-- NAVBAR LINKS --> */}
              <div className="collapse navbar-collapse" id="navbar-links">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">Forums</Link>
                      </li>

                      { !user && (
                        <li className="nav-item">
                          <Link to="/register" className="nav-link" >Sign Up</Link>
                      </li>
                      )}

                      { !user && (
                        <li className="nav-item">
                         <Link to="/signin" className="nav-link">Sign In</Link>
                      </li>
                      )}

                      { user && (
                        <li className="nav-item">
                          <Link to="/my-profile" className="nav-link">My Profile</Link>
                      </li>
                      )}

                      { user && (
                        <li className="nav-item">
                          <Link to="/" className="nav-link" onClick={this.props.logout}>Sign out</Link>
                      </li>
                      )}


                  </ul>
              </div> 
          </div>
      </nav>
  </div>
    )   
  }
}

  export default Navbar;