import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class ReviewPost extends Component {
    constructor(){
        super();
        this.state = {
        };
    }

    componentDidMount(){
       
    }

    render(){
        return (
            <div className="col-10 dash">
                <div className="topbar row">
                    <div className="topbar-div col-12">
                        <h4>Posts</h4>
                    </div>
                </div>

                <div className="posts-lists col-12">
                    <div>
                        REVIEWED
                    </div>
                </div>
            </div>
        )
    };
}

export default ReviewPost;