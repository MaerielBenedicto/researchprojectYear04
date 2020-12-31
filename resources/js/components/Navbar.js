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
              <div className="navbar-icons ml-auto">
              <Link to="/" className="navbar-brand">
                    {/* <!-- Replace h3 heading with an image of the logo --> */}
                    <span> Forum</span>
                    {/* <img src="/images/iwander-logo-lg.png" alt="iWander Logo" /> */}
                  </Link>  
              </div>

              {/* <!-- NAVBAR LINKS --> */}
              <div className="collapse navbar-collapse" id="navbar-links">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">Browse</Link>
                      </li>

                      <li className="nav-item" style={{display: this.props.displayIn}}>
                        <Link to="/register" className="nav-link" >Sign Up</Link>
                      </li>

                      <li className="nav-item" style={{display: this.props.displayIn}}> 
                        <Link to="/signin" className="last-nav-link">Sign In</Link>
                      </li>

                      <li className="nav-item" style={{display: this.props.displayOut}}>
                        <Link to="/" className="last-nav-link" onClick={this.logout}>Sign out</Link>
                      </li>

                  </ul>
              </div>
          </div>
      </nav>
  </div>
    )   
  }
}

  export default Navbar;