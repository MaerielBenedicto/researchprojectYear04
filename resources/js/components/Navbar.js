import { nodeName } from 'jquery';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import {FaUserCircle} from 'react-icons/fa';
import '../../css/style.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

  }
  logout(e) {
    axios.get('/api/logout', {
      headers: {
        'Authorization': "Bearer " + this.props.user.token,
        'Accept': 'application/json, text/plain'
      }
    })
      .then((response) => {
        console.log("USER LOGGED OUT");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.onSuccess();
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      });
  }
  render() {
    const user = this.props.user;

    if (this.props.location.pathname.match('dashboard')) {
      return null;
    } else {
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

                  {!user && (
                    <li className="nav-item">
                      <Link to="/register" className="nav-link" >Sign Up</Link>
                    </li>
                  )}

                  {!user && (
                    <li className="nav-item">
                      <Link to="/signin" className="nav-link">Sign In</Link>
                    </li>
                  )}

                  {user && (
                    <li className="nav-item">
                      <div className="row d-flex justify-content-between">

                        <div className="dropdown show">
                        <a className="btn nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">     
                            <FaUserCircle className="icon"/> Account
                        </a>

                          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <Link to="/my-profile" className="nav-link dropdown-item drop-down-link">My Profile</Link> 
                            <Link to="/" className="nav-link dropdown-item drop-down-link" onClick={this.logout}>Sign out</Link>
                          </div>
                        </div>
                      </div>

                      {/* <Link to="/my-profile" className="nav-link">My Profile</Link> */}
                    </li>
                  )}

                  {user && (
                    <li className="nav-item">
                      <Link to="/" className="nav-link" onClick={this.logout}>Sign out</Link>
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
}

export default withRouter(Navbar);