import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

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
                <div className="container"> 
                <h2>MY PROFILE</h2>
                <h4>{this.props.user.name}</h4>
                <h4>{this.props.user.email}</h4>
                </div>
            </div>
        )
    };
}

export default Profile;