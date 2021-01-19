import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class ReviewPost extends Component {
    constructor(){
        super();
        this.state = {
            post: {}
        };
    }

    componentDidMount(){
        axios.get('/api/posts/' + this.props.match.params.id)
        .then(response => {        
            this.setState({
                post: response.data.data,
                isLoaded: true
            });
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    render(){
        const post = this.state.post;
        return (
            <div className="col-10 dash">
                <div className="topbar row">
                    <div className="topbar-div col-12">
                        <h4>Post # {this.props.match.params.id}</h4>
                    </div>
                </div>

                <div className="posts-lists col-12">
                    <h2>Under review</h2>
                    <div>
                        <p>Posted on: 18/01/2021</p>
                        <p>User: Allyssa Daniel</p>
                        <p>Email: allyssa@gmail.com</p>
                    </div>
                    <div>
                        <p>Title: {post.title}</p>
                        <p>Body: {post.body}</p>
                    </div>
                    <div>
                        <p>Action</p>
                        <button>Approve</button>
                        <button>Deny</button>
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(ReviewPost);