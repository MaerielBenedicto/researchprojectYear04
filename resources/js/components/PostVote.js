import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaSortUp, FaSortDown} from 'react-icons/fa';

class PostVote extends Component {
    constructor(){
        super();
        this.state = {
            upvote: null,
            downvote: null,
            upvoted: true,
            downvoted: false
        };

        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    componentDidMount(){
        
    }

    upvote(){
        console.log("upvote");
        let token = this.props.user.token;

        //if logged in 
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
        let token = this.props.user.token;
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
                {(this.state.upvoted) ? (
                <button onClick={this.upvote} className="vote-bttn"><FaSortUp className="voted-icon"/></button> )
                : ( 
                <button onClick={this.upvote} className="vote-bttn"><FaSortUp className="vote-icon"/></button> 
                )}
                <div className="upvote-count">{this.props.item_upvote}</div>
                {(this.state.downvoted) ?(
                    <button onClick={this.downvote} className="vote-bttn"><FaSortDown className=" voted-icon"/></button>
                ):(<button onClick={this.downvote} className="vote-bttn"><FaSortDown className=" vote-icon"/></button>
                )}
            </div>
        )
    };
}

export default PostVote;