import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaUserCog, FaFolderOpen  } from 'react-icons/fa';

class Sidebar extends Component {
    constructor(){
        super();
        this.state = {
        };
    }

    componentDidMount(){
       
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
                                <FaUserCog className="icon"/> <Link to="/dashboard">Admin</Link>
                                </li>
                            </div>
                            <div className="review-div">
                            <li className="side-link">
                                    <p className="sidebar-p">Review</p>
                                </li>
                                <li className="side-link">
                                <FaFolderOpen className="icon"/><Link to="/dashboard/posts">Posts</Link>
                                </li>
                                <li className="side-link">
                                <FaFolderOpen className="icon"/><Link to="/dashboard/comments">Comments</Link>
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