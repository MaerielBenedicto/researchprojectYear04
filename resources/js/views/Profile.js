import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import UserForums from '../components/UserForums';
import UserPosts from '../components/UserPosts';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: props.user
        };
    }

    componentDidMount(){
       
    }

    render(){
        return (
            <div className="body-content">
                <div className="container profile-div"> 
                    <h2>MY PROFILE</h2>
                    <h4>{this.props.user.name}</h4>
                    <h4>{this.props.user.email}</h4>
                </div>
                
                <UserForums user={this.props.user}/>
                <UserPosts user={this.props.user}/>

            </div>
        )
    };
}

export default Profile;