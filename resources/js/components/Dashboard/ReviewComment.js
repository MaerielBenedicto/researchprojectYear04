import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Moment from 'react-moment';

class ReviewComment extends Component {
    constructor(props) {
        super(props);
        const comments = props.comments;
        const comment_id = parseInt(props.match.params.id);
        const comment = comments.find(comment => comment.id === comment_id);
        this.state = {
            comment: comment,
            alert: null
        };

        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(e) {
        const status = e.target.value;
        let token = this.props.user.token;

        axios.put('/api/review/comment/' + this.state.comment.id,
                { status: status },
                {  headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data);
                const alert = "Comment #" + this.state.comment.id + " successfully " + status + "!";

                this.setState({
                    comment: response.data.nextComment,
                    alert: alert
                });
                this.props.changeStatusSuccess(response.data.comment);
                this.props.history.push(''+ this.state.comment.id);
            })
            .catch((error) => {
                console.log(error);
                if (error) {
                    console.log(error);
                }
            });
    }

    render() {
        const comment = this.state.comment;

        return (
            <div className="col-10 dash">
                <div className="topbar row">
                    <div className="topbar-div col-12">
                        <h4>Comment # {comment.id}</h4>
                    </div>
                </div>
                { this.state.alert && (
                    <div className="alert alert-info">
                        <span>{this.state.alert}</span>
                    </div>
                )}


                <div className="posts-lists col-12">
                    <h2>Under review</h2>
                    <div className="row">
                        <div className="user-data col-6">
                            <p>Posted on: <Moment format="DD/MM/YYYY">{comment.created_at}</Moment></p>
                            <p>User: {comment.user.name}</p>
                            <p>Email: {comment.user.email}</p>
                        </div>

                        <div className="user-data col-5">
                            <p>Sentiment score: {comment.s_score}</p>
                            <p>Magnitude score: {comment.s_magnitude}</p>
                            <p>Sentiment: Negative </p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="user-data col-11">
                            <p>Body: {comment.body}</p>
                        </div>
                    </div>
                    <div className="row mt-3 ml-2">
                        <div className="col-5">
                            <p>Action</p>
                            <button value="approved" onClick={this.changeStatus} className="approve-bttn">Approve</button>
                            <button value="denied" onClick={this.changeStatus} className="denied-bttn">Deny</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(ReviewComment);