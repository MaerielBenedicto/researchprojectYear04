import { nodeName } from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/app.css';
// resources/css/app.css

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      displayStyle: 'block'
    };
    this.logout = this.logout.bind(this);
  }

  logout(){
    let token = localStorage.getItem('token');
    axios.get('/api/logout',{
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': 'application/json, text/plain'}
    })
    .then((response) => {      
      console.log("USER LOGGED OUT");
      localStorage.removeItem('token');
      this.props.signout();
    })
    .catch(function(error){
      if(error.response){
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
        } 
    });
  }

  render(){
    return (
      <div className="navbar-container">
      <nav className="navbar fixed-top navbar-expand-md">
          <div className="container">         
              <div className="logo-site ml-auto">
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

                      <li className="nav-item" style={{display: this.props.displayIn}}>
                        <Link to="/register" className="nav-link" >Sign Up</Link>
                      </li>

                      <li className="nav-item" style={{display: this.props.displayIn}}> 
                        <Link to="/signin" className="nav-link">Sign In</Link>
                      </li>

                      <li className="nav-item" style={{display: this.props.displayOut}}>
                        <Link to="/" className="last-nav-link" onClick={this.logout}>Sign out</Link>
                      </li>

                  </ul>
              </div>




            {/* FIGMA */}
            {/* <div id="e4_11">
              <div id="e1_6">
              </div>
                <span id="e4_3">LOGO</span>
                <span id="e4_4">Forums</span>
                <span id="e4_5">Sign in</span>
                <span id="e4_6">Register</span>
                <div id="e4_7"></div>
                <div id="e4_9">
                </div>
                  <span id="e4_14">Search the forum</span>
             </div> */}

          </div>
      </nav>
  </div>
    )   
  }
}

  export default Navbar;