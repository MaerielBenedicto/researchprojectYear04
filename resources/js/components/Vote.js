import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Vote extends Component {
    constructor(){
        super();
        this.state = {
            upvote: false,
            downvote: false
        };

        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    componentDidMount(){
        axios.get('/api/post/' + this.props.postId)
            .then((response) => {
                console.log(response);
                // this.setState({upvote: true});
                this.props.counted(response.data);
              })
            .catch(function(error) {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });
    }

    upvote(){
        console.log("upvote");
        // posts/{post}/vote
        let token = localStorage.getItem("token");
        if(token){
            axios.post('/api/posts/' + this.props.postId + '/vote', 
            {
                upvote: true,
                downvote: false,
                user_id: this.props.user.id,
                post_id: this.props.postId
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data);
                this.setState({upvote: true});
              })
            .catch(function(error) {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });
        }
    }

    downvote(){
        console.log("downvote");
    }


    render(){
        return (
            <div>
                <button onClick={this.upvote}>Upvote</button>
                <button onClick={this.downvote}>Downvote</button>
            </div>
        )
    };
}

export default Vote;