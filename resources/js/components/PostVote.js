import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class PostVote extends Component {
    constructor(){
        super();
        this.state = {
            upvote: null,
            downvote: null
        };

        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    componentDidMount(){
        
    }

    upvote(){
        console.log("upvote");
        let token = localStorage.getItem("token");
        if(token){
            axios.post('/api/posts/' + this.props.postId + '/vote', 
            {
                vote: '1',
                user_id: this.props.user.id,
                post_id: this.props.postId
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data);
                this.setState({upvote: true});
                this.props.voted();
              })
            .catch(function(error) {
                console.log(error);
                if(error){
                    console.log(error.response);
                } 
            });
        }
    }

    downvote(){
        console.log("downvote");
        let token = localStorage.getItem("token");
        if(token){
            axios.post('/api/posts/' + this.props.postId + '/vote', 
            {
                vote: '-1',
                user_id: this.props.user.id,
                post_id: this.props.postId
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data);
                this.props.voted();
                this.setState({downvote: true});
              })
            .catch(function(error) {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });
        }
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

export default PostVote;