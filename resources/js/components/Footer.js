import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../css/app.css';

class Footer extends Component {

  render(){

    if (this.props.location.pathname.match('dashboard')){
        return null;
      } else{
    return (
      <div className="container-fluid footer-bar">
          <div className="container">    

              <div className="row ml-auto">
                  <div className="col-12">
                      <div className="row logo-site-footer">
                        <div className="col-lg-2 col-sm-12 col-md-3">
                            <Link to="/" className="footer-brand">
                                <span className=""> CONVO</span>
                            </Link> 
                        </div>
                        <div className="col-lg-2 col-sm-12 col-md-3">
                            <ul className="footer-list-group">
                                <li className="footer-list-group-item footer-heading">
                                    <a href="#">Get Started</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">Register</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-sm-12 col-md-3">

                            <ul className="footer-list-group">
                                <li className="footer-list-group-item footer-heading">
                                    <a href="#">LOGO</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">About</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">Careers</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-sm-12 col-md-3">
                            <ul className="footer-list-group">
                                <li className="footer-list-group-item footer-heading">
                                    <a href="#">Support</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">FAQ</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">Advertise</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">Content Policy</a>
                                </li>
                                <li className="footer-list-group-item">
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                      </div>
                  </div>
                 
                 
              </div>
              </div>
      </div>
    )   
      }
  }
}

  export default withRouter(Footer);