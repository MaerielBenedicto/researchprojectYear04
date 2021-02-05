import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import UserForums from '../components/UserForums';
import UserPosts from '../components/UserPosts';

class Profile extends Component {
    
    render(){
        const user = this.props.user;
        return (
            <div className="body-content">
                <div className="container"> 
                <div className="row">

                <div className="profile-div col-5">
                        <h2>MY PROFILE</h2>
                        <h4>{user.name}</h4>
                        <h4>{user.email}</h4>
                    </div>
                    <div className="approval-list col-6">
                        <h4> Waiting for Approval</h4>
                        <h4> 2 Posts</h4>
                    </div>
                </div>
                    
                </div>

                
                {/* <UserForums user={this.props.user}/> */}
                {/* <UserPosts user={this.props.user}/> */}

            </div>
        )
    };
}

export default Profile;