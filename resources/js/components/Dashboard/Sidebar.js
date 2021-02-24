import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link, NavLink } from "react-router-dom";
import {FaUserCog, FaFolderOpen  } from 'react-icons/fa';

class Sidebar extends Component {
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
            this.props.onSuccess();
          })
          .catch(function (error) {
            if (error) {
              console.log(error);
            }
          });
      }
      
    render(){
        return (
            <div className="sidebar col-2">
                <div className="">
                    <Link to="/" className="navbar-brand">
                        <span className="logo-site"> LOGO</span>
                    </Link>
                    <div className="sidebar-links">
                        <ul>
                            <div className="setting-div">
                                <li className="side-link">
                                    <p className="sidebar-p">Settings</p>
                                </li>
                                <li className="side-link">
                                <FaUserCog className="icon"/> <NavLink to="/dashboard">Admin</NavLink>
                               
                                </li>
                            </div>
                            <div className="review-div">
                                <li className="side-link">
                                    <p className="sidebar-p">Review</p>
                                </li>
                                <li className="side-link">
                                <FaFolderOpen className="icon"/><NavLink to="/dashboard/posts" activeClassName="active">Posts</NavLink>
                                </li>
                                <li className="side-link">
                                <FaFolderOpen className="icon"/><NavLink to="/dashboard/comments" activeClassName="active">Comments</NavLink>
                                </li>
                            </div>
                            <div>
                                <li className="side-link logout-btn">
                                    <FaFolderOpen className="icon"/><NavLink to="/" activeClassName="active" onClick={this.logout}>Log out</NavLink>
                                </li>
                            </div>
                        </ul>    
                    </div>  
                </div> 
            </div>
        )
    };
}

export default Sidebar;