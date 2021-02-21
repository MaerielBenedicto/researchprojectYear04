import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaSortUp, FaSortDown } from 'react-icons/fa';

class CommentVote extends Component {
    constructor(){
        super();
        this.state = {
            upvote: false,
            downvote: false,
            voted: null
        };

        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    
    upvote(){
        console.log("upvote");
        let token = localStorage.getItem("token");
        if(token){
            axios.post('/api/comments/' + this.props.commentId + '/vote', 
            {
                vote: '1',
                user_id: this.props.user.id,
                comment_id: this.props.commentId
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data);
                this.props.voted();
                this.setState({upvote: true});
              })
            .catch(function(error) {
                console.log(error.response);
                if(error){
                    console.log(error);
                } 
            });
        }
    }

    downvote(){
        console.log("downvote");
        let token = localStorage.getItem("token");
        if(token){
            axios.post('/api/comments/' + this.props.commentId + '/vote', 
            {
                vote: '-1',
                user_id: this.props.user.id,
                comment_id: this.props.commentId
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
                console.log(error.response);
                if(error){
                    console.log(error);
                } 
            });
        }
    }


    render(){
        const voted = this.state.voted;
        
        if(voted !== undefined){
            return (
                <div>
                    {(voted) ? (
                        <div>
                            <button onClick={this.upvote} className="vote-bttn"><FaSortUp className="voted-icon" /></button>
                            <div className="upvote-count">{this.props.item_upvote}</div>
                            <button onClick={this.downvote} className="vote-bttn"><FaSortDown className=" vote-icon" /></button>
                        </div>)
                        : (
                            <div>
                                <button onClick={this.upvote} className="vote-bttn"><FaSortUp className="vote-icon" /></button>
                                <div className="upvote-count">{this.props.item_upvote}</div>
                                <button onClick={this.downvote} className="vote-bttn"><FaSortDown className=" voted-icon" /></button>
                            </div>
    
                        )}
                </div>
            )
        } else {
            return (
                    <div>
                    <button onClick={this.upvote} className="vote-bttn"><FaSortUp className="vote-icon" /></button>
                    <div className="upvote-count">{this.props.item_upvote}</div>
                    <button onClick={this.downvote} className="vote-bttn"><FaSortDown className=" vote-icon" /></button>
                </div>
            )
        }

    };
}

export default CommentVote;