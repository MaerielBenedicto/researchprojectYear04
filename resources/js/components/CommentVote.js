import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaSortUp, FaSortDown } from 'react-icons/fa';

class CommentVote extends Component {
    constructor(props){
        super(props);
        this.state = {
            voted: props.item_voted
        };

        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    
    upvote(){
        console.log("upvote");
        let user = this.props.user;
        if(user){
            axios.post('/api/comments/' + this.props.commentId + '/vote', 
            {
                vote: '1',
                user_id: this.props.user.id,
                comment_id: this.props.commentId
            },
            {
                headers: { Authorization: "Bearer " + user.token }
            })
            .then((response) => {
                // console.log('upvote',response.data);
                this.props.voted();
                this.setState({voted: true});
              })
            .catch(function(error) {
                console.log(error.response);
                if(error){
                    console.log(error);
                } 
            });
        } else {
            this.props.history.push('/signin');
        }
    }

    downvote(){
        console.log("downvote");
        let user = this.props.user;
        if(user){        
            axios.post('/api/comments/' + this.props.commentId + '/vote', 
            {
                vote: '-1',
                user_id: this.props.user.id,
                comment_id: this.props.commentId
            },
            {
                headers: { Authorization: "Bearer " + user.token }
            })
            .then((response) => {
                // console.log('downvote',response.data);
                this.props.voted();
                this.setState({voted: false});
              })
            .catch(function(error) {
                console.log(error.response);
                if(error){
                    console.log(error);
                } 
            });
        }else {
            this.props.history.push('/signin');
        }
    }


    render(){
        const voted = this.state.voted;
        // console.log(this.props.item_voted);
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

export default withRouter(CommentVote);