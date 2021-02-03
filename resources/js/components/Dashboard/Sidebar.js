import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

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
                            <li className="side-link">
                                <Link to="/dashboard">Home</Link>
                            </li>
                            <li className="side-link">
                                <Link to="/dashboard/posts">Posts</Link>
                            </li>
                            <li className="side-link">
                                <Link to="/dashboard/comments">Comments</Link>
                            </li>
                        </ul>    
                    </div>  
                    
                </div>
            </div>
        )
    };
}

export default Sidebar;