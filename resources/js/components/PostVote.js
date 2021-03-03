import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaSortUp, FaSortDown } from 'react-icons/fa';

class PostVote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voted: props.item_voted
        };

        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    upvote() {
        console.log("upvote");
        let user = this.props.user;

        //if logged in 
        if (user) {
            axios.post('/api/posts/' + this.props.postId + '/vote',
                {
                    vote: '1',
                    user_id: this.props.user.id,
                    post_id: this.props.postId
                },
                {
                    headers: { Authorization: "Bearer " + user.token }
                })
                .then((response) => {
                    console.log(response.data);
                    this.setState({ voted: true });
                    this.props.voted();
                })
                .catch(function (error) {
                    console.log(error);
                    if (error) {
                        console.log(error.response);
                    }
                });
        }else {
            this.props.history.push('/signin');
        }
    }

    downvote() {
        console.log("downvote");
        let user = this.props.user;
        if (user) {
            axios.post('/api/posts/' + this.props.postId + '/vote',
                {
                    vote: '-1',
                    user_id: this.props.user.id,
                    post_id: this.props.postId
                },
                {
                    headers: { Authorization: "Bearer " + user.token }
                })
                .then((response) => {
                    console.log(response.data);
                    this.props.voted();
                    this.setState({ voted: false });
                })
                .catch(function (error) {
                    console.log(error);
                    if (error) {
                        console.log(error);
                    }
                });
        } else {
            this.props.history.push('/signin');
        }
    }


    render() {
        const voted = this.state.voted;
        
        if(voted !== undefined){
            return (
                <div className="float-right">
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
                    <div className="float-right">
                    <button onClick={this.upvote} className="vote-bttn"><FaSortUp className="vote-icon" /></button>
                    <div className="upvote-count">{this.props.item_upvote}</div>
                    <button onClick={this.downvote} className="vote-bttn"><FaSortDown className=" vote-icon" /></button>
                </div>
            )
        }

    };

}

export default withRouter(PostVote);